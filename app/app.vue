<template>
  <NuxtPage />
  <!-- PWA Install Prompt -->
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Feedback de sucesso após instalação -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="showInstallSuccess"
        class="bg-green-600 text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 backdrop-blur-sm border border-green-500/20 mb-3"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-sm font-medium">App instalado!</span>
      </div>
    </Transition>

    <!-- Botão de instalação para Chrome/Edge -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <button
        v-if="showInstallPrompt && !isInstalling"
        @click="installPwa"
        class="bg-primary text-primary-foreground rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 hover:bg-primary/90 transition-all duration-200 backdrop-blur-sm border border-primary/20 hover:scale-105"
        aria-label="Instalar app"
      >
        <div class="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v12m0 0 4-4m-4 4-4-4"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 24 24" class="-mt-1">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6"/>
          </svg>
        </div>
        <span class="text-sm font-medium">Instalar App</span>
      </button>
    </Transition>

    <!-- Loading durante instalação -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isInstalling"
        class="bg-primary text-primary-foreground rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 backdrop-blur-sm border border-primary/20"
      >
        <div class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        <span class="text-sm font-medium">Instalando...</span>
      </div>
    </Transition>

    <!-- Instruções para Firefox/Safari -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="showManualInstructions"
        class="bg-card text-foreground rounded-2xl shadow-xl p-4 max-w-xs backdrop-blur-sm border border-border/40"
      >
        <div class="flex items-start justify-between mb-2">
          <h3 class="font-semibold text-sm">Como instalar</h3>
          <button 
            @click="dismissInstructions" 
            class="p-1 hover:bg-muted/20 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6l-12 12M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <p class="text-xs text-muted-foreground">{{ instructionText }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const { $pwa } = useNuxtApp()
const showManualInstructions = ref(false)
const instructionText = ref('')
const showInstallSuccess = ref(false)
const isInstalling = ref(false)

// Computed para refletir o estado do $pwa
const showInstallPrompt = computed(() => $pwa?.showInstallPrompt)

// Detectar navegador
const detectBrowser = () => {
  if (typeof navigator === 'undefined') return 'other'
  
  const ua = navigator.userAgent.toLowerCase()
  
  if (ua.includes('firefox')) return 'firefox'
  if (ua.includes('safari') && !ua.includes('chrome')) return 'safari'
  if (ua.includes('chrome') || ua.includes('edg')) return 'chrome'
  
  return 'other'
}

// Configurar instruções baseadas no navegador
const setupInstructions = () => {
  const browser = detectBrowser()
  
  if (browser === 'firefox') {
    instructionText.value = 'Para instalar no Firefox: toque no menu (⋮ ou ☰) e escolha "Instalar" ou "Adicionar à tela inicial".'
    showManualInstructions.value = true
    // Auto-hide após 12 segundos
    setTimeout(() => {
      showManualInstructions.value = false
    }, 12000)
  } else if (browser === 'safari') {
    instructionText.value = 'Para instalar no Safari: toque no ícone de compartilhar (📤) e selecione "Adicionar à Tela de Início".'
    showManualInstructions.value = true
    
    // Auto-hide após 12 segundos
    setTimeout(() => {
      showManualInstructions.value = false
    }, 12000)
  }
}

const dismissInstructions = () => {
  showManualInstructions.value = false
}

const installPwa = async () => {
  try {
    isInstalling.value = true
    if ($pwa?.install) {
      await $pwa.install()
      
      // Mostrar feedback de sucesso
      showInstallSuccess.value = true
      setTimeout(() => {
        showInstallSuccess.value = false
      }, 3000)
    }
  } catch (error) {
    console.log('Erro ao instalar PWA:', error)
  } finally {
    isInstalling.value = false
  }
}

onMounted(() => {
  // Se não há prompt de instalação disponível, mostrar instruções manuais
  if (!showInstallPrompt.value) {
    setupInstructions()
  }
  
  // Listener para evento de instalação bem-sucedida
  if ($pwa) {
    $pwa.addEventListener?.('appinstalled', () => {
      showInstallSuccess.value = true
      setTimeout(() => {
        showInstallSuccess.value = false
      }, 3000)
    })
  }
})
</script>