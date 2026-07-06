/**
 * =====================================================================
 * IAS PMD v4
 * WorksExport.gs
 * Build 002.3.0
 * =====================================================================
 * Експорт даних в Excel
 */

'use strict';

const WorksExport = (() => {

  /**
   * Експорт всіх робіт в Excel
   *
   * @param {Object} params - параметри експорту
   * @returns {string} - посилання на файл
   */
  function exportToExcel(params = {}) {

    const works = WorksModule.getAllWorks();

    if (works.length === 0) {
      throw new Error('Немає даних для експорту');
    }

    const ss = SpreadsheetApp.getActive();

    // Створення тимчасового аркуша
    const tempSheet = ss.insertSheet('Export_' + Date.now());

    try {

      // Додавання заголовків
      const headers = CONFIG.HEADER;
      tempSheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Форматування заголовків
      tempSheet.getRange(1, 1, 1, headers.length)
        .setBackground(CONFIG.COLORS.HEADER)
        .setFontColor('#FFFFFF')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');

      // Додавання даних
      if (works.length > 0) {

        tempSheet.getRange(2, 1, works.length, works[0].length)
          .setValues(works);

      }

      // Автоматична ширина колонок
      tempSheet.autoResizeColumns(1, headers.length);

      // Форматування дат
      const dateColumn = 2; // Дата в другій колонці
      tempSheet.getRange(2, dateColumn, works.length, 1)
        .setNumberFormat('dd.MM.yyyy');

      // Форматування чисел
      const numberColumns = [10, 16, 18]; // Площа, ВМ, ЗІ
      numberColumns.forEach(col => {
        tempSheet.getRange(2, col, works.length, 1)
          .setNumberFormat('#,##0.00');
      });

      // Генерування посилання для завантаження
      const fileId = ss.getId();
      const downloadUrl = 'https://docs.google.com/spreadsheets/d/' + fileId + '/export?format=xlsx';

      Logger.log('Експорт завершено. URL: ' + downloadUrl);

      // Видалення тимчасового аркуша після успішного експорту
      setTimeout(() => {
        ss.deleteSheet(tempSheet);
      }, 5000);

      return downloadUrl;

    } catch (error) {

      Logger.log('Помилка при експорті: ' + error.message);
      ss.deleteSheet(tempSheet);
      throw error;

    }

  }

  /**
   * Експорт відфільтрованих даних
   *
   * @param {Object} filters - фільтри (район, дата, тип роботи)
   * @returns {string} - посилання на файл
   */
  function exportFiltered(filters = {}) {

    let works = WorksModule.getAllWorks();

    // Фільтрація за районом
    if (filters.district) {
      works = works.filter(row => row[3] === filters.district);
    }

    // Фільтрація за датою
    if (filters.dateFrom && filters.dateTo) {

      works = works.filter(row => {

        const rowDate = new Date(row[1]);
        const from = new Date(filters.dateFrom);
        const to = new Date(filters.dateTo);

        return rowDate >= from && rowDate <= to;

      });

    }

    // Фільтрація за типом робіт
    if (filters.workType) {
      works = works.filter(row => row[7] === filters.workType);
    }

    if (works.length === 0) {
      throw new Error('Немає даних, що відповідають критеріям фільтру');
    }

    return exportToExcel({ filtered: works });

  }

  /**
   * Генерування статистичного звіту
   *
   * @returns {Object} - дані звіту
   */
  function generateReport() {

    const works = WorksModule.getAllWorks();

    const report = {

      period: {
        from: new Date(),
        to: new Date()
      },

      summary: {
        totalWorks: works.length,
        totalArea: 0,
        totalFound: 0,
        totalDestroyed: 0,
        totalExplosive: 0,
        totalInitiator: 0
      },

      byDistrict: {},

      byWorkType: {},

      timeline: []

    };

    works.forEach(row => {

      const date = row[1];
      const district = row[3];
      const workType = row[7];

      // Сумування
      report.summary.totalArea += Number(row[9]) || 0;
      report.summary.totalFound += Number(row[10]) || 0;
      report.summary.totalDestroyed += Number(row[12]) || 0;
      report.summary.totalExplosive += Number(row[15]) || 0;
      report.summary.totalInitiator += Number(row[17]) || 0;

      // Розподіл за районами
      if (!report.byDistrict[district]) {

        report.byDistrict[district] = {

          count: 0,
          area: 0,
          destroyed: 0

        };

      }

      report.byDistrict[district].count++;
      report.byDistrict[district].area += Number(row[9]) || 0;
      report.byDistrict[district].destroyed += Number(row[12]) || 0;

      // Розподіл за типами робіт
      if (!report.byWorkType[workType]) {

        report.byWorkType[workType] = {

          count: 0,
          found: 0,
          destroyed: 0

        };

      }

      report.byWorkType[workType].count++;
      report.byWorkType[workType].found += Number(row[10]) || 0;
      report.byWorkType[workType].destroyed += Number(row[12]) || 0;

    });

    return report;

  }

  return {

    exportToExcel,
    exportFiltered,
    generateReport

  };

})();