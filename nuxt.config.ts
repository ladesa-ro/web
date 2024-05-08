export default defineNuxtConfig({
	// ==============================================

	ssr: true,

	// ===========

	devtools: {
		enabled: true,
	},

	// ===========

	features: {
		inlineStyles: true,
	},

	// ==============================================

	css: ['@mdi/font/css/materialdesignicons.min.css'],

	serverHandlers: [
		{ route: '/_api/auth/**', handler: '~/server/_api/auth/[...].ts' },
	],

	// ==============================================

	modules: [
		'@sidebase/nuxt-auth',
		'@nuxtjs/tailwindcss',
		'vue3-carousel-nuxt',
		'vuetify-nuxt-module',
	],

	// ==============================================

	auth: {
		baseURL: process.env.AUTH_ORIGIN ?? '/_api/auth',
		provider: {
			type: 'authjs',
			trustHost: true,
		},
		session: {
			enableRefreshPeriodically: 15 * 1000,
			enableRefreshOnWindowFocus: true,
		},
	},

	// ===========

	nitro: {
		hooks: {
			'rollup:before'(ctx) {
				ctx.options.moduleSideEffects.push('reflect-metadata');
			},
		},
		esbuild: {
			options: {
				tsconfigRaw: {
					compilerOptions: {
						experimentalDecorators: true,
					},
				},
			},
		},
	},

	// ===========
});
