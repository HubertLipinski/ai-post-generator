// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", '@formkit/auto-animate/nuxt'],
  ssr: false,
  runtimeConfig: {
    OPENAI_API_KEY: "",
  },
});
