function editMessageReceived(edited_message){
  CHAT_ID = edited_message.chat.id;
  USER_ID = edited_message.from.id;
  USER_NAME = edited_message.from.first_name + (edited_message.from.last_name ? " " + edited_message.from.last_name : "");
  USER_NICK = (edited_message.from.username ? "@" + edited_message.from.username : "");
  MESSAGE_DATE = edited_message.date;
  let edit_date = edited_message.edit_date;
  MESSAGE_TEXT = edited_message.text;
  MESSAGE_ID = edited_message.message_id;

  logUpdate("Сообщение изменено: ", MESSAGE_TEXT);


  // if (chat_id == user_id) { // сообщения в лс
  //   directMessage();
  // }
  // else { // сообщения в групповых чатах (и каналах ?)
  //   groupChatMessage();
  // }
}