/**
 * =====================================================================
 * IAS PMD v4
 * HeaderService.gs
 * Build 002.1.0
 * =====================================================================
 * Створення та оформлення заголовків аркушів
 */

'use strict';

const HeaderService = (() => {

  /**
   * Встановити заголовки таблиці
   *
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
   * @param {string[]} headers
   */
  function set(sheet, headers) {

    if (!sheet) {
      throw new Error('Аркуш не передано.');
    }

    if (!headers || headers.length === 0) {
      throw new Error('Не задано список заголовків.');
    }

    sheet.getRange(1, 1, 1, headers.length)
      .setValues([headers]);

    FormatService.header(sheet, headers.length);

    FormatService.autoWidth(sheet);

  }

  /**
   * Заголовки журналу "Роботи"
   *
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
   */
  function works(sheet) {

    set(sheet, CONFIG.HEADER);

    FormatService.worksSheet(sheet);

  }

  /**
   * Одноколонковий службовий аркуш
   *
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
   * @param {string} title
   */
  function singleColumn(sheet, title) {

    set(sheet, [title]);

  }

  /**
   * Порожній службовий аркуш
   *
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
   */
  function empty(sheet) {

    sheet.clear();

    sheet.setFrozenRows(0);

  }

  /**
   * Ініціалізувати всі стандартні аркуші
   */
  function initialize() {

    works(
      SheetFactory.getOrCreate(CONFIG.SHEETS.WORKS)
    );

    singleColumn(
      SheetFactory.getOrCreate(CONFIG.SHEETS.DICTIONARIES),
      'Довідники'
    );

    singleColumn(
      SheetFactory.getOrCreate(CONFIG.SHEETS.STAFF),
      'Особовий склад'
    );

    singleColumn(
      SheetFactory.getOrCreate(CONFIG.SHEETS.TEAMS),
      'Піротехнічні розрахунки'
    );

    singleColumn(
      SheetFactory.getOrCreate(CONFIG.SHEETS.EXPLOSIVES),
      'Склад ВМ'
    );

    singleColumn(
      SheetFactory.getOrCreate(CONFIG.SHEETS.MOVEMENT),
      'Рух ВМ'
    );

    singleColumn(
      SheetFactory.getOrCreate(CONFIG.SHEETS.REPORTS),
      'Звітність'
    );

    singleColumn(
      SheetFactory.getOrCreate(CONFIG.SHEETS.DASHBOARD),
      'Dashboard'
    );

    singleColumn(
      SheetFactory.getOrCreate(CONFIG.SHEETS.AUDIT),
      'Журнал аудиту'
    );

    singleColumn(
      SheetFactory.getOrCreate(CONFIG.SHEETS.SETTINGS),
      'Налаштування'
    );

  }

  return {

    set,

    works,

    singleColumn,

    empty,

    initialize

  };

})();