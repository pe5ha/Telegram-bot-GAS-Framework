
// TODO объединить в общий интерфейс c checkForCommand. Аргумент - табличка
function checkForCommandMaterial(text){
  let commandsArray = tMaterials.use().getRange("A:B").getValues();
  for(let i=1;i<commandsArray.length;i++){
    if(commandsArray[i][0] == "") break;
    if(String(commandsArray[i][0]).trim() == text){
      return commandsArray[i][1];
    }
  }
  return null;
}

/**
 * 
 * @param {*} tableName 
 * @param {*} command 
 * @returns RichTextValue or Null
 */
function getCommandValues(sheetName, command){
  let sheet = TABLE.getSheetByName(sheetName);
  let commandsArray = sheet.getDataRange().getRichTextValues();
  for(let i=1;i<commandsArray.length;i++){
    if(commandsArray[i][0].getText() == "") break;
    if(String(commandsArray[i][0].getText()).trim() == command){
      return commandsArray[i];
    }
  }
  return null;
}

function executeCommand(sheetName, command){
  let isDone = false;
  let commandValues = getCommandValues(sheetName, command);
  let keyboard = subMenuKeyboard(sheetName);
  if(commandValues == null) return;
  for(let i = 1; i < commandValues.length; i++) {
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
  let commandsArray = sheet.getRange("A:B").getValues();
  let keyboard = {
    keyboard: [],
    resize_keyboard: true,
  };
  for(let i=1;i<commandsArray.length;i++){
    if(commandsArray[i][0] == "") break;
    keyboard.keyboard.push([commandsArray[i][0]]);
  }

  const postAdressPattern = /^\{"chat_id":-?\d+,"message_id":\d+\}$/;
  if (postAdressPattern.test(text)){
    let postAdress = JSON.parse(text);
    postResponse(postAdress, keyboard);
  }
  else {
    botSendMessage(CHAT_ID, text, keyboard);
  }
  USER.setCurrentAction("menu="+sheet.getSheetName());
}

function subMenuKeyboard(sheetName){
  let sheet = TABLE.getSheetByName(sheetName);
  let commandsArray = sheet.getRange("A:B").getValues();
  let keyboard = {
    keyboard: [],
    resize_keyboard: true,
  };
  for(let i=1;i<commandsArray.length;i++){
    if(commandsArray[i][0] == "") break;
    keyboard.keyboard.push([commandsArray[i][0]]);
  }
  return keyboard;
}

function commandsListForAdmin(){
  let commandsArray = tBotCommands.getCommands();
  let commands = "";
  for(let i=1;i<commandsArray.length;i++){
    if(commandsArray[i][0] == "") break;
    commands+=commandsArray[i][0]+"\n";
  }
  return commands;
}

function setBotCommand(sheetId, command, postAdress, index=0){
  let sheet = TABLE.getSheetById(sheetId);
  if(!sheet) return;
  let commandsArray = sheet.getDataRange().getValues();
  let i; 
  for(i=1;i<commandsArray.length;i++){
    if(commandsArray[i][0] == "") break;
    if(commandsArray[i][0] == command){
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
    if(commandsArray[i][0] == "") break;
    if(commandsArray[i][0] == spicker){
      let row = i+1;
      tMaterials.use().getRange(row,2).setValue(JSON.stringify(postAdress));
      return;
    }
  }
  tMaterials.use().insertRowAfter(i);
  tMaterials.use().getRange(i+1,1,1,2).setValues([[spicker,JSON.stringify(postAdress)]]);
}