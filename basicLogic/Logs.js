// версия 1

/**
 * Логирование всех сообщений, нажатий кнопок и всего прочего приходящего в бота в таблицу
 * @param {String} text - Текст обновления в нужном для таблице виде
 */
 function logUpdate(action, text) {
  if(!LOG_INCOMING_ON) return;
  tLog.use().insertRowBefore(2);
  let logdate = MESSAGE_DATE ? stringDate(MESSAGE_DATE*1000) : stringDate();
  let logData = [logdate,USER_ID,USER_NICK,USER_NAME,MESSAGE_ID,action, text];
  tLog.use().getRange(2,1,1,logData.length).setValues([logData]);
}

function logBotCopying(chat_id, message_id) {
  if(!LOG_BOT_SENDING_ON) return;
  tLog.use().insertRowBefore(2);
  let logData = [stringDate(),chat_id,"","",message_id, "Отправлена копия"];
  tLog.use().getRange(2,1,1,logData.length).setValues([logData]);
}

/**
 * Логирование всего что исходит пользователям ИЗ бота. То есть сообщения от бота
 * @param {String} text - Текст обновления в нужном для таблице виде
 */
function logBotSending(text) {
  if(!LOG_BOT_SENDING_ON) return;
  tLog.use().insertRowBefore(2);
  let logdate = MESSAGE_DATE ? stringDate(MESSAGE_DATE*1000) : stringDate();
  let logData = [[logdate,CHAT_ID,USER_NICK,USER_NAME,"","","",text]];
  // TODO chat_id заменить на имя ЧАТА (групповой чат или диалог)
  tLog.use().getRange(2,1,1,logData[0].length).setValues(logData);
}





/**
 * @deprecated use logUpdate with text parameter instead 
 */
function logButtons() {
  let tLog = TABLE.getSheetByName(LogSheet);
  let saveData = [];
  saveData.push(Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy HH:mm:ss"));
  saveData.push(USER_ID);
  saveData.push(USER_NICK);
  saveData.push(USER_NAME);
  saveData.push("Кнопка: " + BUTTON_DATA);
  tLog.insertRowBefore(2);
  tLog.getRange(2, 1, 1, saveData.length).setValues([saveData]);
}

/**
 * @deprecated use logUpdate with text parameter instead 
 */
function logMessages() {
  let tLog = TABLE.getSheetByName(LogSheet);
  let saveData = [];
  saveData.push(Utilities.formatDate(new Date(MESSAGE_DATE * 1000), "GMT+3", "dd.MM.yyyy HH:mm:ss"));
  saveData.push(USER_ID);
  saveData.push(USER_NICK);
  saveData.push(USER_NAME);
  saveData.push(MESSAGE_TEXT);
  tLog.insertRowBefore(2);
  tLog.getRange(2, 1, 1, saveData.length).setValues([saveData]);
}

