// версия 1

function directMessage(){

  // initial user checking
  userRegister(user_id);

  
  if (text.startsWith("/")) { 
    text = text.replace(BotName,"");
  }
  // start
  if (text.startsWith("/start ")) { 
    let payload = text.split(" ")[1];
    startCommand(payload);
  }
  else if (text == "/start" || text == ("/start@"+BotName)) {
    startCommand();
  }
  
  // Buisnes Logic
  else {
    useCases();
  }

  
}



function startCommand(payload=null){
  if(user.isNewUser){ // если новый юзер
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
    let post_number = parseInt(payload);
    ShowPost(chat_id, post_number);
    setUserStage(user,post_number);
  }
  // просто /start
  else{
    HelloMessasge();
  }


}
