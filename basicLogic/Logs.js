/**
 * Логирование всех сообщений, нажатий кнопок и всего прочего приходящего в бота в таблицу
 * @param {String} text - Текст обновления в нужном для таблице виде
 */
 function logUpdate(action, text) {
  if(!LOG_INCOMING_ON) return;
  tLog.use().insertRowBefore(2);
  let logdate = MESSAGE_DATE ? stringDate(new Date(MESSAGE_DATE*1000)) : stringDate();
  let logData = [logdate,USER_ID,USER_NICK,USER_NAME,MESSAGE_ID,action, text];
  tLog.use().getRange(2,1,1,logData.length).setValues([logData]);
}

function logBotCopying(chat_id, message_id) {
  if(!LOG_BOT_SENDING_ON) return;
  tLog.use().insertRowBefore(2);
  let logData = [stringDate(),chat_id,"","",message_id, "Отправлена копия"];
  tLog.use().getRange(2,1,1,logData.length).setValues([logData]);
}

/**
 * Логирование всего что исходит пользователям ИЗ бота. То есть сообщения от бота
 * @param {String} text - Текст обновления в нужном для таблице виде
 */
function logBotSending(text) {
  if(!LOG_BOT_SENDING_ON) return;
  tLog.use().insertRowBefore(2);
  let logdate = MESSAGE_DATE ? stringDate(new Date(MESSAGE_DATE*1000)) : stringDate();
  let logData = [[logdate,CHAT_ID,USER_NICK,USER_NAME,"","","",text]];
  // TODO chat_id заменить на имя ЧАТА (групповой чат или диалог)
  tLog.use().getRange(2,1,1,logData[0].length).setValues(logData);
}

///////////////// logging for debug /////////////////

function logError(errorText){
  if(!LOG_DEBUG_ON) return;
  TelegramAPI.sendMessage(TOKEN, ERRORS_LOG_CHAT, errorText);
  let tDebug = TABLE.getSheetByName("Errors");
  if(tDebug == null) { 
    TABLE.insertSheet("Errors"); 
    tDebug = TABLE.getSheetByName("Errors");
  }
  tDebug.appendRow([stringDate(),errorText]);
}

function logDebug(e){
  if(!LOG_DEBUG_ON) return;
  let tDebug = TABLE.getSheetByName("Debug");
  if(tDebug == null) { 
    TABLE.insertSheet("Debug"); 
    tDebug = TABLE.getSheetByName("Debug");
  }

  let contents = JSON.parse(e.postData.contents);
  let eStr = JSON.stringify(e, null, 5);
  let contentsStr = JSON.stringify(contents, null, 5);
  try {
    tDebug.getRange(1, 1, 1,3).setValues([[contentsStr,stringDate(),eStr]]);
    tDebug.appendRow([contentsStr,stringDate(),eStr]);
    let lastRow = tDebug.getLastRow();
    if (lastRow > 100){
      tDebug.deleteRows(2,100);
    }
  } catch (error) {}
}

function logDebugTrigger(e){
  if(!LOG_DEBUG_ON) return;
  let tDebug = TABLE.getSheetByName("Debug");
  if(tDebug == null) { 
    TABLE.insertSheet("Debug"); 
    tDebug = TABLE.getSheetByName("Debug");
  }

  // let contents = JSON.parse(e);
  // let eStr = JSON.stringify(e, null, 5);
  let contentsStr = JSON.stringify(e, null, 5);
  try {
    // tDebug.getRange(1, 1, 1,3).setValues([[contentsStr,stringDate(),e]]);
    // tDebug.getRange(1, 1, 1,3).setValues([[contentsStr,stringDate(),e]]);
    tDebug.appendRow([contentsStr,stringDate()]);

  } catch (error) {}
}
