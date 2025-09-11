<template>
  <NuxtPage />
  <!-- PWA Install Prompt -->
  <div v-if="showInstallPrompt" class="fixed bottom-6 right-6 z-50">
    <button
      @click="installPwa"
      class="bg-primary text-primary-foreground rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 hover:bg-primary/90 transition-all duration-200 backdrop-blur-sm border border-primary/20"
      aria-label="Instalar app"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v12m0 0 4-4m-4 4-4-4m-7 7h18"/>
      </svg>
      <span class="text-sm font-medium">Instalar App</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const { $pwa } = useNuxtApp()

// Computed para refletir o estado do $pwa
const showInstallPrompt = computed(() => $pwa?.showInstallPrompt)

const installPwa = async () => {
  try {
    if ($pwa?.install) {
      await $pwa.install()
    }
  } catch (error) {
    console.log('Erro ao instalar PWA:', error)
  }
}
</script>