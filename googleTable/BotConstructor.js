//User roles
let UserRoles = {
  without_role: "",
  admin: "admin",

}

//User Current Actions (use cases)
let UserActions = {
  without_action: "",
  input_email: "input_email",
  input_phone: "input_phone",
}

let AdminActions = { // TODO - пересмотреть
  input_post: "input_post",
  waiting_push: "waiting_push",
  input_push: "input_push",
  input_push_b: "input_push_b",
  input_helloMessage: "input_helloMessage",
  edit_command: "edit_command",
  input_command: "input_command",
  edit_material: "edit_material",

}

let BotStrings = {
  start_message_admin: {
    text: "У вас роль <b>администратора</b> в боте.\nВам доступны следующие возможности:"+
    "\n/commands - список команд в боте"+
    "\n/editcommand - редактировать/добавить команду"+
    "\n/sethello - изменить приветсвие (команду /start)"
  },

  question_instruction: {
    text: "Ты можешь отправить в бота любой вопрос по курсу и получить на него ответ!\nВсе детали связанные с вопросом указывай в том же сообщении."
    +"\nВ сообщении обязательно должен быть вопросительный знак '?' 😊\n",
  }
}


/** tStories - Цепочки сообщений (воронки)
let tStories = {
  sheetName: "Посты",
  number: "номер",
  message_adres_Title: "Адрес сообщения",
  preview_Title: "Предпросмотр (не используется ботом)",
  allRange: "A:B",
  getColumnsOrder(){
    return [
      this.number,
      this.message_adres_Title,	
      this.preview_Title
    ]
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle)+1;
  },
  getInd(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(){
    let sheet = table.getSheetByName(this.sheetName);
    if(!sheet){
      sheet = table.insertSheet(this.sheetName);
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      sheet.getRange(1,1,1,this.getColumnsOrder().length).setValues([this.getColumnsOrder()])
      .setTextStyle(style)
      .setHorizontalAlignment("center");
      sheet.setColumnWidths(2,2,300);
      sheet.deleteRows(3,990);
      sheet.deleteColumns(4,23);
    }
    return sheet;
  }
}
*/

/** tPush - лист для отправки выборочных пушей через бота
let tPush = {
  sheetName: "Push",
  reg_date_Title: "дата регистрации",
  id_Title: "id",
  nick_Title: "ник",
  name_Title: "имя",
  current_action_Title: "текущее действие",
  role_Title: "роль",
  activity_Title: "активность",
  email_Title: "email",
  phone_Title: "phone",
  allRange: "A:I",
  getColumnsOrder(){
    return [
      this.reg_date_Title,	
      this.id_Title,	
      this.nick_Title,	
      this.name_Title,	
      this.current_action_Title, 
      this.role_Title,
      this.activity_Title,
      this.email_Title,
      this.phone_Title
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(){
    let sheet = table.getSheetByName(this.sheetName);
    if(!sheet){
      sheet = table.insertSheet(this.sheetName);
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      sheet.getRange(1,1,1,this.getColumnsOrder().length).setValues([this.getColumnsOrder()])
      .setTextStyle(style)
      .setHorizontalAlignment("center");
      sheet.deleteRows(3,995);
    }
    return sheet;
  }
}
*/

/** tUsersStage - лист для хранения прогресса прохождения этапов в боте ?
let tUsersStage = {
  sheetName: "UsersProgress",
  id_Title: "id",
  stage_Title: "этап",
  allRange: "A:B",
  getColumnsOrder(){
    return [
      this.id_Title,	
      this.stage_Title,
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(){
    let sheet = table.getSheetByName(this.sheetName);
    if(!sheet){
      sheet = table.insertSheet(this.sheetName);
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      sheet.getRange(1,1,1,this.getColumnsOrder().length).setValues([this.getColumnsOrder()])
      .setTextStyle(style)
      .setHorizontalAlignment("center");
      sheet.deleteRows(3,995);
    }
    return sheet;
  }
}
*/

// tBotValues sheet structure
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
