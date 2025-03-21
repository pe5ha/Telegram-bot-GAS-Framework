// версия 1

let user = {
  telegramID: null,
  nick: null,
  name: null,
  currentAction: null,
  role: null,
  rowInTable: null,
  isNewUser: null,
  avtivity: null,
  email: null,
};

function makeUser(rowInTable, telegramID,nick,name,currentAction=null,role=null,avtivity=null,email=null,isNewUser=false){
  user.telegramID= telegramID;
  user.nick= nick;
  user.name= name;
  user.currentAction= currentAction;
  user.role= role;
  user.rowInTable= rowInTable;
  user.isNewUser= isNewUser;
  user.avtivity= avtivity;
  user.email= email;
  return user;
}

/**
 * 
 * @deprecated - is need fix
 */
function getUseridByUsername(username) {
  let idlist = tUsers.use().getRange('D:D').getValues();
  // idlist = idlist.flat(); // делает 2д массив одномерным
  for (let i = 0; i < idlist.length; i++) {
    for (let j = 0; j < idlist[i].length; j++) {
      if (idlist[i][j].toLowerCase() === username.toLowerCase()) {
        let row = i + 1;
        return tUsers.use().getRange(row, 2).getValue();
      }
    }
  }
  return null;
}


function setUserRole(user,role){
  tUsers.use().getRange(user.rowInTable, tUsers.getCol(tUsers.role_Title)+1).setValue(role);
  user.role=role;
}

/**
 * 
 * @param {user} user 
 * @param {String} currentAction 
 */
function setUserCurrentAction(user,currentAction){
  let row = user.rowInTable;
  let col = tUsers.getCol(tUsers.current_action_Title)+1;
  if(currentAction)
    tUsers.use().getRange(row, col).setValue(currentAction);
  else
    tUsers.use().getRange(row, col).clear();
  user.currentAction = currentAction;
}


/**
 * 
 * @param {user} user 
 * @param {String} avtivity 
 */
function setUserActivity(user,avtivity){
  let row = user.rowInTable;
  let col = tUsers.getCol(tUsers.activity_Title)+1;
  if(avtivity)
    tUsers.use().getRange(row, col).setValue(avtivity);
  else
    tUsers.use().getRange(row, col).clear();
  user.avtivity = avtivity;
}

/**
 * 
 * @param {user} user 
 * @param {number} stage 
 */
function setUserStage(user,stage){
  usersStages = tUsersStage.use().getRange(tUsers.allRange).getValues(); // массив всех значений id
  let row = -1;
  let i;
  for (i = 1; i < usersStages.length; i++) { // цикл от 0 до сколько всего юзеров
    if (usersStages[i][0] == "") break;
    if(usersStages[i][0] == user.telegramID){
      row = i + 1;
    }
  }
  if(row == -1){
    tUsersStage.use().insertRowAfter(i+1);
    tUsersStage.use().getRange(i+1,1,1,2).setValues([[user.telegramID,stage]]);
    user.stage = stage;
    return;
  }

  let col = tUsersStage.getCol(tUsersStage.stage_Title)+1;
  if(stage)
    tUsersStage.use().getRange(row, col).setValue(stage);
  else
    tUsersStage.use().getRange(row, col).clear();
  user.stage = stage;
}


function setUserLastStoryId(user,storyId){
  tUsers.use().getRange(user.rowInTable, tUsers.getCol(tUsers.current_action_Title)+1).setValue(storyId);
}
