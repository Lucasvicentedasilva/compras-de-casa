import tailwindcss from "@tailwindcss/vite";
import { ptBR } from '@clerk/localizations'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss(),], },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@clerk/nuxt', '@nuxthub/core', '@vite-pwa/nuxt'],
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
        { name: 'description', content: 'Organize as compras da sua família de forma inteligente! Crie listas colaborativas, reutilize compras anteriores, acompanhe gastos e nunca mais esqueça nenhum item. App moderno, seguro e fácil de usar, com autenticação e histórico completo.' },
        { name: 'author', content: 'Lucas Silva' },
        { name: 'theme-color', content: '#0f172a' } // cor do navegador em mobile
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' }
      ]
    }
  },

  // Configuração PWA no nível raiz
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Compras de Casa',
      short_name: 'Compras',
      description: 'Organize as compras da sua família de forma inteligente!',
      theme_color: '#0f172a',
      background_color: '#0f172a',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        },
        {
          src: '/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          src: '/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png'
        }
      ]
    }
  }
})