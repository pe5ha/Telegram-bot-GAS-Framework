// нерабочее решение через класс
// (так-то рабочее, но раз я использую таблички глобально во всем коде, и вообще
// все методы глобальны на все файлы - то нет и смысла использовать класс)
/**
 * Класс для регистрации пользователей в системе
 */
class UserRegister {
  /**
   * 
   * @param {tUsers} tUsers - Таблица пользователей
   * @param {Function} stringDate - Функция получения даты
   */
  constructor(tUsers, stringDate) {
    this.tUsers = tUsers;
    this.stringDate = stringDate;
    tLob.use()
  }

  /**
   * Регистрирует пользователя или обновляет его данные
   * @param {number} id - ID пользователя
   * @param {string} nick - Никнейм пользователя
   * @param {string} name - Имя пользователя
   * @returns {boolean} true - если пользователь новый, false - если уже существовал
   */
  register(id, nick, name) {
    const usersData = this.tUsers.use().getRange(this.tUsers.allRange).getValues();
    const row = this._findUserRow(usersData, id);

    if (row === -1) {
      this._registerNewUser(id, nick, name);
      return true;
    } else {
      this._updateExistingUser(row, id, nick, name, usersData);
      return false;
    }
  }

  /**
   * Находит строку пользователя в данных
   * @private
   * @param {Array} usersData - Данные всех пользователей
   * @param {number} id - ID искомого пользователя
   * @returns {number} Номер строки или -1 если не найден
   */
  _findUserRow(usersData, id) {
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].includes(parseInt(id))) {
        return i + 1; // +1 так как заголовки
      }
    }
    return -1;
  }

  /**
   * Регистрирует нового пользователя
   * @private
   * @param {number} id - ID пользователя
   * @param {string} nick - Никнейм
   * @param {string} name - Имя
   */
  _registerNewUser(id, nick, name) {
    user = User.create(2, id, nick, name, null, null, null, null, true)
      .setTable(this.tUsers);
    
    const userData = [
        this.stringDate(),
        user.telegramID,
        user.nick,
        user.name,
        user.currentAction,
        user.role
    ];

    this.tUsers.use().appendRow(userData);
  }

  /**
   * Обновляет данные существующего пользователя
   * @private
   * @param {number} row - Номер строки пользователя
   * @param {number} id - ID пользователя
   * @param {string} nick - Никнейм
   * @param {string} name - Имя
   * @param {Array} usersData - Данные всех пользователей
   * @returns {User} Обновленный пользователь
   */
  _updateExistingUser(row, id, nick, name, usersData) {
    const i = row - 1; // Индекс в массиве данных
    
    // Обновляем ник и имя если они изменились
    if (usersData[i][this.tUsers.getCol(this.tUsers.columns.nick)] !== nick) {
      this.tUsers.use()
        .getRange(row, this.tUsers.getCol(this.tUsers.columns.nick) + 1)
        .setValue(nick);
    }
    
    if (usersData[i][this.tUsers.getCol(this.tUsers.name)] !== name) {
      this.tUsers.use()
        .getRange(row, this.tUsers.getCol(this.tUsers.name) + 1)
        .setValue(name);
    }

    // Создаем и возвращаем объект пользователя
    user = User.create(
      row,
      id,
      nick,
      name,
      usersData[i][this.tUsers.getCol(this.tUsers.current_action)],
      usersData[i][this.tUsers.getCol(this.tUsers.role)],
      usersData[i][this.tUsers.getCol(this.tUsers.activity)],
      usersData[i][this.tUsers.getCol(this.tUsers.email)]
    ).setTable(this.tUsers);
  }
}

/**
 * Класс для регистрации пользователей в системе
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