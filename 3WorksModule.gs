/**
 * =====================================================================
 * IAS PMD v4
 * WorksModule.gs
 * ---------------------------------------------------------------------
 * Build : 002.2.0
 * =====================================================================
 * Бізнес-логіка журналу "Роботи"
 */

'use strict';

const WorksModule = (() => {

  /**
   * Створення нового запису
   *
   * @param {Object} work
   * @returns {string} ID нового запису
   */
  function createWork(work) {

    if (!work) {
      throw new Error('Не передано дані роботи.');
    }

    normalize(work);

    return WorksRepository.insert(work);

  }

  /**
   * Отримати запис
   *
   * @param {string} id
   * @returns {*}
   */
  function getWork(id) {

    if (!id) {
      throw new Error('Не вказано ID.');
    }

    return WorksRepository.findById(id);

  }

  /**
   * Всі записи
   *
   * @returns {Array}
   */
  function getAllWorks() {

    return WorksRepository.all();

  }

  /**
   * Кількість записів
   *
   * @returns {number}
   */
  function countWorks() {

    return WorksRepository.count();

  }

  /**
   * Очистити журнал
   */
  function clearWorks() {

    WorksRepository.clear();

  }

  /**
   * Нормалізація даних
   */
  function normalize(work) {

    work.date = work.date || new Date();

    work.requestNumber = work.requestNumber || '';

    work.region = work.region || '';

    work.locality = work.locality || '';

    work.address = work.address || '';

    work.category = work.category || '';

    work.workType = work.workType || '';

    work.area = Number(work.area || 0);

    work.found = Number(work.found || 0);

    work.transferred = Number(work.transferred || 0);

    work.destroyed = Number(work.destroyed || 0);

    work.ammunitionType = work.ammunitionType || '';

    work.explosive = work.explosive || '';

    work.explosiveQty = Number(work.explosiveQty || 0);

    work.initiator = work.initiator || '';

    work.initiatorQty = Number(work.initiatorQty || 0);

    work.wire = work.wire || '';

    work.wireQty = Number(work.wireQty || 0);

    work.workAct = work.workAct || '';

    work.writeOffAct = work.writeOffAct || '';

    work.leader = work.leader || '';

  }

  /**
   * Тестове створення запису
   * Використовується для перевірки системи
   */
  function createTestWork() {

    const id = createWork({

      date: new Date(),

      requestNumber: 'TEST-001',

      region: 'Полтавська',

      locality: 'Полтава',

      address: 'Тестова адреса',

      category: 'Відкрита територія',

      workType: 'Технічне обстеження',

      area: 1,

      found: 0,

      transferred: 0,

      destroyed: 0,

      ammunitionType: '',

      explosive: '',

      explosiveQty: 0,

      initiator: '',

      initiatorQty: 0,

      wire: '',

      wireQty: 0,

      workAct: '',

      writeOffAct: '',

      leader: 'Тестовий користувач'

    });

    SpreadsheetApp.getUi().alert(

      CONFIG.SYSTEM.SHORT_NAME,

      'Тестовий запис створено.\n\nID: ' + id,

      SpreadsheetApp.getUi().ButtonSet.OK

    );

  }

  return {

    createWork,

    getWork,

    getAllWorks,

    countWorks,

    clearWorks,

    createTestWork

  };

})();