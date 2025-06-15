// версия 1

function messageReceived(message) {
  CHAT_ID = message.chat.id;
  USER_ID = message.from.id;
  name = message.from.first_name + (message.from.last_name ? " " + message.from.last_name : "");
  USER_NICK = (message.from.username ? "@" + message.from.username : "");
  MESSAGE_DATE = message.date;
  
  MESSAGE_ID = message.message_id;

  if(message.text) MESSAGE_TEXT = message.text;
  else if(message.video) MESSAGE_TEXT = message.caption;
  else if(message.photo) MESSAGE_TEXT = message.caption;
  else if(message.audio) MESSAGE_TEXT = message.caption;
  else if(message.document) MESSAGE_TEXT = message.caption;
  else if(message.voice) MESSAGE_TEXT = message.caption;
  if(!MESSAGE_TEXT) MESSAGE_TEXT = "";
  if(message.contact) USER_PHONE = message.contact.phone_number;


  logUpdate("Сообщение: ",MESSAGE_TEXT);


  if (CHAT_ID == USER_ID) { // сообщения в лс
    directMessage();
  }
  else { // сообщения в групповых чатах (и каналах ?)
    // groupChatMessage(message);
  }
}