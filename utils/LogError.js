function logError(errorText){
  if(!LOG_DEBUG_ON) return;
  TelegramAPI.sendMessage(TOKEN, ERRORS_LOG_CHAT, errorText);
  let tDebug = TABLE.getSheetByName("Debug");
  if(tDebug == null) { 
    TABLE.insertSheet("Debug"); 
    tDebug = TABLE.getSheetByName("Debug");
  }
  tDebug.use().appendRow([stringDate(),errorText]);
}

function logDebug(e){
  if(!LOG_DEBUG_ON) return;
  let tDebug = TABLE.getSheetByName("Debug");
  if(tDebug == null) { 
    TABLE.insertSheet("Debug"); 
    tDebug = TABLE.getSheetByName("Debug");
  }
  tDebug.getRange(1, 3).setValue(JSON.stringify(e, null, 5));
  let contents = JSON.parse(e.postData.contents);
  tDebug.getRange(1, 1).setValue(JSON.stringify(contents, null, 5));
}
