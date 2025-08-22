import { FlatCompat } from '@eslint/eslintrc';
import tsparser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import jestdom from 'eslint-plugin-jest-dom';
import testinglibrary from 'eslint-plugin-testing-library';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Use tsconfig.spec.json for test files to enable typed linting on specs
  {
    files: ['src/**/*.spec.{ts,tsx}'],
    plugins: {
      jest: jest,
      'testing-library': testinglibrary,
      'jest-dom': jestdom,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: 'tsconfig.spec.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
  },
];

export default config;
