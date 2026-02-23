import { defineNuxtConfig } from 'nuxt/config';

const appTitle = 'Transfers Monitoring Dashboard';

export default defineNuxtConfig({
	ssr: false,
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	app: {
		head: {
			title: appTitle,
			htmlAttrs: { lang: 'en' },
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
		},
	},
	css: ['~/assets/styles/global.scss'],
	devServer: {
		port: 3011,
	},
});
