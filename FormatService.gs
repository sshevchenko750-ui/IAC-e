/**
 * =====================================================================
 * IAS PMD v4
 * FormatService.gs
 * Build 002.2.0
 * =====================================================================
 * Форматування аркушів
 */

'use strict';

const FormatService = (() => {

  /**
   * Оформлення заголовка таблиці
   */
  function header(sheet, columns) {

    if (!sheet) {
      throw new Error('Аркуш не передано в header()');
    }

    if (columns <= 0) return;

    sheet.getRange(1, 1, 1, columns)
      .setBackground(CONFIG.COLORS.HEADER)
      .setFontColor('#FFFFFF')
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle')
      .setWrap(true);

    sheet.setFrozenRows(1);

  }

  /**
   * Автоматична ширина стовпців
   */
  function autoWidth(sheet) {

    if (!sheet) {
      throw new Error('Аркуш не передано в autoWidth()');
    }

    const cols = sheet.getLastColumn();

    if (cols > 0) {
      sheet.autoResizeColumns(1, cols);
    }

  }

  /**
   * Формат стовпця з датою
   */
  function dateColumn(sheet, column) {

    if (!sheet) {
      throw new Error('Аркуш не передано в dateColumn()');
    }

    const rows = Math.max(sheet.getMaxRows() - 1, 1);

    sheet.getRange(2, column, rows)
      .setNumberFormat('dd.MM.yyyy');

  }

  /**
   * Формат числового стовпця
   */
  function numberColumn(sheet, column, decimals = 0) {

    if (!sheet) {
      throw new Error('Аркуш не передано в numberColumn()');
    }

    const rows = Math.max(sheet.getMaxRows() - 1, 1);

    let format = '#,##0';

    if (decimals > 0) {
      format += '.' + '0'.repeat(decimals);
    }

    sheet.getRange(2, column, rows)
      .setNumberFormat(format);

  }

  /**
   * Центрування стовпця
   */
  function centerColumn(sheet, column) {

    if (!sheet) {
      throw new Error('Аркуш не передано в centerColumn()');
    }

    const rows = Math.max(sheet.getMaxRows() - 1, 1);

    sheet.getRange(2, column, rows)
      .setHorizontalAlignment('center');

  }

  /**
   * Підсвічування порожніх обов'язкових полів
   */
  function requiredColumn(sheet, column) {

    if (!sheet) {
      throw new Error('Аркуш не передано в requiredColumn()');
    }

    const rows = Math.max(sheet.getMaxRows() - 1, 1);

    const range = sheet.getRange(2, column, rows);

    const rule = SpreadsheetApp.newConditionalFormatRule()
      .whenCellEmpty()
      .setBackground('#FDECEC')
      .setRanges([range])
      .build();

    const rules = sheet.getConditionalFormatRules();
    rules.push(rule);
    sheet.setConditionalFormatRules(rules);

  }

  /**
   * Застосувати базове оформлення журналу "Роботи"
   */
  function worksSheet(sheet) {

    if (!sheet) {
      throw new Error('Аркуш не передано в worksSheet()');
    }

    header(sheet, CONFIG.HEADER.length);

    autoWidth(sheet);

    // Дата
    dateColumn(sheet, 2);

    // Площа
    numberColumn(sheet, 10, 2);

    // Кількість ВМ
    numberColumn(sheet, 16);

    // Кількість ЗІ
    numberColumn(sheet, 18);

    // Центрування
    centerColumn(sheet, 2);
    centerColumn(sheet, 10);
    centerColumn(sheet, 11);
    centerColumn(sheet, 12);
    centerColumn(sheet, 13);
    centerColumn(sheet, 16);
    centerColumn(sheet, 18);

  }

  return {

    header,
    autoWidth,
    dateColumn,
    numberColumn,
    centerColumn,
    requiredColumn,
    worksSheet

  };

})();