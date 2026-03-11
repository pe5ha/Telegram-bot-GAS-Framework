function callbackQueryReceived(callback_query) {
  USER_ID = callback_query.from.id;
  CHAT_ID = callback_query.message.chat.id;
  USER_NAME = callback_query.from.first_name + (callback_query.from.last_name ? " " + callback_query.from.last_name : "");
  USER_NICK = (callback_query.from.username ? "@" + callback_query.from.username : "");
  MESSAGE_ID = callback_query.message.message_id;
  BUTTON_DATA = callback_query.data;

  // initial user checking
  userRegister(USER_ID);

  logUpdate("Кнопка: ", BUTTON_DATA);

  useCasesButtons(BUTTON_DATA);
  
}