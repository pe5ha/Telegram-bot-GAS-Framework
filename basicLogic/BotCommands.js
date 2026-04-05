function checkForCommand(){

  if(USER.menuLevel){
    let sheetId = USER.menuLevel;
    executeCommand(sheetId, MESSAGE_TEXT);
  }
  else {
    let sheetId = TABLE.getSheetByName(tBotCommands.sheetName).getSheetId();
    executeCommand(sheetId, MESSAGE_TEXT);
  }
}

/**
 * 
 * @param {*} sheetId 
 * @param {*} command 
 * @returns RichTextValue or Null
 */
function getCommandValues(sheetId, command){
  let sheet = TABLE.getSheetById(sheetId);
  let commandsArray = sheet.getDataRange().getRichTextValues();
  for(let i=1;i<commandsArray.length;i++){
    if(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)].getText() == "") break;
    if(String(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)].getText()).trim() == command){
      return commandsArray[i];
    }
  }
  return null;
}

function executeCommand(sheetId, command){
  let isDone = false;
  let commandValues = getCommandValues(sheetId, command);
  let keyboard = subMenuKeyboard(sheetId);
  if(commandValues == null) return;
  for(let i = 2; i < commandValues.length; i++) {
    const richText = commandValues[i];
    let text = richText.getText(); 
    if(text == "") break;
    let linkURL = richText.getLinkUrl();
    let sheetId;
    const postAdressPattern = /^\{"chat_id":-?\d+,"message_id":\d+\}$/;
    if(linkURL){
      if(String(linkURL).startsWith("#gid=")){
        sheetId = parseInt(String(linkURL).split("=")[1]);
        subMenuResponse(sheetId, text);
        isDone = true;
      }
      else{} // TODO здесь возможно просто ссылка на куда-то
    }
    else if (postAdressPattern.test(text)){
      let postAdress = JSON.parse(text);
      postResponse(postAdress, keyboard);
      isDone = true;
    }
    else {
      botSendMessage(CHAT_ID, text, keyboard);
      isDone = true;
    }
  }
  return isDone;
}

function postResponse(postAdress, keyboard=MAIN_KEYBOARD){
  if(postAdress.chat_id && postAdress.message_id){
    botCopyMessage(CHAT_ID, postAdress.chat_id, postAdress.message_id, keyboard);
  } 
}

/**
 * 
 * @param {number} sheetId - sheet with commands and responses in columns A:B
 */
function subMenuResponse(sheetId, text){
  let sheet = TABLE.getSheetById(sheetId);
  let keyboard = subMenuKeyboard(sheetId);

  const postAdressPattern = /^\{"chat_id":-?\d+,"message_id":\d+\}$/;
  if (postAdressPattern.test(text)){
    let postAdress = JSON.parse(text);
    postResponse(postAdress, keyboard);
  }
  else {
    botSendMessage(CHAT_ID, text, keyboard);
  }
  USER.setMenuLevel(sheet.getSheetId());
}

function subMenuKeyboard(sheetId){
  if(!sheetId) sheetId = tBotCommands.getSheetId();
  let sheet = TABLE.getSheetById(sheetId);
  let commandsArray = sheet.getDataRange().getValues();
  let keyboard = {
    keyboard: [],
    resize_keyboard: true,
  };
  let row = -1;
  for(let i=1;i<commandsArray.length;i++){
    if(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)] == "") break;
    let commandRow = commandsArray[i][tBotCommands.getCol(tBotCommands.columns.row_Title)];
    if(commandRow == "") {
      keyboard.keyboard.push([]);
    }
    else if(row != commandRow ){
      keyboard.keyboard.push([]);
      row = commandRow;
    }
    keyboard.keyboard[keyboard.keyboard.length-1].push(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)]);
  }

  if(USER.role == UserRoles.admin && USER.currentAction == AdminActions.manage_commands){
    keyboard.keyboard.push([
      {text: "Добавить команду", style: "success"},
      {text: "Редактировать", style: "primary"},
      {text: "Удалить команду", style: "danger"},
    ],[{text: "Создать новый раздел", style: "primary"}]);
  }

  return keyboard;
}

function setBotCommand(sheetId, command, postAdress, preview, index=0){
  let sheet = TABLE.getSheetById(sheetId);
  if(!sheet) return;
  let commandsArray = sheet.getDataRange().getValues();
  let i; 
  for(i=1;i<commandsArray.length;i++){
    if(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)] == "") break;
    if(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)] == command){
      let row = i+1;
      if(index==0){
        let lastCol = sheet.getLastColumn();
        sheet.getRange(row,3,1,lastCol-1).clear();
      }
      sheet.getRange(row,3+index).setValue(JSON.stringify(postAdress));
      sheet.getRange(row,3+index).setNote(preview);
      return index+1;
    }
  }
  if(i>1) sheet.insertRowAfter(i);
  else sheet.insertRowBefore(i+1);
  sheet.getRange(i+1,2,1,2).setValues([[command,JSON.stringify(postAdress)]]);
  sheet.getRange(i+1,3).setNote(preview);
  return 1;
}

function deleteBotCommand(sheetId, command){
  let sheet = TABLE.getSheetById(sheetId);
  if(!sheet) return;
  let commandsArray = sheet.getDataRange().getValues();
  let i; 
  for(i=1;i<commandsArray.length;i++){
    if(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)] == "") break;
    if(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)] == command){
      let row = i+1;
      sheet.deleteRow(row);
      return;
    }
  }
}

function createMenuLevel(name){

  let tNewCommands =  Object.assign({
  sheetName: name,
  columnsOrder: ["Строка","Кнопка","Ответ"],
  }, TableMethods);

  return tNewCommands.use().getSheetId();
}
