function broadcastPushService() {

  let message = tPush.use().getRange(tPush.message).getValue();
  let buttons_type = tPush.use().getRange(tPush.buttons_type).getValue();
  let buttons_link = tPush.use().getRange(tPush.buttons_link).getRichTextValue();
  let sending_type = tPush.use().getRange(tPush.sending_type).getValue();
  let whom_to_send = tPush.use().getRange(tPush.whom_to_send).getValue();

  // prepare keyboard if specified
  let keyboardSheetId = tBotCommands.getSheetId(); // по умолчанию берем из главного меню
  if(buttons_type=="Клавиатура"){
    let linkURL = buttons_link.getLinkUrl();
    if(linkURL && String(linkURL).startsWith("#gid=")){
      keyboardSheetId = parseInt(String(linkURL).split("=")[1]);
    }
  }

  // prepare message if it's post adress
  let postAdress = null;
  const postAdressPattern = /^\{"chat_id":-?\d+,"message_id":\d+\}$/;
  if (postAdressPattern.test(message)){
    postAdress = JSON.parse(message);
  }

  //
  let fromRowIndex = tPush.start_row_index-1;

  if(whom_to_send == "Вручную по списку ниже" && sending_type == "Копирование тг сообщения"){
    PushMessageStart(postAdress.chat_id, postAdress.message_id,keyboardSheetId,fromRowIndex);
  }



}