const BotCache = {
  _props: PropertiesService.getScriptProperties(),

  setHelloMessage(chat_id, message_id, previewText) {
    const data = JSON.stringify({ chat_id, message_id });
    this._props.setProperty('HELLO_MESSAGE', data);
  },

  getHelloMessage() {
    const data = this._props.getProperty('HELLO_MESSAGE');
    return data ? JSON.parse(data) : null;
  }
};