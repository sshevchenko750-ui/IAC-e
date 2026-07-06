/**
 * =====================================================================
 * IAS PMD v4
 * ValidationService.gs
 * Build 002.2.0
 * =====================================================================
 */

'use strict';

const ValidationService = (() => {

  /**
   * Обов'язкове поле
   *
   * @param {*} value
   * @param {string} fieldName
   * @returns {boolean}
   */
  function required(value, fieldName) {

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      throw new Error('Не заповнено поле "' + fieldName + '".');
    }

    return true;

  }

  /**
   * Число
   *
   * @param {*} value
   * @param {string} fieldName
   * @returns {boolean}
   */
  function isNumber(value, fieldName) {

    required(value, fieldName);

    if (isNaN(value)) {

      throw new Error(
        '"' + fieldName + '" повинно бути числом.'
      );

    }

    return true;

  }

  /**
   * Не негативне число (>= 0)
   *
   * @param {*} value
   * @param {string} fieldName
   * @returns {boolean}
   */
  function nonNegative(value, fieldName) {

    isNumber(value, fieldName);

    if (Number(value) < 0) {

      throw new Error(
        '"' + fieldName + '" не може бути менше нуля.'
      );

    }

    return true;

  }

  /**
   * Додатне число (> 0)
   * Використовувати тільки коли потрібна строга умова > 0
   *
   * @param {*} value
   * @param {string} fieldName
   * @returns {boolean}
   */
  function positive(value, fieldName) {

    isNumber(value, fieldName);

    if (Number(value) <= 0) {

      throw new Error(
        '"' + fieldName + '" повинно бути більше за нуль.'
      );

    }

    return true;

  }

  /**
   * Дата
   *
   * @param {*} value
   * @param {string} fieldName
   * @returns {boolean}
   */
  function date(value, fieldName) {

    required(value, fieldName);

    if (!(value instanceof Date)) {

      throw new Error(
        '"' + fieldName + '" повинно бути датою.'
      );

    }

    return true;

  }

  /**
   * Випадаючий список
   *
   * @param {*} value
   * @param {Array} list
   * @param {string} fieldName
   * @returns {boolean}
   */
  function inList(value, list, fieldName) {

    required(value, fieldName);

    if (!list.includes(value)) {

      throw new Error(
        '"' + fieldName + '" містить недопустиме значення.'
      );

    }

    return true;

  }

  /**
   * Не більше max символів
   *
   * @param {*} value
   * @param {number} max
   * @param {string} fieldName
   * @returns {boolean}
   */
  function maxLength(value, max, fieldName) {

    required(value, fieldName);

    if (String(value).length > max) {

      throw new Error(
        '"' + fieldName +
        '" перевищує ' +
        max +
        ' символів.'
      );

    }

    return true;

  }

  /**
   * Перевірка запису журналу Роботи
   *
   * @param {Object} data
   * @returns {boolean}
   */
  function validateWork(data) {

    if (!data) {
      throw new Error('Дані роботи не передано.');
    }

    required(data.date, 'Дата');

    required(data.requestNumber, 'Номер заявки');

    required(data.district, 'Район');

    required(data.community, 'Громада');

    required(data.locality, 'Населений пункт');

    required(data.workType, 'Вид робіт');

    // Площа може бути 0 (не робилась)
    nonNegative(data.area, 'Площа');

    // Виявлено/Знищено можуть бути 0
    nonNegative(data.found, 'Виявлено ВНП');

    nonNegative(data.destroyed, 'Знищено');

    return true;

  }

  return {

    required,

    isNumber,

    nonNegative,

    positive,

    date,

    inList,

    maxLength,

    validateWork

  };

})();