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
        // Cores dinâmicas para tema claro e escuro
        { name: 'theme-color', content: '#fafafa', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0a0a0b', media: '(prefers-color-scheme: dark)' },
        // Meta tags para iOS
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' }
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
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 20
    },
    devOptions: {
      enabled: true,
      type: 'module'
    },
    manifest: {
      name: 'Compras de Casa - Lista de Supermercado',
      short_name: 'Compras',
      description: 'Organize as compras da sua família de forma inteligente! Crie listas colaborativas, reutilize compras anteriores e controle gastos.',
      theme_color: '#fafafa', // cor clara como padrão
      background_color: '#ffffff', // fundo branco para carregamento
      display: 'fullscreen',
      orientation: 'portrait',
      start_url: '/',
      scope: '/',
      icons: [
        {
          src: '/android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/apple-icon-180x180.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/android-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/android-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
          purpose: 'any'
        }
      ]
    }
  }
})