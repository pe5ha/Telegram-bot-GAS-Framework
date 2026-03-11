function directMessage(){

  // initial user checking
  userRegister.check(USER_ID, USER_NICK, USER_NAME);

  
  if (MESSAGE_TEXT.startsWith("/")) { 
    MESSAGE_TEXT = MESSAGE_TEXT.replace(BOT_USERNAME,"");
  }
  // start
  if (MESSAGE_TEXT.startsWith("/start ")) { 
    let payload = MESSAGE_TEXT.split(" ")[1];
    startCommand(payload);
  }
  else if (MESSAGE_TEXT == "/start" || MESSAGE_TEXT == ("/start@"+BOT_USERNAME)) {
    startCommand();
  }
  
  // Buisnes Logic
  else {
    useCases();
  }

  
}



function startCommand(payload=null){
  if(USER.isNewUser){ // если новый юзер
    // TODO новый юзер
    if(payload){ // реферал
      
    }
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! eудалить потом
    // if(payload=="giveadmin234324"){
    //   setUserRole(user,UserRoles.admin);
    // }
  }

  // deep link
  if(payload){ 
    
  }
  // просто /start
  else{
    HelloMessasge();
  }


}
