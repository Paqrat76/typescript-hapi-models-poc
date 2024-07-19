import globals from 'globals';
import eslintjs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';
import jsdocLint from 'eslint-plugin-jsdoc';
import prettierConfig from 'eslint-config-prettier';

/**
 * EsLint Flat Config
 *
 * Configuration References
 * @see https://eslint.org/docs/v8.x/use/configure/configuration-files-new
 * @see https://typescript-eslint.io/packages/typescript-eslint#config
 * Rules References
 * @see https://eslint.org/docs/v8.x/rules/
 * @see https://typescript-eslint.io/rules/
 * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/README.md
 */
export default tseslint.config(
  eslintjs.configs.recommended,
  ...tseslint.configs.strictTypeChecked, // https://typescript-eslint.io/users/configs#strict-type-checked
  ...tseslint.configs.stylisticTypeChecked, // https://typescript-eslint.io/users/configs#stylistic-type-checked
  jsdocLint.configs['flat/recommended'],
  {
    // if an ignores key is used without any other keys in the configuration object, then the patterns act as global ignores.
    // https://eslint.org/docs/latest/use/configure/ignore
    // Default patterns include ["**/node_modules/", ".git/"]
    // Ignore the project 'coverage' and 'dist' directories. Also ignore all files beginning with '.'. Finally,
    // ignore all project root level JavaScript files used for configurations.
    ignores: ['coverage/**', 'dist/**', '**/.*', '*.[m|c]js'],
  },
  {
    name: 'base',
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      jsdoc: jsdocLint,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      globals: {
        ...globals.nodeBuiltin,
      },
    },
    linterOptions: {
      // https://eslint.org/docs/latest/use/configure/configuration-files#disabling-inline-configuration
      noInlineConfig: true,
      // https://eslint.org/docs/latest/use/configure/configuration-files#reporting-unused-disable-directives
      reportUnusedDisableDirectives: 'warn',
    },
    rules: {
      // JSDoc overrides
      'jsdoc/tag-lines': [
        'error',
        'any',
        {
          startLines: 1,
        },
      ],
      'jsdoc/no-undefined-types': [
        'error',
        {
          definedTypes: ['void'], // override of 'plugin:jsdoc/recommended'
        },
      ],
      'jsdoc/require-hyphen-before-param-description': 'error',
      'jsdoc/require-param-type': 'off', // override of 'plugin:jsdoc/recommended'
      'jsdoc/require-returns-type': 'off', // override of 'plugin:jsdoc/recommended'
    },
  },
  {
    name: 'test',
    files: ['test/**/*.ts'],
    plugins: {
      jest: jestPlugin,
      jsdoc: jsdocLint,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'jsdoc/require-jsdoc': 'off', // override of 'plugin:jsdoc/recommended'
    },
  },
  // https://typescript-eslint.io/troubleshooting/formatting#suggested-usage---prettier
  prettierConfig,
);
