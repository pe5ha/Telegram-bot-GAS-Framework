function saveUserAnswerOnBroadcast(answer) {
  let PUSH_USERS = tPush.use().getDataRange().getValues();
  let row = findRowIn2dRange(PUSH_USERS,0,USER_ID);
  if(row == -1 ) return;
  tPush.use().getRange(row+1,tPush.getCol(tPush.columns.reaction_Title)+1,1,2).setValues([[answer,stringDateOld()]]);
}


// подверждение отправки пуша
function PushMessagePrepare(){
  
  // let keyboard = subMenuKeyboard(tPush.use().getRange(tPush.buttons_link).getValue());

  // let keyboardToConfirm = {
  //   inline_keyboard: [
  //     [
  //       {text: "Запустить!", callback_data: "push cid="+CHAT_ID+" mid="+MESSAGE_ID+" btn=1"},
  //       {text: "Отмена", callback_data: "cancel"},
  //     ]
  //   ]
  // };
  // USER.setCurrentAction(AdminActions.waiting_push);
  tPush.use().getRange(tPush.message).setValue(JSON.stringify({chat_id: CHAT_ID, message_id: MESSAGE_ID}));
  tPush.use().getRange(tPush.message).setNote(MESSAGE_TEXT);
  botCopyMessage(CHAT_ID,CHAT_ID,MESSAGE_ID);
  Utilities.sleep(2000);
  botSendMessage(CHAT_ID,"Запустить рассылку этого сообщения? /confirm_push");
}


function buildPushKeyboard(){
  let keyboard = {
    inline_keyboard: [
      // [
      //   {text: "Отправить всем!", callback_data: "push cid="+CHAT_ID+" mid="+MESSAGE_ID+" btn="+withButtons},
      //   {text: "Отмена", callback_data: "cancel"},
      // ]
    ]
  };

  let buttonsData = tPushButtons.use().getRange("A:B").getValues();
  for(let i=1;i<buttonsData.length;i++){
    if(buttonsData[i][0]=="") break;
    let text = buttonsData[i][0];
    
    // ссылка в кнопке
    if(buttonsData[i][1]){
      keyboard.inline_keyboard.push([{text: text, url: buttonsData[i][1]}]);
    } 
    // кнопка ответ
    else{
      keyboard.inline_keyboard.push([{text: text, callback_data: "ans="+buttonsData[i][0]}]);
    }
    // TODO - сделать можно так чтобы колбеки кнопок тоже прописывать в табличке (как ссылки) и ключевые слова в колбеках могут вызывать функции
  }
  return keyboard;
}

function PushMessageStart(origin_chat_id,origin_message_id,withKeyboard,fromIndex = 0){

  let trigger = ScriptApp.newTrigger("PushMessageTrigger").timeBased().after(30*1000).create();
  var triggerUid = trigger.getUniqueId();
  var triggerData = {};
  triggerData["ORIGIN_CHAT_ID"] = origin_chat_id;
  triggerData["ORIGIN_MESSAGE_ID"] = origin_message_id;
  triggerData["WITH_KEYBOARD"] = withKeyboard;
  triggerData["INDEX"] = fromIndex;

  PropertiesService.getScriptProperties().setProperty(triggerUid, JSON.stringify(triggerData));

}


function PushMessageTrigger(e){
  let triggerUid = e.triggerUid;
  try {
    logDebugTrigger(e);
    botInitialization();  
    PushMessageTriggerHandler(triggerUid)
  } 
  catch (err) {
    logError(err.stack);
  }
  deleteTriggerByUid(triggerUid);
}

function PushMessageTriggerHandler(triggerUid){
  let triggerData = getTriggerDataByUid(triggerUid);

  let origin_chat_id = triggerData["ORIGIN_CHAT_ID"];
  let origin_message_id = triggerData["ORIGIN_MESSAGE_ID"];
  let withKeyboard = triggerData["WITH_KEYBOARD"];
  let index = parseInt(triggerData["INDEX"]);

  deleteTriggerArguments(triggerUid);
  PushMessageProcess(origin_chat_id,origin_message_id,withKeyboard,index);
}

