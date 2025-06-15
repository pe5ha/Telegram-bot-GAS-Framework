function HelloMessasge(isUpdate=false){

  if(USER.role==UserRoles.admin) botSendMessage(CHAT_ID,BotStrings.start_message_admin.text);

  let helloMessageAdress = BotCache.getHelloMessage();
  if(helloMessageAdress)
    botCopyMessage(CHAT_ID,helloMessageAdress.chat_id,helloMessageAdress.message_id,MAIN_KEYBOARD);
  else{
    let mes = "Привет! Я бот <b>"+BOT_USERNAME+"</b>";
    botSendMessage(CHAT_ID,mes,MAIN_KEYBOARD);
  }

  USER.setCurrentAction(UserActions.without_action);
  
}