// версия 0.1

function groupChatMessage(message){

  // initial user checking
  userRegister(USER_ID);

  // only start
  if (MESSAGE_TEXT == "/start" || MESSAGE_TEXT == "/start@"+BOT_USERNAME) {
    startCommand();
    return;
  }
  // in group: t.me/your_bot?startgroup=payload
  
  // Buisnes Logic

  // если ничего не стриггерилось
  // useCases();

 

}