function PushMessageProcess(origin_chat_id,origin_message_id,keyboardSheetId,index){
  let keyboard = null;
  if(keyboardSheetId>0) keyboard = subMenuKeyboard(keyboardSheetId);
  // send pushes...
  logUpdate("Рассылка начата","");
  let PUSH_USERS = tPush.use().getDataRange().getValues();
  let pushCount = PUSH_USERS.length - 1;
  let sendingCounter = 0;
  let successCounter = 0; 
  let blockedUsers = [];
  let sendUsers = [];
  let startTime = new Date();
  let i = index + 1;
  for(i=index+1;i<PUSH_USERS.length;i++){
    if(PUSH_USERS[i][0] == "") {
      pushCount = i - 1;
      break;
    };
    let userId = PUSH_USERS[i][0];
    sendingCounter++;

    let telegramResp = TelegramAPI.copyMessage(TOKEN,userId,origin_chat_id,origin_message_id,keyboard);
    if(telegramResp.ok){
      successCounter++;
      sendUsers.push(userId);
      tPush.use().getRange(i+1,tPush.getCol(tPush.columns.messageTime_Title)+1,1,2).setValues([[stringDate(),"Копия сообщения отправлена"]]);
      let user = User.getUserFromDataById(USERS_DATA, userId);
      user.setMenuLevel(keyboardSheetId);
    }
    else if(telegramResp.error_code==403){
      // {"ok":false,"error_code":403,"description":"Forbidden: bot was blocked by the user"} 
      blockedUsers.push([userId]);
      tPush.use().getRange(i+1,tPush.getCol(tPush.columns.messageTime_Title)+1,1,2).setValues([[stringDate(),telegramResp.error_code +": "+ telegramResp.description]]);
    }
    else{
      tPush.use().getRange(i+1,tPush.getCol(tPush.columns.messageTime_Title)+1,1,2).setValues([[stringDate(),telegramResp.error_code +": "+ telegramResp.description]]);
      botSendText(errorMessagesChat,JSON.stringify(telegramResp));
    }
    
    if(sendingCounter>=30){
      sendingCounter=0;
      Utilities.sleep(1000);
    }

    let currTime = new Date();
    if(currTime.getTime() - startTime.getTime() > 45*1000){ // 5*60*1000+45*1000 - работает дольше 5 минут 45 сек
      break;
    }
    
  }

  if(i>pushCount){
    logUpdate("Рассылка закончена",(i-1)+"/"+pushCount+" пользователям отправлено.\n"+successCounter+" - получили сообщение\n"+blockedUsers.length+" - бот был заблокирован");
    botSendMessage(origin_chat_id, "Рассылка закончена.\n"+(i-1)+"/"+pushCount+" пользователям отправлено.\n"+successCounter+" - получили сообщение\n"+blockedUsers.length+" - бот был заблокирован");
  } 
  else{
    logUpdate("Часть рассылки отправлена",(i-1)+"/"+pushCount+" пользователям отправлено.\n"+successCounter+" - получили сообщение\n"+blockedUsers.length+" - бот был заблокирован");
    botSendMessage(origin_chat_id, "Часть рассылки отправлена. \n"+(i-1)+"/"+pushCount+" пользователям отправлено.\n"+successCounter+" - получили сообщение\n"+blockedUsers.length+" - бот был заблокирован");
    PushMessageStart(origin_chat_id,origin_message_id,keyboardSheetId,i);
  }
}




function getTriggerDataByUid(triggerUid){
  let scriptProperties = PropertiesService.getScriptProperties();
  let triggerData = JSON.parse(scriptProperties.getProperty(triggerUid));
  return triggerData;
}

function deleteTriggerArguments(triggerUid) {
  PropertiesService.getScriptProperties().deleteProperty(triggerUid);
}

function deleteTriggerByUid(triggerUid){
  ScriptApp.deleteTrigger(
    ScriptApp.getProjectTriggers().find(
      trigger => trigger.getUniqueId() === triggerUid
    )
  );
}