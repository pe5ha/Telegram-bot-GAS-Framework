
// включить логирование входящих в бота данных в лист Debug?
let LOG_DEBUG_ON = true;

// включить логирование отправляемых ботом сообщений?
let LOG_BOT_SENDING_ON = true;

// включить логирование приходящих сообщений от пользователей?
let LOG_INCOMING_ON = true;

// @username_bot 
let BOT_USERNAME;

// в какой чат боту слать возникающие в работе ошибки?
let ERRORS_LOG_CHAT;

let MAIN_KEYBOARD;

// bot service variables
let CHAT_ID;
let USER_ID;
let USER_NAME;
let USER_NICK;
let MESSAGE_DATE;
let MESSAGE_ID;
let MESSAGE_TEXT;
let BUTTON_DATA;
let USER_PHONE;

// users data arrays gets from Users sheet
let USERS_DATA; 

// globalUser
let USER = new User();

// bot token
let TOKEN = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
let activeSheet = SpreadsheetApp.getActive();
let SpreadsheetID;
if(activeSheet)
  SpreadsheetID = activeSheet.getId();
if(!SpreadsheetID)
  SpreadsheetID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
// google tables service variables
let TABLE = SpreadsheetApp.openById(SpreadsheetID);

function getToken(){return TOKEN;}
function getTableId(){return TABLE.getId();}  


/**
 * Выполняется при каждом запуске бота, для инициализации глобальных значений.
 */
function botInitialization(){
  // USER = new User();

  ERRORS_LOG_CHAT = PropertiesService.getScriptProperties().getProperty('ERRORS_CHAT');
  BOT_USERNAME = PropertiesService.getScriptProperties().getProperty('BOT_USERNAME');

  MAIN_KEYBOARD = subMenuKeyboard(TABLE.getSheetByName(tBotCommands.sheetName).getSheetId());
}