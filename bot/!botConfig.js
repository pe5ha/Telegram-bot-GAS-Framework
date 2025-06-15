
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

function botInitialization(){
  USER = new User();

  ERRORS_LOG_CHAT = PropertiesService.getScriptProperties().getProperty('ERRORS_CHAT');
  BOT_USERNAME = PropertiesService.getScriptProperties().getProperty('BOT_USERNAME');

  MAIN_KEYBOARD = {
    keyboard: [
    ],
    resize_keyboard: true,
    is_persistent: true,

  };

  let commandsArray = tBotCommands.getAllRangeValues();
  for(let i=1;i<commandsArray.length;i++){
    if(commandsArray[i][0] == "") break;
    MAIN_KEYBOARD.keyboard.push([commandsArray[i][0]]);
  }
}