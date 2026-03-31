class User {
  constructor(rowInTable, telegramID, nick, name, currentAction = null, role = null, menuLevel = null, activity = null, properties = null, isNewUser = false) {
    this.telegramID = telegramID;
    this.nick = nick;
    this.name = name;
    this.currentAction = currentAction;
    this.role = role;
    this.menuLevel = menuLevel;
    this.rowInTable = rowInTable;
    this.isNewUser = isNewUser;
    this.activity = activity;
    this.properties = properties;
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
    
    const col = tUsers.getCol(tUsers.columns.currentAction) + 1;
    this._updateCellValue(this.rowInTable, col, currentAction);
    this.currentAction = currentAction;
    
    return this;
  }

  // Установка текущего уровня меню
  setMenuLevel(menuLevel) {
    this._validateTable();
    
    const col = tUsers.getCol(tUsers.columns.menuLevel) + 1;
    this._updateCellValue(this.rowInTable, col, menuLevel);
    this.menuLevel = menuLevel;
    
    return this;
  }

  // Установка активности
  setActivity(activity) {
    this._validateTable();
    
    const col = tUsers.getCol(tUsers.columns.activity) + 1;
    this._updateCellValue(this.rowInTable, col, activity);
    this.activity = activity;
    
    return this;
  }

  // Установка роли
  setRole(role) {
    this._validateTable();
    
    const col = tUsers.getCol(tUsers.columns.role) + 1;
    this._updateCellValue(this.rowInTable, col, role);
    this.role = role;
    
    return this;
  }

  // Приватный метод для обновления значения ячейки
  _updateCellValue(row, col, value) {
    const range = tUsers.use().getRange(row, col);
    if (value) {
      range.setValue(value);
    } else {
      range.clear();
    }
  }

  // Приватный метод для проверки инициализации таблицы
  _validateTable() {
    if (!tUsers) {
      throw new Error('Таблица пользователей не установлена. Сначала вызовите setTable()');
    }
  }

  // Статический метод создания пользователя
  static create(rowInTable, telegramID, nick, name, currentAction = null, role = null, menuLevel = null, activity = null, properties = null, isNewUser = false) {
    return new User(rowInTable, telegramID, nick, name, currentAction, role, menuLevel, activity, properties, isNewUser);
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
