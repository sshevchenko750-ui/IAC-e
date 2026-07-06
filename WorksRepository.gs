/**
 * =====================================================================
 * IAS PMD v4
 * WorksRepository.gs
 * Build : 002.2.0
 * =====================================================================
 * Робота з аркушем "Роботи"
 */

'use strict';

const WorksRepository = (() => {

  /**
   * Аркуш журналу
   */
  function sheet() {

    return SheetFactory.getOrCreate(
      CONFIG.SHEETS.WORKS
    );

  }

  /**
   * Останній рядок
   */
  function lastRow() {

    return sheet().getLastRow();

  }

  /**
   * Додати запис
   *
   * @param {Object} work
   * @returns {string}
   */
  function insert(work) {

    if (!work) {
      throw new Error('Дані роботи не передано.');
    }

    ValidationService.validateWork(work);

    const id = WorkIdService.next();

    const now = new Date();

    const row = [

      id,

      work.date,

      work.requestNumber,

      work.district,

      work.community,

      work.locality,

      work.address,

      work.workType,

      work.category,

      work.area,

      work.found,

      work.transferred,

      work.destroyed,

      work.workAct,

      work.explosive,

      work.explosiveQty,

      work.initiator,

      work.initiatorQty,

      work.writeOffAct,

      work.team,

      work.leader,

      now,

      now

    ];

    try {

      sheet().appendRow(row);

    } catch (error) {

      Logger.log('Помилка при додаванні запису: ' + error.message);
      throw new Error('Не вдалось додати запис: ' + error.message);

    }

    return id;

  }

  /**
   * Отримати запис за ID
   * Оптимізована версія - не завантажує весь лист в пам'ять
   *
   * @param {string} id
   * @returns {Array|null}
   */
  function findById(id) {

    if (!id) {
      throw new Error('ID не вказано.');
    }

    const sh = sheet();
    const lastRowNum = sh.getLastRow();

    if (lastRowNum < 2) {
      return null;
    }

    // Завантажуємо тільки колонку ID
    const ids = sh.getRange(2, 1, lastRowNum - 1, 1).getValues().flat();
    const index = ids.indexOf(id);

    if (index === -1) {
      return null;
    }

    // Завантажуємо тільки конкретний рядок
    return sh.getRange(index + 2, 1, 1, sh.getLastColumn()).getValues()[0];

  }

  /**
   * Усі записи
   *
   * @returns {Array}
   */
  function all() {

    const values = sheet()
      .getDataRange()
      .getValues();

    if (values.length <= 1) {
      return [];
    }

    return values.slice(1);

  }

  /**
   * Кількість записів
   *
   * @returns {number}
   */
  function count() {

    return Math.max(
      lastRow() - 1,
      0
    );

  }

  /**
   * Очистити журнал (видалити всі дані крім заголовків)
   */
  function clear() {

    const sh = sheet();

    if (sh.getLastRow() > 1) {

      sh.getRange(

        2,

        1,

        sh.getLastRow() - 1,

        sh.getLastColumn()

      ).clearContent();

    }

  }

  /**
   * Видалити запис за ID
   *
   * @param {string} id
   * @returns {boolean}
   */
  function deleteById(id) {

    if (!id) {
      throw new Error('ID не вказано.');
    }

    const sh = sheet();
    const lastRowNum = sh.getLastRow();

    if (lastRowNum < 2) {
      return false;
    }

    const ids = sh.getRange(2, 1, lastRowNum - 1, 1).getValues().flat();
    const index = ids.indexOf(id);

    if (index === -1) {
      return false;
    }

    try {

      sh.deleteRow(index + 2);
      return true;

    } catch (error) {

      Logger.log('Помилка при видаленні запису: ' + error.message);
      return false;

    }

  }

  return {

    insert,

    findById,

    all,

    count,

    clear,

    deleteById

  };

})();