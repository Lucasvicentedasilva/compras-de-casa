<template>
    <NuxtPage />
    <button
        v-if="$pwa?.showInstallPrompt"
        @click="$pwa.install()"
        class="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full shadow-lg px-6 py-3 flex items-center gap-2 hover:bg-primary-700 transition"
        aria-label="Instalar app"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v12m0 0 4-4m-4 4-4-4m-7 7h18"/></svg>
        Instalar app
    </button>
</template>