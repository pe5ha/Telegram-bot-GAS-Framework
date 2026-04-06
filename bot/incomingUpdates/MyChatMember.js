function myChatMemberReceived(my_chat_member) {
  // Handle the "my_chat_member" update
  USER_ID = my_chat_member.from.id;
  CHAT_ID = my_chat_member.chat.id;
  USER_NAME = my_chat_member.from.first_name + (my_chat_member.from.last_name ? " " + my_chat_member.from.last_name : "");
  USER_NICK = (my_chat_member.from.username ? "@" + my_chat_member.from.username : "");
  let CHAT_MEMBER_ID = my_chat_member.new_chat_member.user.id;
  let status = my_chat_member.new_chat_member.status;
  let chat_type = my_chat_member.chat.type; // Type of the chat, can be either “private”, “group”, “supergroup” or “channel”

  // initial user checking
  userRegister.check(USER_ID, USER_NICK, USER_NAME);

  logUpdate("new_chat_member.status: ", status);

  // личные чаты
  if (chat_type == "private") {
    if (status == "kicked") {
      USER.setIsBlockedBot(true);
    } else if (status == "member"){
      USER.setIsBlockedBot(false);
    }
  }

  // групповые чаты, каналы, супергруппы
  else {
    let id = my_chat_member.chat.id;
    let name = my_chat_member.chat.title;
    let username = my_chat_member.chat.username ? "@" + my_chat_member.chat.username : ""; 
    let type =  my_chat_member.chat.type;

    let existingChat = tBotChats.use().getDataRange().getValues();
    let row = existingChat.findIndex(row => row[0] == id);
    if(row != -1){ // если чат уже есть в таблице, то просто обновляем статус
      let data = [id,type,name,username,status,stringDate()];
      tBotChats.use().getRange(row + 1,1,1,data.length).setValues([data]);
      return;
    }
    else { // если чата нет в таблице, то добавляем его
      let data = [id,type,name,username,status,stringDate()];
      tBotChats.use().appendRow(data);
    }
  
  }

}