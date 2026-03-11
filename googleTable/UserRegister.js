
/**
 * для регистрации пользователей в системе
 */
const userRegister = {

  check(id, nick, name) {
    USERS_DATA = tUsers.use().getRange(tUsers.allRange).getValues();
    const row = this._findUserRow(USERS_DATA, id);

    if (row === -1) {
      this._registerNewUser(id, nick, name);
      return true;
    } else {
      this._updateExistingUser(row, id, nick, name, USERS_DATA);
      return false;
    }
  },

  _findUserRow(usersData, id) {
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].includes(parseInt(id))) {
        return i + 1; // +1 так как заголовки
      }
    }
    return -1;
  },

  _registerNewUser(id, nick, name) {
    USER = User.create(2, id, nick, name, null, null, null, null, true)
      .setTable(tUsers);
    
    const userData = [
        stringDate(),
        USER.telegramID,
        USER.nick,
        USER.name,
        USER.currentAction,
        USER.role
    ];

    tUsers.use().appendRow(userData);
  },

  _updateExistingUser(row, id, nick, name, usersData) {
    const i = row - 1; // Индекс в массиве данных
    
    // Обновляем ник и имя если они изменились
    if (usersData[i][tUsers.getCol(tUsers.columns.nick)] !== nick) {
      tUsers.use()
        .getRange(row, tUsers.getCol(tUsers.columns.nick) + 1)
        .setValue(nick);
    }
    
    if (usersData[i][tUsers.getCol(tUsers.columns.name)] !== name) {
      tUsers.use()
        .getRange(row, tUsers.getCol(tUsers.columns.name) + 1)
        .setValue(name);
    }

    // Создаем и возвращаем объект пользователя
    USER = User.create(
      row,
      id,
      nick,
      name,
      usersData[i][tUsers.getCol(tUsers.columns.currentAction)],
      usersData[i][tUsers.getCol(tUsers.columns.role)],
      usersData[i][tUsers.getCol(tUsers.columns.activity)],
      usersData[i][tUsers.getCol(tUsers.columns.properties)]
    ).setTable(tUsers);
  },
}