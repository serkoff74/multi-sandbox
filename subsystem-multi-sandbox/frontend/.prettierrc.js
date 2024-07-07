/** @type {import("prettier").Config} */
module.exports = {
  // Максимальная длина строки. Default: 80
  printWidth: 120,
  // Количество пробелов используемых для отступа. Default: 2
  tabWidth: 2,
  // Запятая в конце многострочных синтаксических конструкций (массивы, объекты и т.п.). Default: "all"
  trailingComma: 'none',
  // Использовать одиночные кавычки вместо двойных. Default: false
  singleQuote: true,
  // Порядок импорта. Используется плагин @trivago/prettier-plugin-sort-imports
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^vue', '^@vue', '^(?:\\w)', '^@(?:\\w)(?:.*)$', '^@plex', '^@mis', '^@/(?:\\w)', '^[../]', '^[./]'],
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy']
};