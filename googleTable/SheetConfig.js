/**
 * Базовый класс для работы с таблицами
 */
class SheetConfig {
  constructor(config) {
    this.sheetName = config.sheetName;
    this.allRange = config.allRange || "A:Z";
    this.initStyle = config.initStyle || this._getDefaultStyle();
    this.columnsOrder = config.columnsOrder;
    this.columnsTitles = config.columnsTitles;
  }

  _getDefaultStyle() {
    return SpreadsheetApp.newTextStyle()
      .setBold(true)
      .build();
  }

  getColumnsOrder() {
    return this.columnsOrder;
  }

  getCol(columnTitle) {
    return this.columnsOrder.indexOf(columnTitle);
  }

  use() {
    let sheet = table.getSheetByName(this.sheetName);
    if (!sheet) {
      sheet = this._initializeSheet();
    }
    return sheet;
  }

  _initializeSheet() {
    const sheet = table.insertSheet(this.sheetName);
    const headers = [this.getColumnsOrder()];
    
    sheet.getRange(1, 1, 1, headers[0].length)
      .setValues(headers)
      .setTextStyle(this.initStyle)
      .setHorizontalAlignment("center");
    
    // Очистка лишних строк/столбцов
    sheet.deleteRows(3, 998); // Оставляем 2 строки
    sheet.deleteColumns(headers[0].length + 1, 26 - headers[0].length); // удаляем лишние столбцы
    
    return sheet;
  }
}

// Конфигурации таблиц
let tUsers = new SheetConfig({
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
});

let tLog = new SheetConfig({
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
});