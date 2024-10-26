import { OptionDefaults } from 'typedoc';

/** @type {Partial<import('typedoc').TypeDocOptions>} */
const config = {
  entryPoints: ['src/index.ts'],
  out: 'docs',
  includeVersion: true,
  plugin: ['typedoc-plugin-zod'],
  sort: ['source-order'],
  blockTags: [...OptionDefaults.blockTags, '@since', '@decorator'],
  inlineTags: [...OptionDefaults.inlineTags, '@link'],
};

export default config;
