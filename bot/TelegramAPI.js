/**
 * Телеграмовские обращения к API методы
 */

let TelegramAPI = {

sendMediaGroup(token, chat_id, media) {
  let data = {
    method: "post",
    payload: {
      method: "sendMediaGroup",
      chat_id: String(chat_id),
      media: JSON.stringify(media)
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},

sendPhoto(token, chat_id, photo) {
  let data = {
    method: "post",
    payload: {
      method: "sendPhoto",
      chat_id: String(chat_id),
      photo: photo
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},

sendDocument(token, chat_id, text, blob) {
  let data = {
    method: "post",
    payload: {
      method: "sendDocument",
      chat_id: String(chat_id),
      document: blob,
      caption: text,
      parse_mode: "HTML",
      disable_notification: false
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},

copyMessage(token,chat_id,from_chat_id,message_id,keyboard=null,protect_content=false){
  if(keyboard!=null) keyboard = JSON.stringify(keyboard);
  let data = {
    method: "post",
    payload: {
      method: "copyMessage",
      chat_id: String(chat_id),
      from_chat_id: String(from_chat_id),
      message_id: message_id,
      reply_markup: keyboard,
      protect_content: protect_content
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},

editMessage(token,chat_id,message_id,txt,keyboard=null){
  // если без кнопок сообщение то клавиатура null
  if(keyboard!=null) keyboard = JSON.stringify(keyboard);

  let data={
    method: "post",
    payload:{
      method: "editMessageText",
      chat_id: String(chat_id),
      message_id: String(message_id),
      text: txt,
      parse_mode: "HTML",
      reply_markup: keyboard
    },
    muteHttpExceptions: true
  };
  let resp = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/", data);
  return JSON.parse(resp).result.message_id;
},

editMessageReplyMarkup(token,chat_id,message_id,keyboard=null){
  // если без кнопок сообщение то клавиатура null
  if(keyboard!=null) keyboard = JSON.stringify(keyboard);

  let data={
    method: "post",
    payload:{
      method: "editMessageReplyMarkup",
      chat_id: String(chat_id),
      message_id: message_id,
      reply_markup: keyboard
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},

deleteMessage(token,chat_id,message_id){
  let data={
    method: "post",
    payload:{
      method: "deleteMessage",
      chat_id: String(chat_id),
      message_id: message_id
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},


/**
* Send message.
*
* @param  {String} token      The token of telegram bot.
* @param  {String} chat_id The chat_id where send message.
* @param  {String} txt The text of message.
* @param  {Object[][]} keyboard Object of keyboard (optional).
* @param  {String} parse_mode Parse mode HTLM or Markdown of message (optional).
* @param  {Boolean} disableWebPagePreview Disables link previews for links in this message (optional).
* @returns {resp} Telegram response
*/
sendMessage(token,chat_id,txt,keyboard=null,parsemode="",disableWebPagePreview=false){
  // если без кнопок сообщение то клавиатура null
  if(keyboard!=null) keyboard = JSON.stringify(keyboard);

  let data={
    method: "post",
    payload:{
      method: "sendMessage",
      chat_id: String(chat_id),
      text: txt,
      parse_mode: parsemode,
      reply_markup: keyboard,
      disable_web_page_preview: disableWebPagePreview
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},

forwardMessage(token,chat_id,from_chat_id,message_id){
  let data={
    method: "post",
    payload:{
      method: "forwardMessage",
      chat_id: String(chat_id),
      from_chat_id: String(from_chat_id),
      message_id: message_id
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},
};

function sendData(token,data){
  try{
    let resp = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/", data);
    let result = JSON.parse(resp);
    return result;
  }
  catch(e){
    Logger.log(e);
    return null;
  }  
}
