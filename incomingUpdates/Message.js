// версия 1

function messageReceived(message) {
  chat_id = message.chat.id;
  user_id = message.from.id;
  name = message.from.first_name + (message.from.last_name ? " " + message.from.last_name : "");
  nick = (message.from.username ? "@" + message.from.username : "");
  date = message.date;
  
  message_id = message.message_id;

  if(message.text) text = message.text;
  else if(message.video) text = message.caption;
  else if(message.photo) text = message.caption;
  else if(message.audio) text = message.caption;
  else if(message.document) text = message.caption;
  else if(message.voice) text = message.caption;
  if(!text) text = "";
  if(message.contact) phone = message.contact.phone_number;


  logUpdate("Сообщение: ",text);


  if (chat_id == user_id) { // сообщения в лс
    directMessage();
  }
  else { // сообщения в групповых чатах (и каналах ?)
    // groupChatMessage(message);
  }
}