import nextPlugin from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [...nextPlugin, eslintPluginPrettier, eslintConfigPrettier];
