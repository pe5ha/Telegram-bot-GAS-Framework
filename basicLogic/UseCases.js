
/**
 *   Bot use cases detecting (User Roles and Current actions)
 */
function useCases(){
  
  /**
   * Проверка на роль админа
   */
  if(user.role==UserRoles.admin){
    adminUseCases();
  }

  /**
   * Пример события
   */
  if(text=="Привет"){
    botSendMessage(chat_id,"Привет, " + name);
  }

}

