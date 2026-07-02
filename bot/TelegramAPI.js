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

sendMessageOptional(token,chat_id,text,options){
  // если без кнопок сообщение то клавиатура null
  if(options.keyboard) options.keyboard = JSON.stringify(options.keyboard);
  if(options.reply_markup) options.reply_markup = JSON.stringify(options.reply_markup);
  // defaults
  if(!options.disable_web_page_preview) options.disableWebPagePreview = false;
  if(!options.parse_mode) options.parse_mode = "HTML";

  let data={
    method: "post",
    payload:{
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
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
getMe(token){
  let data={
    method: "post",
    payload:{
      method: "getMe"
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},

setMyCommands(token,commands){
  if(commands!=null) commands = JSON.stringify(commands);
  let data={
    method: "post",
    payload:{
      method: "setMyCommands",
      commands: commands
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},

sendInvoice(token, chat_id, title, description, payload, provider_token, prices, photo_url=null,photo_width=300,photo_height=150) {
  if(prices!=null) prices = JSON.stringify(prices);
  let data = {
    method: "post",
    payload: {
      method: "sendInvoice",
      chat_id: String(chat_id),
      title: title,
      description: description,
      payload: payload,
      provider_token: provider_token,
      currency: "RUB",
      prices: prices,
      photo_url: photo_url,
      photo_width: photo_width,
      photo_height: photo_height,
    },
    muteHttpExceptions: true
  };
  return sendData(token,data);
},

answerPreCheckoutQuery(token, pre_checkout_query_id, ok, error_message="К сожалению, сейчас товар недоступен. Обратитесь к администратору") {
  let data = {
    method: "post",
    payload: {
      method: "answerPreCheckoutQuery",
      pre_checkout_query_id: String(pre_checkout_query_id),
      ok: ok,
      error_message: error_message,
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
