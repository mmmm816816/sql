function doGet() {
  var sql = getAgent();
  return ContentService.createTextOutput(sql)
    .setMimeType(ContentService.MimeType.TEXT)
    .downloadAsFile('insert.sql');
}

function getAgent() {
  const ss = SpreadsheetApp.openById('xxx');
  const sheet = ss.getSheetByName('Sheet1');
  const range = sheet.getDataRange();
  const values = range.getValues();
  const uniqColValues = [...new Set(values.map(x=>{return x[0]}))];
  // Logger.log(uniqColValues); // [Agent, AAA, BBB, CCC, DDD]
  // Logger.log(JSON.stringify(uniqColValues)); // ["Agent","AAA","BBB","CCC","DDD"]
  // Logger.log(typeof uniqColValues); // object
  uniqColValues.splice(0, 1);
  // uniqColValues = uniqColValues.splice(1); // x
  // uniqColValues = uniqColValues.slice(1); // x

  // for (let i = 0; i < values.length; i++) {
  //   for (let j = 0; j < values[i].length; j++) {
  //     Logger.log(values[i][j]);
  //   }
  // }

  let sql = 'INSERT INTO uriden VALUES '
  for (let i = 0; i < uniqColValues.length; i++) {
    sql += '(\'' + uniqColValues[i] + '\'),';
  }
  sql = sql.slice(0,-1) + ';';
  return sql;
}

/* values in column1 */
// arr.map(x=>{return x[1]})

/* unique values */
// [...new Set(arr)];