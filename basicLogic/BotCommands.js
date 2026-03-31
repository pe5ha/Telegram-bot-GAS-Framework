function checkForCommand(){

  if(USER.menuLevel){
    let sheetId = USER.menuLevel;
    executeCommand(sheetId, MESSAGE_TEXT);
  }
  else {
    let sheetId = TABLE.getSheetByName(tBotCommands.sheetName).getSheetId();
    executeCommand(sheetId, MESSAGE_TEXT);
  }

  // TODO вынести хранение уровня меню в отдельную переменную пользователя.
}

/**
 * 
 * @param {*} tableName 
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
  return keyboard;
}

function commandsListForAdmin(){
  let commandsArray = tBotCommands.getCommands();
  let commands = "";
  for(let i=1;i<commandsArray.length;i++){
    if(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)] == "") break;
    commands+=commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)]+"\n";
  }
  return commands;
}

function setBotCommand(sheetId, command, postAdress, index=0){
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
        sheet.getRange(row,2,1,lastCol-1).clear();
      }
      sheet.getRange(row,2+index).setValue(JSON.stringify(postAdress));
      return index+1;
    }
  }
  sheet.insertRowAfter(i);
  sheet.getRange(i+1,1,1,2).setValues([[command,JSON.stringify(postAdress)]]);
  return 1;
}


function setBotMaterial(spicker, postAdress){
  let commandsArray = tMaterials.use().getRange("A:A").getValues();
  let i; 
  for(i=1;i<commandsArray.length;i++){
    if(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)] == "") break;
    if(commandsArray[i][tBotCommands.getCol(tBotCommands.columns.command_Title)] == spicker){
      let row = i+1;
      tMaterials.use().getRange(row,2).setValue(JSON.stringify(postAdress));
      return;
    }
  }
  tMaterials.use().insertRowAfter(i);
  tMaterials.use().getRange(i+1,1,1,2).setValues([[spicker,JSON.stringify(postAdress)]]);
}