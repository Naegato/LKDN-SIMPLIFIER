import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Disable all ESLint rules that would conflict with Prettier
  prettierConfig,
  // Override default ignores of eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'generated/**']),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
    },
    rules: {
      // Run Prettier as an ESLint rule — violations are auto-fixable via --fix
      'prettier/prettier': 'error',

      // ─── Imports ──────────────────────────────────────────────────────────

      // Groups: side-effects → external deps → internal (@/) → relative
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000'], ['^[^@.]', '^@(?!/)'], ['^@/'], ['^\\.']],
        },
      ],
      'simple-import-sort/exports': 'error',
      // Disable import/order — conflicts with simple-import-sort and breaks --fix
      'import/order': 'off',
      // Merge duplicate imports from the same module
      'import/no-duplicates': 'error',
      // Force `import type` for type-only imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      // ─── TypeScript ───────────────────────────────────────────────────────

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // ─── React ────────────────────────────────────────────────────────────

      // <Foo></Foo> → <Foo />
      'react/self-closing-comp': 'error',

      // ─── General ──────────────────────────────────────────────────────────

      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
]);

export default eslintConfig;
