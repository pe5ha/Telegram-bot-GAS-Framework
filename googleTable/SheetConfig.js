
// Нерабочее решение с классом констурктором созданием нового объекта 
// (так-то рабочее, но автокомплит в други местах кода не работает без кучи аннотаций)
// /**
//  * @typedef {Object} SheetConfigSpec
//  * @property {string} sheetName - Название листа
//  * @property {string} [allRange="A:Z"] - Диапазон данных (по умолчанию "A:Z")
//  * @property {GoogleAppsScript.Spreadsheet.TextStyle} [initStyle] - Стиль заголовков
//  * @property {string[]} columnsOrder - Порядок столбцов
//  * @property {Object.<string, string>} columns - Объект с описанием столбцов
//  */

// /**
//  * Базовый класс для конфигурации листов таблицы
//  * @class
//  */
// class SheetConfig {
//   /**
//    * Создает экземпляр SheetConfig
//    * @param {SheetConfigSpec} config - Конфигурация листа
//    */
//   constructor(config) {
//     this.sheetName = config.sheetName;
//     this.allRange = config.allRange || "A:Z";
//     this.initStyle = config.initStyle || this._getDefaultStyle();
//     this.columnsOrder = config.columnsOrder;
//     this.columns = config.columns;
//   }

//   _getDefaultStyle() {
//     return SpreadsheetApp.newTextStyle()
//       .setBold(true)
//       .build();
//   }

//   getColumnsOrder() {
//     return this.columnsOrder;
//   }

//   getCol(columnTitle) {
//     return this.columnsOrder.indexOf(columnTitle);
//   }

//   getAllRangeValues(){
//     return this.use().getRange(this.allRange).getValues();
//   }

//   use() {
//     let sheet = TABLE.getSheetByName(this.sheetName);
//     if (!sheet) {
//       sheet = this._initializeSheet();
//     }
//     return sheet;
//   }

//   _initializeSheet() {
//     const sheet = TABLE.insertSheet(this.sheetName);
//     const headers = [this.getColumnsOrder()];
    
//     sheet.getRange(1, 1, 1, headers[0].length)
//       .setValues(headers)
//       .setTextStyle(this.initStyle)
//       .setHorizontalAlignment("center");
    
//     // Очистка лишних строк/столбцов
//     sheet.deleteRows(3, 998); // Оставляем 2 строки
//     sheet.deleteColumns(headers[0].length + 1, 26 - headers[0].length); // удаляем лишние столбцы
    
//     return sheet;
//   }
// }

// /**
//  * @typedef {Object} tUsersColumnsSpec
//  * @property {string} regDate - Дата регистрации
//  * @property {number} id - Телеграм ID
//  * @property {string} nick - Никнейм
//  * @property {string} name - Имя
//  * @property {string} currentAction - Текущее действие
//  * @property {string} role - Роль
//  * @property {string} activity - Активность
//  * @property {string} properties - Свойства
//  */
// /**
//  * Расширенная конфигурация для листа пользователей
//  * @typedef {SheetConfig & {
//  *   columns: tUsersColumnsSpec,
//  * }} tUsersSpec
//  */
// /** @type {tUsersSpec} */
// let tUsers = new SheetConfig({
//   sheetName: "Users",
//   columns: {
//     regDate: "Дата рег.",
//     id: "Телеграм ID",
//     nick: "Ник",
//     name: "Имя",
//     currentAction: "Действие",
//     role: "Роль",
//     activity: "Активность",
//     properties: "Свойства"
//   },
//   columnsOrder: ["Дата рег.","Телеграм ID","Ник","Имя","Действие","Роль","Активность","Свойства"],
//   allRange: "A:H"
// });

// let tLog = new SheetConfig({
//   sheetName: "Log",
//   columns: {
//     time: "Время",
//     id: "Телеграм ID",
//     nick: "Ник",
//     name: "Имя",
//     messageId: "Message ID",
//     action: "Действие",
//     sentData: "Что прислал",
//     botAnswer: "Ответ бота"
//   },
//   columnsOrder: ["Время","Телеграм ID","Ник","Имя","Message ID","Действие","Что прислал","Ответ бота"]
// });

// let tBotCommands = new SheetConfig({
//   sheetName: "BotCommands",
//   columns: {
//     command_Title: "Команда",
//     link_Title: "Ссылка на сообщение",
//     preview_Title: "Предпросмотр",
//   },
//   columnsOrder: ["Команда","Ссылка на сообщение","Предпросмотр"],
//   allRange: "A:B"
// });


// =============== рабочий код ↓

const TableMethods = {
  getColumnsOrder() {
    return this.columnsOrder;
  },

  getCol(columnTitle) {
    return this.columnsOrder.indexOf(columnTitle);
  },

  getAllRangeValues() {
    return this.use().getRange(this.allRange).getValues();
  },

  use() {
    let sheet = TABLE.getSheetByName(this.sheetName);
    if (!sheet) {
      sheet = this._initializeSheet();
    }
    return sheet;
  },

  _initializeSheet() {
    const sheet = TABLE.insertSheet(this.sheetName);
    const headers = [this.getColumnsOrder()];
    
    sheet.getRange(1, 1, 1, headers[0].length)
      .setValues(headers)
      .setTextStyle(this._getDefaultStyle?.() || SpreadsheetApp.newTextStyle().setBold(true).build())
      .setHorizontalAlignment("center");
    
    sheet.deleteRows(3, 998);
    sheet.deleteColumns(headers[0].length + 1, 26 - headers[0].length);
    
    return sheet;
  }
};

const tUsers = Object.assign({
  sheetName: "Users",
  columns: {
    regDate: "Дата рег.",
    id: "Телеграм ID",
    nick: "Ник",
    name: "Имя",
    currentAction: "Действие",
    role: "Роль",
    activity: "Активность",
    properties: "Свойства"
  },
  columnsOrder: ["Дата рег.","Телеграм ID","Ник","Имя","Действие","Роль","Активность","Свойства"],
  allRange: "A:H"
}, TableMethods);

let tLog = Object.assign({
  sheetName: "Log",
  columns: {
    time: "Время",
    id: "Телеграм ID",
    nick: "Ник",
    name: "Имя",
    messageId: "Message ID",
    action: "Действие",
    sentData: "Что прислал",
    botAnswer: "Ответ бота"
  },
  columnsOrder: ["Время","Телеграм ID","Ник","Имя","Message ID","Действие","Что прислал","Ответ бота"]
  }, TableMethods);

let tBotCommands =  Object.assign({
  sheetName: "BotCommands",
  columns: {
    command_Title: "Команда",
    link_Title: "Ссылка на сообщение",
    preview_Title: "Предпросмотр",
  },
  columnsOrder: ["Команда","Ссылка на сообщение","Предпросмотр"],
  allRange: "A:B"
  }, TableMethods);