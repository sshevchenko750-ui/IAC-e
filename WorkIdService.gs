/**
 * =====================================================================
 * IAS PMD v4
 * WorkIdService.gs
 * ---------------------------------------------------------------------
 * Build : 002.2.0
 * =====================================================================
 * Генерація унікальних ID для журналу "Роботи"
 */

'use strict';

const WorkIdService = (() => {

  /**
   * Префікс ID
   * Приклад:
   * WRK-20260703-000001
   */
  const PREFIX = 'WRK';

  /**
   * Наступний ID
   */
  function next() {

    const sheet = SheetFactory.getOrCreate(
      CONFIG.SHEETS.SETTINGS
    );

    let counter = readCounter(sheet);

    counter++;

    writeCounter(sheet, counter);

    return build(counter);

  }

  /**
   * Побудова текстового ID
   */
  function build(counter) {

    const tz = Session.getScriptTimeZone();

    const date = Utilities.formatDate(
      new Date(),
      tz,
      'yyyyMMdd'
    );

    const number = String(counter).padStart(6, '0');

    return PREFIX + '-' + date + '-' + number;

  }

  /**
   * Зчитати лічильник
   */
  function readCounter(sheet) {
  const values = sheet.getDataRange().getValues();
  
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === 'WORK_COUNTER') {
      return Number(values[i][1]);
    }
  }

    sheet.appendRow(['WORK_COUNTER', 0]);
  return 0;
}

  /**
   * Записати лічильник
   */
  function writeCounter(sheet, value) {

    const values = sheet
      .getDataRange()
      .getValues();

    for (let i = 0; i < values.length; i++) {

      if (values[i][0] === 'WORK_COUNTER') {

        sheet
          .getRange(i + 1, 2)
          .setValue(value);

        return;

      }

    }

    sheet.appendRow([
      'WORK_COUNTER',
      value
    ]);

  }

  /**
   * Перевірка існування ID
   */
  function exists(id) {
  const sheet = SheetFactory.get(CONFIG.SHEETS.WORKS);
  if (!sheet) return false;
  
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
  return ids.includes(id);
}
  return {

    next,

    exists

  };

})();