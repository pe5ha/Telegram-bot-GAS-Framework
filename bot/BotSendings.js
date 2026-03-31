function botSendMessage(chat_id, textToSend,keyboard=null,parsemode="HTML",disableWebPagePreview=false){
  if(!keyboard) keyboard = { remove_keyboard: true };

  let telegramResp = TelegramAPI.sendMessage(TOKEN, chat_id, textToSend,keyboard,parsemode,disableWebPagePreview);
  afterSending(telegramResp);
}

function afterSending(telegramResp){
  if(telegramResp.ok){
    //{ok=true, result={message_id=2502.0, text=mes, date=1.665002153E9, from={is_bot=true, id=2.053644544E9, first_name=Марс бот!!!, username=terraforming_mars_bot}, chat={type=private, username=Pavel_Naumenko, first_name=Павел Науменко, id=2.35733832E8}}}
    let sentMessage = telegramResp.result;
    let sentMessage_id = sentMessage.message_id;
    logBotSending(sentMessage.text);
    return true;
  }
  else{ // ошибка отправки

    botSendMessage(ERRORS_LOG_CHAT,JSON.stringify(telegramResp));

    if(telegramResp.error_code==400){
      // {"ok":false,"error_code":400,"description":"Bad Request: chat not found"}
      // TODO
      // logDebug()
    }
    else if(telegramResp==403){
      // {"ok":false,"error_code":403,"description":"Forbidden: bot was blocked by the user"} 
      // TODO
    }
    return false;
  }
}

function botCopyMessage(chat_id,from_chat_id,message_id,keyboard=null,protect_content=false){
  if(!keyboard) keyboard = { remove_keyboard: true };

  let telegramResp = TelegramAPI.copyMessage(TOKEN,chat_id,from_chat_id,message_id,keyboard,protect_content);
  return afterCopy(telegramResp,chat_id);
}

function afterCopy(telegramResp,chat_id){
  if(telegramResp.ok){
    //{ok=true, result={message_id=2502.0, text=mes, date=1.665002153E9, from={is_bot=true, id=2.053644544E9, first_name=Марс бот!!!, username=terraforming_mars_bot}, chat={type=private, username=Pavel_Naumenko, first_name=Павел Науменко, id=2.35733832E8}}}
    let sentMessage_id = telegramResp.result.message_id;
    logBotCopying(chat_id,sentMessage_id);
    return true;
  }
  else{ // ошибка отправки
    if(telegramResp.error_code==400){
      // {"ok":false,"error_code":400,"description":"Bad Request: chat not found"}
      // TODO
      // logDebug()
    }
    else if(telegramResp==403){
      // {"ok":false,"error_code":403,"description":"Forbidden: bot was blocked by the user"} 
      // TODO
    }
    else {
      botSendMessage(ERRORS_LOG_CHAT,JSON.stringify(telegramResp));
    }
    return false;
  }
}