/**
 * =====================================================================
 * IAS PMD v4
 * SheetFactory.gs
 * Build 002.1.0
 * =====================================================================
 * Створення та отримання аркушів
 */

'use strict';

const SheetFactory = (() => {

  /**
   * Активна книга
   * @returns {GoogleAppsScript.Spreadsheet.Spreadsheet}
   */
  function spreadsheet() {
    return SpreadsheetApp.getActiveSpreadsheet();
  }

  /**
   * Повернути аркуш
   * @param {string} name
   * @returns {GoogleAppsScript.Spreadsheet.Sheet|null}
   */
  function get(name) {
    return spreadsheet().getSheetByName(name);
  }

  /**
   * Чи існує аркуш
   * @param {string} name
   * @returns {boolean}
   */
  function exists(name) {
    return get(name) !== null;
  }

  /**
   * Створити аркуш
   * @param {string} name
   * @returns {GoogleAppsScript.Spreadsheet.Sheet}
   */
  function create(name) {

    let sheet = get(name);

    if (sheet) {
      return sheet;
    }

    sheet = spreadsheet().insertSheet(name);

    Logger.log('Створено аркуш: ' + name);

    return sheet;

  }

  /**
   * Повернути існуючий або створити новий
   * @param {string} name
   * @returns {GoogleAppsScript.Spreadsheet.Sheet}
   */
  function getOrCreate(name) {

    return exists(name)
      ? get(name)
      : create(name);

  }

  /**
   * Видалити аркуш
   * @param {string} name
   */
  function remove(name) {

    const sheet = get(name);

    if (sheet) {
      spreadsheet().deleteSheet(sheet);
    }

  }

  /**
   * Повернути список аркушів
   * @returns {string[]}
   */
  function list() {

    return spreadsheet()
      .getSheets()
      .map(sheet => sheet.getName());

  }

  /**
   * Створити всі службові аркуші
   */
  function createSystemSheets() {

    Object.keys(CONFIG.SHEETS).forEach(key => {
      getOrCreate(CONFIG.SHEETS[key]);
    });

  }

  return {

    spreadsheet,

    get,

    exists,

    create,

    getOrCreate,

    remove,

    list,

    createSystemSheets

  };

})();