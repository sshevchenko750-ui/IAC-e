/**
 * =====================================================================
 * IAS PMD v4
 * Bootstrap.gs
 * Build 002.1.0
 * =====================================================================
 * Точка входу системи.
 */

'use strict';

/**
 * Запуск ініціалізації системи
 */
function bootstrap() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  Logger.log('=== IAS PMD Bootstrap ===');
  Logger.log('Spreadsheet: ' + ss.getName());

  if (typeof initializeSystem !== 'function') {
    throw new Error(
      'Функцію initializeSystem() не знайдено.\nПеревірте App.gs'
    );
  }

  initializeSystem();

}

/**
 * Перевірка існування аркуша
 * @param {string} sheetName
 * @returns {boolean}
 */
function sheetExists(sheetName) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  return ss.getSheetByName(sheetName) !== null;

}

/**
 * Отримати аркуш або створити його
 *
 * @param {string} sheetName
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getOrCreateSheet(sheetName) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {

    sheet = ss.insertSheet(sheetName);

    Logger.log('Створено аркуш: ' + sheetName);

  }

  return sheet;

}

/**
 * Видалити всі порожні рядки
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 */
function removeEmptyRows(sheet) {

  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return;

  const values = sheet.getRange(2,1,lastRow-1,sheet.getLastColumn()).getValues();

  for (let i = values.length - 1; i >= 0; i--) {

    const row = values[i];

    const empty = row.every(v => v === '');

    if (empty) {

      sheet.deleteRow(i + 2);

    }

  }

}

/**
 * Повертає поточну дату у форматі yyyy-MM-dd
 *
 * @returns {string}
 */
function today() {

  return Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyy-MM-dd'
  );

}

/**
 * Поточний timestamp
 *
 * @returns {string}
 */
function now() {

  return Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyy-MM-dd HH:mm:ss'
  );

}