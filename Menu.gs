/**
 * =====================================================================
 * IAS PMD v4
 * Menu.gs
 * Build : 002.2.0
 * =====================================================================
 */

'use strict';

/**
 * Створення головного меню
 */
function onOpen() {

  SpreadsheetApp.getUi()

    .createMenu(CONFIG.SYSTEM.SHORT_NAME)

    .addItem('🏠 Ініціалізувати систему', 'initializeSystem')

    .addSeparator()

    .addItem('📝 Новий виїзд', 'menuNewWork')

    .addItem('🔍 Пошук', 'menuSearch')

    .addSeparator()

    .addItem('📦 Склад ВМ', 'menuWarehouse')

    .addItem('📊 Звітність', 'menuReports')

    .addItem('📈 Dashboard', 'menuDashboard')

    .addSeparator()

    .addItem('⚙ Налаштування', 'menuSettings')

    .addItem('ℹ Про систему', 'aboutSystem')

    .addToUi();

}

/**
 * Новий виїзд - Тестування
 */
function menuNewWork() {

  SpreadsheetApp.getUi().alert(

    CONFIG.SYSTEM.SHORT_NAME,

    'Модуль "Новий виїзд" буде реалізований у Build 002.3.0.',

    SpreadsheetApp.getUi().ButtonSet.OK

  );

}

/**
 * Пошук
 */
function menuSearch() {

  SpreadsheetApp.getUi().alert(

    CONFIG.SYSTEM.SHORT_NAME,

    'Модуль пошуку буде реалізований у Build 002.3.0.',

    SpreadsheetApp.getUi().ButtonSet.OK

  );

}

/**
 * Склад ВМ
 */
function menuWarehouse() {

  SpreadsheetApp.getUi().alert(

    CONFIG.SYSTEM.SHORT_NAME,

    'Модуль "Склад ВМ" буде реалізований у Build 003.',

    SpreadsheetApp.getUi().ButtonSet.OK

  );

}

/**
 * Dashboard
 */
function menuDashboard() {

  SpreadsheetApp.getUi().alert(

    CONFIG.SYSTEM.SHORT_NAME,

    'Dashboard буде реалізований у Build 004.',

    SpreadsheetApp.getUi().ButtonSet.OK

  );

}

/**
 * Звіти
 */
function menuReports() {

  SpreadsheetApp.getUi().alert(

    CONFIG.SYSTEM.SHORT_NAME,

    'Модуль звітності буде реалізований у Build 003.',

    SpreadsheetApp.getUi().ButtonSet.OK

  );

}

/**
 * Налаштування
 */
function menuSettings() {

  const sheet = SheetFactory.getOrCreate(

    CONFIG.SHEETS.SETTINGS

  );

  SpreadsheetApp

    .getActiveSpreadsheet()

    .setActiveSheet(sheet);

}