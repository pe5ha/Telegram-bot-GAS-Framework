class User {
  constructor(rowInTable, telegramID, nick, name, currentAction = null, role = null, activity = null, email = null, isNewUser = false) {
    this.telegramID = telegramID;
    this.nick = nick;
    this.name = name;
    this.currentAction = currentAction;
    this.role = role;
    this.rowInTable = rowInTable;
    this.isNewUser = isNewUser;
    this.activity = activity;
    this.email = email;
    this.tUsers = null;
  }

  // Инициализация таблицы пользователей
  setTable(tUsers) {
    this.tUsers = tUsers;
    return this;
  }

  // Установка текущего действия
  setCurrentAction(currentAction) {
    this._validateTable();
    
    const col = this.tUsers.getCol(this.tUsers.current_action_Title) + 1;
    this._updateCellValue(this.rowInTable, col, currentAction);
    this.currentAction = currentAction;
    
    return this;
  }

  // Установка активности
  setActivity(activity) {
    this._validateTable();
    
    const col = this.tUsers.getCol(this.tUsers.activity_Title) + 1;
    this._updateCellValue(this.rowInTable, col, activity);
    this.activity = activity;
    
    return this;
  }

  // Установка роли
  setRole(role) {
    this._validateTable();
    
    const col = this.tUsers.getCol(this.tUsers.role_Title) + 1;
    this._updateCellValue(this.rowInTable, col, role);
    this.role = role;
    
    return this;
  }

  // Приватный метод для обновления значения ячейки
  _updateCellValue(row, col, value) {
    const range = this.tUsers.use().getRange(row, col);
    if (value) {
      range.setValue(value);
    } else {
      range.clear();
    }
  }

  // Приватный метод для проверки инициализации таблицы
  _validateTable() {
    if (!this.tUsers) {
      throw new Error('Таблица пользователей не установлена. Сначала вызовите setTable()');
    }
  }

  // Статический метод создания пользователя
  static create(rowInTable, telegramID, nick, name, currentAction = null, role = null, activity = null, email = null, isNewUser = false) {
    return new User(rowInTable, telegramID, nick, name, currentAction, role, activity, email, isNewUser);
  }

  // Обновление данных пользователя
  update(data) {
    Object.keys(data).forEach(key => {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    });
    return this;
  }

  // Получение информации о пользователе
  getInfo() {
    return {
      telegramID: this.telegramID,
      nick: this.nick,
      name: this.name,
      currentAction: this.currentAction,
      role: this.role,
      activity: this.activity,
      email: this.email,
      isNewUser: this.isNewUser
    };
  }
}