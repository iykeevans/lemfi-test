import eslintPluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	{
		ignores: ['.nuxt/**', '.output/**', 'node_modules/**'],
	},
	...eslintPluginVue.configs['flat/recommended'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			'vue/multi-word-component-names': 'off',
		},
	},
	eslintConfigPrettier,
];
