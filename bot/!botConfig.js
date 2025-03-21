
// отключить логирование входящих в бота данных в лист Debug?
let doNotLogDebug = false;

// отключить логирование отправляемых ботом сообщений?
let doNotLogBotSending = false;

// отключить логирование приходящих ботом сообщений от пользователей?
let doNotLog = false;

// @username_bot 
let BotName = PropertiesService.getScriptProperties().getProperty('BOT_USERNAME');

let errorMessagesChat = PropertiesService.getScriptProperties().getProperty('ERRORS_CHAT');
