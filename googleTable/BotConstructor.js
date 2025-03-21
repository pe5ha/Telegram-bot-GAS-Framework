

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

let AdminActions = {
  input_post: "input_post",
  waiting_push: "waiting_push",
  input_push: "input_push",
  input_push_b: "input_push_b",
  input_helloMessage: "input_helloMessage",
}



let BotStrings = {
  bot_start_message: "Привет!",

  start_message_admin: {
    text: "У вас роль <b>администратора</b> в боте.\nВам доступны следующие возможности:"+
    "\n\n/addpost - добавить новый пост"+
    "\n\n/push - отправить сообщение всем пользователям"+
    "\n\n/push_button - отправить сообщение с кнопками"
  },

  question_instruction: {
    text: "Ты можешь отправить в бота любой вопрос по курсу и получить на него ответ!\nВсе детали связанные с вопросом указывай в том же сообщении."
    +"\nВ сообщении обязательно должен быть вопросительный знак '?' 😊\n",
  }
}



// Users sheet structure
let tUsers = {
  sheetName: "Users",
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
    return table.getSheetByName(this.sheetName);
  }
}

// Logs sheet structure
let LogSheet = {
  SheetName: "Log",
  time_Title: "время",
  id_Title: "id",
  nick_Title: "ник",
  name_Title: "имя",
  message_id_Title: "message id",
  action_Title: "действие",
  what_was_sent_Title: "что прислал",
  bot_answer_Title: "ответ бота",
  getColumnsOrder(){
    return [this.time_Title,	this.id_Title,	this.nick_Title,	this.name_Title,	this.message_id_Title, this.action_Title,this.what_was_sent_Title,this.bot_answer_Title];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  }
}

// Debug sheet structure
let DebugSheet = {
  SheetName: "Debug",
}


// Story sheet structure
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


// Users sheet structure
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

// tBotValues sheet structure
let tBotValues = {
  sheetName: "BotValues",
  key_Title: "переменная",
  value_Title: "значение",
  botName: {
    title: "Имя бота:",
    cell: "B2",
    comment: "",
  },
  helloMessage: {
    title: "Приветственное сообщение:",
    cell: "B3",
    cell_preview: "C3",
  },
  getColumnsOrder(){
    return [
      [this.botName.title],	
      [this.helloMessage.title],
    ];
  },
  use(){
    let sheet = table.getSheetByName(this.sheetName);
    if(!sheet){
      sheet = table.insertSheet(this.sheetName);
      let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
      sheet.getRange(1,1,1,2).setValues([[this.key_Title,this.value_Title]])
      .setTextStyle(style)
      .setHorizontalAlignment("center");
      sheet.getRange(2,1,this.getColumnsOrder().length,1).setValues(this.getColumnsOrder())
      .setTextStyle(style)
      .setHorizontalAlignment("center");
    }
    return sheet;
  },
  setBotName(botname){
    this.use().getRange(this.botName.cell).setValue(botname);
  },
  getBotName(){
    this.use().getRange(this.botName.cell).getValue();
  },
  setHelloMessageLink(chat_id,message_id,previewtext){
    this.use().getRange(this.helloMessage.cell).setValue(JSON.stringify({chat_id, message_id}));
    this.use().getRange(this.helloMessage.cell_preview).setValue(previewtext);
  },
  getHelloMessage(){
    return this.use().getRange(this.helloMessage.cell).getValue();
  }


}



// Story sheet structure
let tButtons = {
  sheetName: "Кнопки",
  text_Title: "Текст",
  link_Title: "Ссылка (если есть)",
  allRange: "A:B",
  getColumnsOrder(){
    return [
      this.text_Title,	
      this.link_Title
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
      sheet.deleteRows(3,990);
    }
    return sheet;
  }
}
