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
 * Обробка POST запитів від клієнта
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
      district: data.district,
      community: data.community,
      locality: data.locality,
      address: data.address,
      workType: data.workType,
      category: data.category,
      area: parseFloat(data.area) || 0,
      found: parseInt(data.found) || 0,
      transferred: parseInt(data.transferred) || 0,
      destroyed: parseInt(data.destroyed) || 0,
      workAct: data.workAct || '',
      explosive: data.explosive || '',
      explosiveQty: parseFloat(data.explosiveQty) || 0,
      initiator: data.initiator || '',
      initiatorQty: parseInt(data.initiatorQty) || 0,
      writeOffAct: data.writeOffAct || '',
      team: data.team || '',
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
      district: row[3],
      community: row[4],
      locality: row[5],
      address: row[6],
      workType: row[7],
      category: row[8],
      area: row[9],
      found: row[10],
      transferred: row[11],
      destroyed: row[12],
      workAct: row[13],
      explosive: row[14],
      explosiveQty: row[15],
      initiator: row[16],
      initiatorQty: row[17],
      writeOffAct: row[18],
      team: row[19],
      leader: row[20],
      createdAt: row[21] instanceof Date ? Utilities.formatDate(row[21], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : row[21],
      updatedAt: row[22] instanceof Date ? Utilities.formatDate(row[22], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : row[22]

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
        district: work[3],
        community: work[4],
        locality: work[5],
        address: work[6],
        workType: work[7],
        category: work[8],
        area: work[9],
        found: work[10],
        transferred: work[11],
        destroyed: work[12],
        workAct: work[13],
        explosive: work[14],
        explosiveQty: work[15],
        initiator: work[16],
        initiatorQty: work[17],
        writeOffAct: work[18],
        team: work[19],
        leader: work[20],
        createdAt: work[21] instanceof Date ? Utilities.formatDate(work[21], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : work[21],
        updatedAt: work[22] instanceof Date ? Utilities.formatDate(work[22], Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss') : work[22]

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

      totalArea += Number(row[9]) || 0;
      totalFound += Number(row[10]) || 0;
      totalDestroyed += Number(row[12]) || 0;
      totalExplosive += Number(row[15]) || 0;
      totalInitiator += Number(row[17]) || 0;

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