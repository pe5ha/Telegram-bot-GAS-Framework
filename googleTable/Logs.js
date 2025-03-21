// версия 1

/**
 * Логирование всех сообщений, нажатий кнопок и всего прочего приходящего в бота в таблицу
 * @param {String} text - Текст обновления в нужном для таблице виде
 */
 function logUpdate(action, text) {
  if(doNotLog) return;
  let tLog = table.getSheetByName(LogSheet.SheetName);
  if(tLog == null) { // если такого листа нет
    table.insertSheet(LogSheet.SheetName); // то такой лист создаётся
    tLog = table.getSheetByName(LogSheet.SheetName);
    let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
    tLog.getRange(1,1,1,LogSheet.getColumnsOrder().length).setValues([LogSheet.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
  }
  tLog.insertRowBefore(2);
  let logdate = date ? stringDate(date*1000) : stringDate();
  let logData = [logdate,user_id,nick,name,message_id,action, text];
  tLog.getRange(2,1,1,logData.length).setValues([logData]);
}

function logBotCopying(chat_id, message_id) {
  if(doNotLog) return;
  let tLog = table.getSheetByName(LogSheet.SheetName);
  if(tLog == null) { // если такого листа нет
    table.insertSheet(LogSheet.SheetName); // то такой лист создаётся
    tLog = table.getSheetByName(LogSheet.SheetName);
    let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
    tLog.getRange(1,1,1,LogSheet.getColumnsOrder().length).setValues([LogSheet.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
  }
  tLog.insertRowBefore(2);
  let logData = [stringDate(),chat_id,"","",message_id, "Отправлена копия"];
  tLog.getRange(2,1,1,logData.length).setValues([logData]);
}

/**
 * Логирование всего что исходит пользователям ИЗ бота. То есть сообщения от бота
 * @param {String} text - Текст обновления в нужном для таблице виде
 */
function logBotSending(text) {
  if(doNotLogBotSending) return;
  let tLog = table.getSheetByName(LogSheet.SheetName);
  if(!tLog) return;

  tLog.insertRowBefore(2);
  let logdate = date ? stringDate(date*1000) : stringDate();
  let logData = [[logdate,chat_id,nick,name,"","","",text]];
  // TODO chat_id заменить на имя ЧАТА (групповой чат или диалог)
  tLog.getRange(2,1,1,logData[0].length).setValues(logData);
}

function logDebug(e){
  if(doNotLogDebug) return;
  let tDebug = table.getSheetByName(DebugSheet.SheetName);
  if(tDebug == null) { // если такого листа нет
    table.insertSheet(DebugSheet.SheetName); // то такой лист создаётся
    tDebug = table.getSheetByName(DebugSheet.SheetName);
  }
  tDebug.getRange(1, 3).setValue(JSON.stringify(e, null, 5));
  let contents = JSON.parse(e.postData.contents);
  tDebug.getRange(1, 1).setValue(JSON.stringify(contents, null, 5));
}






/**
 * @deprecated use logUpdate with text parameter instead 
 */
function logButtons() {
  let tLog = table.getSheetByName(LogSheet);
  let saveData = [];
  saveData.push(Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy HH:mm:ss"));
  saveData.push(user_id);
  saveData.push(nick);
  saveData.push(name);
  saveData.push("Кнопка: " + data);
  tLog.insertRowBefore(2);
  tLog.getRange(2, 1, 1, saveData.length).setValues([saveData]);
}

/**
 * @deprecated use logUpdate with text parameter instead 
 */
function logMessages() {
  let tLog = table.getSheetByName(LogSheet);
  let saveData = [];
  saveData.push(Utilities.formatDate(new Date(date * 1000), "GMT+3", "dd.MM.yyyy HH:mm:ss"));
  saveData.push(user_id);
  saveData.push(nick);
  saveData.push(name);
  saveData.push(text);
  tLog.insertRowBefore(2);
  tLog.getRange(2, 1, 1, saveData.length).setValues([saveData]);
}

