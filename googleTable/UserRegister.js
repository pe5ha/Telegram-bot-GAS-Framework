// /**
//  * Функция регистрации новых пользователей в боте
//  * @param {Number} id - id искомого пользователя
//  * @returns false - если такой пользователь уже есть в базе, true - если не было в базе
//  */
//  function userRegister(id) {
//   // поиск юзера в списке уже существующих
//   if(tUsers.use() == null) { // если такого листа нет
//     table.insertSheet(tUsers.sheetName); // то такой лист создаётся
//     let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
//     tUsers.use().getRange(1,1,1,tUsers.getColumnsOrder().length).setValues([tUsers.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
//     tUsers.use().deleteRows(3,995);
//   }
//   usersData = tUsers.use().getRange(tUsers.allRange).getValues(); // массив всех значений id
//   let row = -1;
//   let i;
//   for (i = 0; i < usersData.length; i++) { // цикл от 0 до сколько всего юзеров
//     if (usersData[i].indexOf(parseInt(id)) !== -1) { // если запрашиваемый id найден
//       row = i + 1; // то row = номер юзера в массиве + 1, т.к. заголовки
//       break;
//     }
//   }

//   // добавление юзера
//   if (row === -1) { // если юзер с таким id не записан, то регистрируем его
//     user = makeUser(2,user_id,nick,name,null,null,null,null,true);
//     let userData = [[stringDate(),user.telegramID,user.nick,user.name,user.currentAction,user.role]]; // массив данных пользователя
//     // userData[0].push(surname); // фамилия
    
//     tUsers.use().insertRowBefore(2); // в лист юзеров вставляется новая строка сверху (после заголовков)
//     tUsers.use().getRange(2, 1, 1, userData[0].length).setValues(userData); // вставка инфы юзера
    
//     setUserStage(user,0);
//     return true;
//   }
//   else { //апдейт данных о пользователе, которые могли измениться
//     if (usersData[i][tUsers.getCol(tUsers.nick_Title)] !== nick) {
//       tUsers.use().getRange(row, tUsers.getCol(tUsers.nick_Title)+1).setValue(nick);
//     }
//     if (usersData[i][tUsers.getCol(tUsers.name_Title)] !== name) {
//       tUsers.use().getRange(row, tUsers.getCol(tUsers.name_Title)+1).setValue(name);
//     }
//     user = makeUser(
//       row,
//       user_id,
//       nick,
//       usersData[i][tUsers.getCol(tUsers.name_Title)],
//       usersData[i][tUsers.getCol(tUsers.current_action_Title)],
//       usersData[i][tUsers.getCol(tUsers.role_Title)],
//       usersData[i][tUsers.getCol(tUsers.activity_Title)],
//       usersData[i][tUsers.getCol(tUsers.email_Title)],
//     );
//     return false;
//   }
// }

/**
 * Класс для регистрации пользователей в системе
 */
class UserRegister {
  /**
   * @param {Object} tUsers - Объект таблицы пользователей
   * @param {Function} stringDate - Функция получения текущей даты в виде строки
   */
  constructor(tUsers, stringDate) {
    this.tUsers = tUsers;
    this.stringDate = stringDate;
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
    if (usersData[i][this.tUsers.getCol(this.tUsers.nick_Title)] !== nick) {
      this.tUsers.use()
        .getRange(row, this.tUsers.getCol(this.tUsers.nick_Title) + 1)
        .setValue(nick);
    }
    
    if (usersData[i][this.tUsers.getCol(this.tUsers.name_Title)] !== name) {
      this.tUsers.use()
        .getRange(row, this.tUsers.getCol(this.tUsers.name_Title) + 1)
        .setValue(name);
    }

    // Создаем и возвращаем объект пользователя
    user = User.create(
      row,
      id,
      nick,
      name,
      usersData[i][this.tUsers.getCol(this.tUsers.current_action_Title)],
      usersData[i][this.tUsers.getCol(this.tUsers.role_Title)],
      usersData[i][this.tUsers.getCol(this.tUsers.activity_Title)],
      usersData[i][this.tUsers.getCol(this.tUsers.email_Title)]
    ).setTable(this.tUsers);
  }
}