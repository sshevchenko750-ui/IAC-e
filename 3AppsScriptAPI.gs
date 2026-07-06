/**
 * =====================================================================
 * IAS PMD v4
 * AppsScriptAPI.gs
 * Build 002.3.0
 * =====================================================================
 * API для веб-застосунку
 * Обробка запитів від HTML форми
 */

'use strict';

/**
 * Відправка HTML-сторінки при відкритті посилання
 */
function doGet() {

  const html = HtmlService.createHtmlOutputFromFile('index.html');

  return html;

}

/**
 * Єдина точка входу для викликів з клієнта через google.script.run
 * (використовується замість fetch/ScriptApp на стороні HTML, бо
 * ScriptApp недоступний у браузері)
 *
 * @param {string} action - назва дії
 * @param {Object} data - дані запиту
 * @returns {Object} відповідь
 */
function apiRequest(action, data) {

  try {

    let response;

    switch (action) {

      case 'addWork':
        response = handleAddWork(data);
        break;

      case 'getWorks':
        response = handleGetWorks();
        break;

      case 'getWork':
        response = handleGetWork(data.id);
        break;

      case 'updateWork':
        response = handleUpdateWork(data);
        break;

      case 'deleteWork':
        response = handleDeleteWork(data.id);
        break;

      case 'exportExcel':
        response = handleExportExcel(data);
        break;

      case 'getStats':
        response = handleGetStats();
        break;

      default:
        response = { success: false, message: 'Невідома дія' };

    }

    return response;

  } catch (error) {

    Logger.log('Помилка у apiRequest: ' + error.message);

    return {
      success: false,
      message: error.message
    };

  }

}

/**
 * Обробка POST запитів від клієнта (залишено для сумісності,
 * якщо застосунок викликатиметься як зовнішній Web App через HTTP)
 *
 * @param {Object} e - параметри запиту
 * @returns {Object} JSON відповідь
 */
function doPost(e) {

  try {

    const action = e.parameter.action;
    const data = JSON.parse(e.postData.contents);

    let response;

    switch (action) {

      case 'addWork':
        response = handleAddWork(data);
        break;

      case 'getWorks':
        response = handleGetWorks();
        break;

      case 'getWork':
        response = handleGetWork(data.id);
        break;

      case 'updateWork':
        response = handleUpdateWork(data);
        break;

      case 'deleteWork':
        response = handleDeleteWork(data.id);
        break;

      case 'exportExcel':
        response = handleExportExcel(data);
        break;

      case 'getStats':
        response = handleGetStats();
        break;

      default:
        response = { success: false, message: 'Невідома дія' };

    }

    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    Logger.log('Помилка у doPost: ' + error.message);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);

  }

}

/**
 * Обробка додавання нової роботи
 */
function handleAddWork(data) {

  try {

    // Конвертуємо дату
    const dateValue = new Date(data.date);

    const work = {
      date: dateValue,
      requestNumber: data.requestNumber,
      region: data.region,
      locality: data.locality,
      address: data.address,
      category: data.category,
      workType: data.workType,
      area: parseFloat(data.area) || 0,
      found: parseInt(data.found) || 0,
      transferred: parseInt(data.transferred) || 0,
      destroyed: parseInt(data.destroyed) || 0,
      ammunitionType: data.ammunitionType || '',
      explosive: data.explosive || '',
      explosiveQty: parseFloat(data.explosiveQty) || 0,
      initiator: data.initiator || '',
      initiatorQty: parseInt(data.initiatorQty) || 0,
      wire: data.wire || '',
      wireQty: parseInt(data.wireQty) || 0,
      workAct: data.workAct || '',
      writeOffAct: data.writeOffAct || '',
      leader: data.leader
    };

    const id = WorksRepository.insert(work);

    return {
      success: true,
      message: 'Запис створено успішно',
      id: id
    };

  } catch (error) {

    Logger.log('Помилка при додаванні: ' + error.message);

    return {
      success: false,
      message: error.message
    };

  }

}

/**
 * Обробка отримання всіх робіт
 */
