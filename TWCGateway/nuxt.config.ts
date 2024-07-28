// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    AUTH0_CLIENTID: '',
    AUTH0_SECRET: '',
    BASEURL: '',
    ISSUER: '',
    public: {
      BASEURL: '',
      ISSUER: '',
    },
  },

  modules: ['@prisma/nuxt'],
  compatibilityDate: '2024-07-27',
});