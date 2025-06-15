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
let USER;

// TODO-  пересмотреть ниже
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