function handleGetWorks() {

  try {

    const works = WorksRepository.all();

    const formatted = works.map((row) => ({

      id: row[0],
      date: row[1] instanceof Date ? Utilities.formatDate(row[1], Session.getScriptTimeZone(), 'yyyy-MM-dd') : row[1],
      requestNumber: row[2],
      region: row[3],
      locality: row[4],
      address: row[5],
      category: row[6],
      workType: row[7],
      area: row[8],
      found: row[9],
      transferred: row[10],
      destroyed: row[11],
      ammunitionType: row[12],
      explosive: row[13],
      explosiveQty: row[14],
      initiator: row[15],
      initiatorQty: row[16],
      wire: row[17],
      wireQty: row[18],
      workAct: row[19],
      writeOffAct: row[20],
      leader: row[21],
      createdAt: row[22] instanceof Date ? Utilities.formatDate(row[22], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : row[22],
      updatedAt: row[23] instanceof Date ? Utilities.formatDate(row[23], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : row[23]

    }));

    return {
      success: true,
      data: formatted,
      count: formatted.length
    };

  } catch (error) {

    Logger.log('Помилка при отриманні: ' + error.message);

    return {
      success: false,
      message: error.message,
      data: []
    };

  }

}

/**
 * Обробка отримання однієї роботи за ID
 */
function handleGetWork(id) {

  try {

    const work = WorksRepository.findById(id);

    if (!work) {
      return {
        success: false,
        message: 'Запис не знайдено'
      };
    }

    return {
      success: true,
      data: {

        id: work[0],
        date: work[1] instanceof Date ? Utilities.formatDate(work[1], Session.getScriptTimeZone(), 'yyyy-MM-dd') : work[1],
        requestNumber: work[2],
        region: work[3],
        locality: work[4],
        address: work[5],
        category: work[6],
        workType: work[7],
        area: work[8],
        found: work[9],
        transferred: work[10],
        destroyed: work[11],
        ammunitionType: work[12],
        explosive: work[13],
        explosiveQty: work[14],
        initiator: work[15],
        initiatorQty: work[16],
        wire: work[17],
        wireQty: work[18],
        workAct: work[19],
        writeOffAct: work[20],
        leader: work[21],
        createdAt: work[22] instanceof Date ? Utilities.formatDate(work[22], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : work[22],
        updatedAt: work[23] instanceof Date ? Utilities.formatDate(work[23], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : work[23]

      }
    };

  } catch (error) {

    Logger.log('Помилка при отриманні роботи: ' + error.message);

    return {
      success: false,
      message: error.message
    };

  }

}

/**
 * Обробка оновлення роботи
 */
function handleUpdateWork(data) {

  try {

    const work = WorksRepository.findById(data.id);

    if (!work) {
      return {
        success: false,
        message: 'Запис не знайдено'
      };
    }

    return {
      success: false,
      message: 'Функція редагування буде реалізована у Build 002.4.0'
    };

  } catch (error) {

    Logger.log('Помилка при оновленні: ' + error.message);

    return {
      success: false,
      message: error.message
    };

  }

}

/**
 * Обробка видалення роботи
 */
function handleDeleteWork(id) {

  try {

    const deleted = WorksRepository.deleteById(id);

    if (!deleted) {
      return {
        success: false,
        message: 'Не вдалось видалити запис'
      };
    }

    return {
      success: true,
      message: 'Запис видалено'
    };

  } catch (error) {

    Logger.log('Помилка при видаленні: ' + error.message);

    return {
      success: false,
      message: error.message
    };

  }

}

/**
 * Обробка експорту в Excel
 */
function handleExportExcel(data) {

  try {

    const url = WorksExport.exportToExcel(data);

    return {
      success: true,
      message: 'Файл готовий до завантаження',
      url: url
    };

  } catch (error) {

    Logger.log('Помилка при експорті: ' + error.message);

    return {
      success: false,
      message: error.message
    };

  }

}

/**
 * Обробка отримання статистики
 */
function handleGetStats() {

  try {

    const count = WorksRepository.count();

    const works = WorksRepository.all();

    let totalArea = 0;
    let totalFound = 0;
    let totalDestroyed = 0;
    let totalExplosive = 0;
    let totalInitiator = 0;

    works.forEach(row => {

      totalArea += Number(row[8]) || 0;
      totalFound += Number(row[9]) || 0;
      totalDestroyed += Number(row[11]) || 0;
      totalExplosive += Number(row[14]) || 0;
      totalInitiator += Number(row[16]) || 0;

    });

    return {
      success: true,
      data: {

        totalWorks: count,
        totalArea: totalArea.toFixed(2),
        totalFound: totalFound,
        totalDestroyed: totalDestroyed,
        totalExplosive: totalExplosive,
        totalInitiator: totalInitiator

      }
    };

  } catch (error) {

    Logger.log('Помилка при отриманні статистики: ' + error.message);

    return {
      success: false,
      message: error.message,
      data: {}
    };

  }

}