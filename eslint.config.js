module.exports = [
  // 1. Секция исключений (вместо .eslintignore)
  {
    ignores: [
      'assets/js/index.js',
      'assets/js/katex.js',
      'assets/js/vendor/**',
      'node_modules/**',
      'public/**',
      'resources/**',
      '.hugo_build.lock'
    ]
  },

  // 2. Основная конфигурация
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    // Вместо импорта @eslint/js используем встроенную заглушку для базовых правил
    rules: {
      'no-console': 'off',
      'quotes': ['error', 'single'],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'ignore'
        }
      ]
    },
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        // Браузер
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',

        // Node.js / CommonJS
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',

        // Специфичные глобалки
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
      }
    }
  }
];
