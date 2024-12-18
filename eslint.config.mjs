import globals from 'globals';
import eslintjs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';
import jsdocLint from 'eslint-plugin-jsdoc';
import nodeImport from 'eslint-plugin-node-import';
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
    ignores: ['coverage/**', 'dist/**', 'docs/**', '**/.*', '*.[m|c]js'],
  },
  {
    name: 'base',
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'node-import': nodeImport,
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
      noInlineConfig: false,
      // https://eslint.org/docs/latest/use/configure/configuration-files#reporting-unused-disable-directives
      reportUnusedDisableDirectives: 'warn',
    },
    rules: {
      // Additional rules
      // https://typescript-eslint.io/rules/consistent-type-assertions/
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow',
        },
      ],
      // https://www.npmjs.com/package/eslint-plugin-node-import?activeTab=readme#rules
      'node-import/prefer-node-protocol': 'error',
      // https://typescript-eslint.io/rules/method-signature-style/
      '@typescript-eslint/method-signature-style': ['error', 'property'],
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
      'jsdoc/check-tag-names': [
        'error',
        {
          // TypeDoc tags (https://typedoc.org/guides/tags/) plus configured custom tags
          definedTags: [
            'alpha',
            'beta',
            'category',
            'categoryDescription',
            'decorator',
            'defaultValue',
            'deprecated',
            'document',
            'enum',
            'event',
            'eventProperty',
            'example',
            'experimental',
            'group',
            'groupDescription',
            'hidden',
            'hideconstructor',
            'ignore',
            'inheritDoc',
            'interface',
            'internal',
            'label',
            'link',
            'module',
            'namespace',
            'overload',
            'packageDocumentation',
            'param',
            'private',
            'privateRemarks',
            'property',
            'protected',
            'public',
            'readonly',
            'remarks',
            'returns',
            'satisfies',
            'sealed',
            'see',
            'since',
            'template',
            'throws',
            'typeParam',
            'virtual',
          ],
        },
      ],
      'jsdoc/empty-tags': 'off', // override of 'plugin:jsdoc/recommended'
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
