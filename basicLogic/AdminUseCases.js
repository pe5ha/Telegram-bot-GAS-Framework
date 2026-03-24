/**
 * Не вынести ли это тоже вне фреймворка? Хотя здесь есть и базовая логика.
 */

function adminUseCases(){

  // TODO - пересмотреть

  let isAdminAction = true;
  
  if(MESSAGE_TEXT=="/cancel"){
    USER.setCurrentAction(UserActions.without_action);
    botSendMessage(CHAT_ID,"Операция отменена", MAIN_KEYBOARD);
  }
  else if(MESSAGE_TEXT=="/sethello"){
    USER.setCurrentAction(AdminActions.input_helloMessage);
    botSendMessage(CHAT_ID,"Присылайте новое приветсвенное сообщение или нажмите /cancel для отмены");
  }
  else if(MESSAGE_TEXT=="/commands"){
    botSendMessage(CHAT_ID,"Список команд в боте:\n"+commandsListForAdmin()+"\nРедактировать команду: /editcommand",MAIN_KEYBOARD);
  }
  else if(MESSAGE_TEXT== "/editcommand"){
    USER.setCurrentAction(AdminActions.edit_command)
    botSendMessage(CHAT_ID,"Введите название листа для редактирования команд или нажмите /cancel для отмены");
  }
  else if(USER.currentAction == AdminActions.edit_command){
    let sheet = TABLE.getSheetByName(MESSAGE_TEXT);
    if(!sheet){
      botSendMessage(CHAT_ID,"Такого листа в таблице нет");
      return true;
    }
    let sheetId = sheet.getSheetId();
    USER.setCurrentAction(AdminActions.edit_command+"="+sheetId);
    subMenuResponse(sheetId,"Пришлите команду, которую хотите изменить/добавить или нажмите /cancel для отмены");
  }
  else if(String(USER.currentAction).startsWith(AdminActions.edit_command)){
    let sheetId = String(USER.currentAction).split("=")[1];
    USER.setCurrentAction( AdminActions.input_command+"="+sheetId+"="+MESSAGE_TEXT+"=0");
    botSendMessage(CHAT_ID,"Теперь пришлите сообщение, которое боту отправлять в ответ на эту команду или нажмите /cancel для отмены");
  }
  else if(String(USER.currentAction).startsWith(AdminActions.input_command)){
    let sheetId = parseInt(String(USER.currentAction).split("=")[1]);
    let command = String(USER.currentAction).split("=")[2];
    let index = parseInt(String(USER.currentAction).split("=")[3]);
    if(!index) index = 0;
    index = setBotCommand(sheetId,command,{chat_id: CHAT_ID, message_id: MESSAGE_ID},index);
    USER.setCurrentAction( AdminActions.input_command+"="+sheetId+"="+command+"="+index);
    MESSAGE_TEXT = command; 
    botSendMessage(CHAT_ID,"Пришлите следующее сообщение, которое боту отправлять в ответ на эту команду или нажмите /cancel для завершения");
    return false;
  }
  else if(MESSAGE_TEXT== "/editmaterial"){
    USER.setCurrentAction(AdminActions.edit_material)
    botSendMessage(CHAT_ID,"Пришлите спикера для редактирования или нажмите /cancel для отмены",getSpickerKeyb());
  }
  else if(USER.currentAction == AdminActions.edit_material){
    USER.setCurrentAction(AdminActions.edit_material+"="+MESSAGE_TEXT);
    botSendMessage(CHAT_ID,"Пришлите материал, который боту отправлять в ответ на эту команду или нажмите /cancel для отмены");
  }
  else if(String(USER.currentAction).startsWith(AdminActions.edit_material)){
    let spicker = String(USER.currentAction).split("=")[1];
    USER.setCurrentAction( UserActions.without_action);
    setBotMaterial(spicker,{chat_id: CHAT_ID, message_id: MESSAGE_ID});
    MESSAGE_TEXT = spicker; // TODO chech this for bugsc delay table saved data
    return false;
  }
  else if(USER.currentAction==AdminActions.input_helloMessage){
    USER.setCurrentAction(UserActions.without_action);
    tBotValues.setHelloMessageLink(CHAT_ID,MESSAGE_ID,MESSAGE_TEXT);
    MESSAGE_TEXT = "/start"; // TODO chech this for bugsc delay table saved data
    
  }
  else{
    isAdminAction = false;
  }

  return isAdminAction;
  
}