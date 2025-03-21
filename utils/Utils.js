
function stringDate(timestamp=null){
  if(timestamp) return Utilities.formatDate(new Date(timestamp), "GMT+3", "dd.MM.yyyy HH:mm:ss");
  else return Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy HH:mm:ss");
}

/**
 * Поиск первой пустой строки в диапазоне (по первому столбцу в диапазоне)
 * @param {*} range 
 * @returns 
 */
function getFirstEmptyRow(range){
  let data = range.getValues();
  for(let i=0;i<data.length;i++){
    if(data[i][0]==="") return i+1;
  }
  return -1;
}

function findRowIn2dRange(array,column,value){
  for (let i = 0; i < array.length; i++) { 
    if (array[i][column] == value) {
      return i;
    }
  }
  return -1;
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}