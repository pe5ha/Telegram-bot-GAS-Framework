const TableMethods = {
  getColumnsOrder() {
    return this.columnsOrder;
  },

  getCol(columnTitle) {
    return this.columnsOrder.indexOf(columnTitle);
  },

  getAllRangeValues() {
    return this.use().getRange(this.allRange).getValues();
  },

  use() {
    let sheet = TABLE.getSheetByName(this.sheetName);
    if (!sheet) {
      sheet = this._initializeSheet();
    }
    return sheet;
  },

  _initializeSheet() {
    const sheet = TABLE.insertSheet(this.sheetName);
    const headers = [this.getColumnsOrder()];
    
    sheet.getRange(1, 1, 1, headers[0].length)
      .setValues(headers)
      .setTextStyle(this._getDefaultStyle?.() || SpreadsheetApp.newTextStyle().setBold(true).build())
      .setHorizontalAlignment("center");
    
    sheet.deleteRows(3, 998);
    sheet.deleteColumns(headers[0].length + 1, 26 - headers[0].length);
    
    return sheet;
  }
};

const tUsers = Object.assign({
  sheetName: "Users",
  columns: {
    regDate: "Дата рег.",
    id: "Телеграм ID",
    nick: "Ник",
    name: "Имя",
    currentAction: "Действие",
    role: "Роль",
    menuLevel: "Уровень меню",
    activity: "Активность",
    properties: "Свойства"
  },
  columnsOrder: ["Дата рег.","Телеграм ID","Ник","Имя","Действие","Роль","Уровень меню","Активность","Свойства"],
  allRange: "A:H"
}, TableMethods);

let tLog = Object.assign({
  sheetName: "Log",
  columns: {
    time: "Время",
    id: "Телеграм ID",
    nick: "Ник",
    name: "Имя",
    messageId: "Message ID",
    action: "Действие",
    sentData: "Что прислал",
    botAnswer: "Ответ бота"
  },
  columnsOrder: ["Время","Телеграм ID","Ник","Имя","Message ID","Действие","Что прислал","Ответ бота"]
  }, TableMethods);

let tBotCommands =  Object.assign({
  sheetName: "Главное меню",
  columns: {
    row_Title: "Строка",
    command_Title: "Кнопка",
    link_Title: "Ответ"
  },
  columnsOrder: ["Строка","Кнопка","Ответ"],
  allRange: "A:C"
  }, TableMethods);

  
/** tBotValues sheet structure
 * @deprecated
 */
let tBotValues = {
  sheetName: "BotValues",
  key_Title: "ключ",
  value_Title: "значение",
  info_Title: "комментарий",
  // botName: {
  //   key: "BOT_USERNAME",
  //   cell: "B2",
  //   // default_value: "",
  //   // comment: "никнейм бота в формате @username_bot ", 
  // },
  errorsChat: {
    key: "ERRORS_LOG_CHAT",
    cell: "B3",
    // default_value: "",
    // comment: "",
  },
  adminChatId: {
    key: "ADMIN_CHAT_ID",
    cell: "B4",
  },
  helloMessage: {
    key: "START_MESSAGE",
    cell: "B5",
    cell_preview: "C5",
  },
  getColumnsOrder(){
    return [
      [this.errorsChat.key],
      [this.adminChatId.key],
      [this.helloMessage.key]
    ];
  },
  use(){
    let sheet = TABLE.getSheetByName(this.sheetName);
    if(!sheet){
      sheet = TABLE.insertSheet(this.sheetName);
      let style = SpreadsheetApp.newTextStyle().setBold(true).build();
      sheet.getRange(1,1,1,3).setValues([[this.key_Title,this.value_Title, this.info_Title]])
      .setTextStyle(style)
      .setHorizontalAlignment("center");
      style = SpreadsheetApp.newTextStyle().setBold(true).build();
      sheet.getRange(2,1,this.getColumnsOrder().length,1).setValues(this.getColumnsOrder())
      .setTextStyle(style);
      sheet.setColumnWidths(1,3,200);
      sheet.deleteRows(10,990);
      sheet.deleteColumns(4,23);
    }
    return sheet;
  },
  setHelloMessageLink(chat_id,message_id,previewtext){
    this.use().getRange(this.helloMessage.cell).setValue(JSON.stringify({chat_id, message_id}));
    this.use().getRange(this.helloMessage.cell_preview).setValue(previewtext);
  },
  getHelloMessageAdress(){
    let messageLink = this.use().getRange(this.helloMessage.cell).getValue();
    if(messageLink) messageLink = JSON.parse(messageLink);
    else return null;
    return messageLink;
  },
 
  setadminChatId(adminChatId){
    this.use().getRange(this.adminChatId.cell).setValue(adminChatId);
  },
  getadminChatId(){
    return this.use().getRange(this.adminChatId.cell).getValue();
  },
  // setBotName(botname){
  //   this.use().getRange(this.botName.cell).setValue(botname);
  // },
  // getBotName(){
  //   return this.use().getRange(this.botName.cell).getValue();
  // },
  getErrorsChat(){
    return this.use().getRange(this.errorsChat.cell).getValue();
  },
  setHelloMessageLink(chat_id,message_id,previewtext){
    this.use().getRange(this.helloMessage.cell).setValue(JSON.stringify({chat_id, message_id}));
    this.use().getRange(this.helloMessage.cell_preview).setValue(previewtext);
  },
  getHelloMessage(){
    return this.use().getRange(this.helloMessage.cell).getValue();
  },
}