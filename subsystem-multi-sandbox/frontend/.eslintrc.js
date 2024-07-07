module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: ['@stylistic'],
  extends: ['@vue/eslint-config-typescript/recommended', 'plugin:vue/vue3-recommended', '@vue/eslint-config-prettier'],
  rules: {
    // Common rules
    curly: 'error',
    'prettier/prettier': 'error',
    'no-extra-boolean-cast': 'off',
    'no-inner-declarations': 'off',
    'no-console': 'error',
    'no-alert': 'error',
    'no-debugger': 'error',
    'no-restricted-imports': [
      // Restricts import from src
      'error',
      {
        patterns: [
          {
            group: ['**/src/**'],
            importNamePattern: '.',
            message: 'Импорт из директории src запрещен'
          }
        ]
      }
    ],
    '@stylistic/array-bracket-spacing': ['error', 'never'],
    '@stylistic/lines-between-class-members': ['error', 'always'],
    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/no-tabs': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/no-whitespace-before-property': 'error',
    '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/semi': 'error',
    '@stylistic/semi-spacing': 'error',
    '@stylistic/semi-style': ['error', 'last'],
    '@stylistic/space-before-blocks': 'error',
    '@stylistic/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['const', 'let'] },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let'] },
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: '*', next: 'class' },
      { blankLine: 'any', prev: 'case', next: 'case' },
      { blankLine: 'always', prev: '*', next: 'for' },
      { blankLine: 'always', prev: '*', next: 'do' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: '*', next: 'iife' },
      { blankLine: 'always', prev: '*', next: 'switch' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: '*', next: 'while' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'class', next: '*' },
      { blankLine: 'any', prev: 'case', next: 'case' },
      { blankLine: 'always', prev: 'for', next: '*' },
      { blankLine: 'always', prev: 'do', next: '*' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: 'iife', next: '*' },
      { blankLine: 'always', prev: 'switch', next: '*' },
      { blankLine: 'always', prev: 'try', next: '*' },
      { blankLine: 'always', prev: 'while', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    // Rules for TypeScript
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none'
      }
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    // Rules for Vue components
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/multi-word-component-names': 'off',
    'vue/padding-line-between-blocks': 'error',
    'vue/no-multi-spaces': 'error',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/no-dupe-keys': 'off',
    'vue/no-template-shadow': 'off',
    'vue/component-tags-order': ['error', { order: ['script', 'template', 'style'] }]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 6,
    sourceType: 'module'
  },
  ignorePatterns: ['.eslintrc.js', '.husky/', '.yarn/', 'node_modules/', '**/generated/']
};
