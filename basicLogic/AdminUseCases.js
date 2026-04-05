/**
 * Не вынести ли это тоже вне фреймворка? Хотя здесь есть и базовая логика.
 */

function adminUseCases(){

  let isAdminAction = true;
  
  if(MESSAGE_TEXT=="/cancel"){
    USER.setCurrentAction(UserActions.without_action);
    botSendMessage(CHAT_ID,"Операция отменена", MAIN_KEYBOARD);
    USER.setMenuLevel(tBotCommands.getSheetId());
  }
  if(MESSAGE_TEXT=="/stop"){
    USER.setCurrentAction(AdminActions.manage_commands);
    botSendMessage(CHAT_ID,"Операция завершена", subMenuKeyboard(USER.menuLevel));
  }
  else if(MESSAGE_TEXT=="/sethello"){
    USER.setCurrentAction(AdminActions.input_helloMessage);
    botSendMessage(CHAT_ID,"Присылайте новое приветсвенное сообщение или нажмите /cancel для отмены");
  }
  else if(MESSAGE_TEXT== "/manage_commands"){
    USER.setCurrentAction(AdminActions.manage_commands)
    botSendMessage(CHAT_ID,"Вы можете управлять командами бота (редактировать, добавлять, удалять) или нажмите /cancel для отмены",subMenuKeyboard(tBotCommands.getSheetId()));
    USER.setMenuLevel(tBotCommands.getSheetId());
  }
  else if(MESSAGE_TEXT == "Добавить команду"){
    botSendMessage(CHAT_ID,"Пришлите имя новой команды или нажмите /cancel для отмены.\nКнопка команды будет добавлена в тот раздел, который будет открыт в меню управления командами в момент добавления.", subMenuKeyboard(USER.menuLevel));
    USER.setCurrentAction(AdminActions.edit_command); 
  }
  else if(MESSAGE_TEXT == "Редактировать"){
    botSendMessage(CHAT_ID,"Пришлите имя команды или нажмите /cancel для отмены.\nКнопка команды будет добавлена в тот раздел, который будет открыт в меню управления командами в момент добавления.", subMenuKeyboard(USER.menuLevel));
    USER.setCurrentAction(AdminActions.edit_command); 
  }
  else if(MESSAGE_TEXT == "Удалить команду"){
    botSendMessage(CHAT_ID,"Пришлите команду или нажмите /cancel для отмены.", subMenuKeyboard(USER.menuLevel));
    USER.setCurrentAction(AdminActions.delete_command); 
  }
  else if(MESSAGE_TEXT == "Создать новый раздел"){
    botSendMessage(CHAT_ID,"Пришлите название (имя таблицы) для нового раздела команд или нажмите /cancel для отмены.", subMenuKeyboard(USER.menuLevel));
    USER.setCurrentAction(AdminActions.create_menuLevel); 
  }
  else if(USER.currentAction == AdminActions.edit_command){
    let sheetId = USER.menuLevel;
    USER.setCurrentAction(AdminActions.input_command+"="+sheetId+"="+MESSAGE_TEXT+"=0"); 
    botSendMessage(CHAT_ID,"Теперь пришлите сообщение, которое боту отправлять в ответ на эту команду или нажмите /cancel для отмены");
  }
  else if(USER.currentAction == AdminActions.delete_command){
    let sheetId = USER.menuLevel;
    deleteBotCommand(sheetId,MESSAGE_TEXT);
    USER.setCurrentAction(AdminActions.manage_commands); 
    botSendMessage(CHAT_ID,"Команда удалена", subMenuKeyboard(USER.menuLevel));
  }
  else if(USER.currentAction == AdminActions.create_menuLevel){
    let sheetId = createMenuLevel(MESSAGE_TEXT);
    USER.setCurrentAction(AdminActions.manage_commands); 
    botSendMessage(CHAT_ID,"Раздел создан. Добавьте команды в этот раздел.", subMenuKeyboard(sheetId));
    USER.setMenuLevel(sheetId);
  }
  
  else if(String(USER.currentAction).startsWith(AdminActions.input_command)){
    let sheetId = parseInt(String(USER.currentAction).split("=")[1]);
    let command = String(USER.currentAction).split("=")[2];
    let index = parseInt(String(USER.currentAction).split("=")[3]);
    if(!index) index = 0;
    index = setBotCommand(sheetId,command,{chat_id: CHAT_ID, message_id: MESSAGE_ID},MESSAGE_TEXT,index);
    USER.setCurrentAction( AdminActions.input_command+"="+sheetId+"="+command+"="+index);
    MESSAGE_TEXT = command; 
    botSendMessage(CHAT_ID,"Пришлите следующее сообщение, которое боту отправлять в ответ на эту команду или нажмите /stop для сохранения");
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