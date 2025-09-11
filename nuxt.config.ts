import tailwindcss from "@tailwindcss/vite";
import { ptBR } from '@clerk/localizations'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {    plugins: [      tailwindcss(),    ],  },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@clerk/nuxt', '@nuxthub/core'],
  clerk: {
    localization: ptBR,
  },
   app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR' // 👈 idioma do app
      },
      title: 'Lista de Compras - Meu Supermercado',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Lucas Silva' },
        { name: 'theme-color', content: '#0f172a' } // cor do navegador em mobile
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' } // 👈 coloca teu favicon na pasta public
      ]
    }
  }
})