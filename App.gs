/**
 * =====================================================================
 * IAS PMD v4
 * App.gs
 * ---------------------------------------------------------------------
 * Build : 002.2.0
 * =====================================================================
 */

'use strict';

/**
 * Ініціалізація системи
 */
function initializeSystem() {

  const ui = SpreadsheetApp.getUi();

  try {

    SpreadsheetApp.getActive().toast(
      'Початок ініціалізації...',
      CONFIG.SYSTEM.SHORT_NAME,
      3
    );

    // Створення службових аркушів
    SheetFactory.createSystemSheets();

    // Заповнення заголовків
    HeaderService.initialize();

    // Оновлення службової інформації
    initializeSettings();

    SpreadsheetApp.flush();

    SpreadsheetApp.getActive().toast(
      'Ініціалізацію завершено.',
      CONFIG.SYSTEM.SHORT_NAME,
      3
    );

    ui.alert(
      CONFIG.SYSTEM.SHORT_NAME,
      'Система успішно ініціалізована.',
      ui.ButtonSet.OK
    );

  } catch (error) {

    Logger.log(error);

    ui.alert(
      'Помилка',
      error.message,
      ui.ButtonSet.OK
    );

  }

}

/**
 * Заповнення службового аркуша "Налаштування"
 */
function initializeSettings() {

  const sheet = SheetFactory.getOrCreate(
    CONFIG.SHEETS.SETTINGS
  );

  sheet.clear();

  const data = [

    ['Параметр', 'Значення'],

    ['Назва системи', CONFIG.SYSTEM.NAME],

    ['Коротка назва', CONFIG.SYSTEM.SHORT_NAME],

    ['Версія', CONFIG.SYSTEM.VERSION],

    ['Build', CONFIG.SYSTEM.BUILD],

    ['Регіон', CONFIG.SYSTEM.REGION],

    ['Автор', CONFIG.SYSTEM.AUTHOR],

    ['Дата ініціалізації', Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm:ss')]

  ];

  sheet
    .getRange(1, 1, data.length, 2)
    .setValues(data);

  FormatService.header(sheet, 2);

  FormatService.autoWidth(sheet);

}

/**
 * Перевірка готовності системи
 *
 * @returns {boolean}
 */
function isSystemInitialized() {

  return SheetFactory.exists(
    CONFIG.SHEETS.SETTINGS
  );

}

/**
 * Інформація про систему
 */
function aboutSystem() {

  const ui = SpreadsheetApp.getUi();

  ui.alert(

    CONFIG.SYSTEM.NAME +

    '\n\nВерсія: ' +

    CONFIG.SYSTEM.VERSION +

    '\nBuild: ' +

    CONFIG.SYSTEM.BUILD +

    '\nРегіон: ' +

    CONFIG.SYSTEM.REGION +

    '\n\n© ДСНС України'

  );

}

/**
 * Тестове створення запису
 */
function testCreateWork() {
  WorksModule.createTestWork();
}

/**
 * Перевірка, що запускається правильний проєкт
 */
function helloTest() {

  SpreadsheetApp.getUi().alert(
    "Тест працює!",
    "Apps Script виконує саме цей проєкт.",
    SpreadsheetApp.getUi().ButtonSet.OK
  );

}