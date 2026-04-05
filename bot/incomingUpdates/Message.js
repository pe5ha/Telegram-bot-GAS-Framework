function messageReceived(message) {
  CHAT_ID = message.chat.id;
  USER_ID = message.from.id;
  USER_NAME = message.from.first_name + (message.from.last_name ? " " + message.from.last_name : "");
  USER_NICK = (message.from.username ? "@" + message.from.username : "");
  MESSAGE_DATE = message.date;
  
  MESSAGE_ID = message.message_id;

  if(message.text) MESSAGE_TEXT = message.text;
  else if(message.video) MESSAGE_TEXT = message.caption ? message.caption : "(видео)";
  else if(message.photo) MESSAGE_TEXT = message.caption ? message.caption : "(фото)";
  else if(message.audio) MESSAGE_TEXT = message.caption ? message.caption : "(аудио)";
  else if(message.document) MESSAGE_TEXT = message.caption ? message.caption : "(документ)";
  else if(message.voice) MESSAGE_TEXT = "(голосовое сообщение)";
  else if(message.video_note) MESSAGE_TEXT = "(видеосообщение)";
  else if(message.sticker) MESSAGE_TEXT = message.sticker.emoji + " (стикер)";
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