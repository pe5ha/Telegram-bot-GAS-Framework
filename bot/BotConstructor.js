//User roles
let UserRoles = {
  without_role: "",
  admin: "admin",

}

//User Current Actions (use cases)
let UserActions = {
  without_action: "",
  input_email: "input_email",
  input_phone: "input_phone",
}

let AdminActions = { // TODO - пересмотреть
  input_post: "input_post",
  waiting_push: "waiting_push",
  input_push: "input_push",
  input_push_b: "input_push_b",
  input_helloMessage: "input_helloMessage",
  edit_command: "edit_command",
  input_command: "input_command",
  edit_material: "edit_material",

}

let BotStrings = {
  start_message_admin: {
    text: "У вас роль <b>администратора</b> в боте.\nВам доступны следующие возможности:"+
    "\n/commands - список команд в боте"+
    "\n/editcommand - редактировать/добавить команду"+
    "\n/sethello - изменить приветсвие (команду /start)"
  },

  question_instruction: {
    text: "Ты можешь отправить в бота любой вопрос по курсу и получить на него ответ!\nВсе детали связанные с вопросом указывай в том же сообщении."
    +"\nВ сообщении обязательно должен быть вопросительный знак '?' 😊\n",
  }
}

// Меню с командами в боте. Команда /start почти всегда нужна для перезапуска бота/вызова меню. 
function setMyCommands(){
  let commands = [
    {command: "start", description: "Главное меню"},
  ];
  console.log(TelegramAPI.setMyCommands(TOKEN,commands));
}