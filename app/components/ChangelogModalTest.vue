<template>
  <div class="modal-overlay">
    <div class="modal-box-changelog">
  <div class="changelog-header">
  
        <div>
          <h3 class="changelog-title">Novidades desta versão 🚀</h3>
          <p class="changelog-version">v{{ changelog.version }} - {{ changelog.date }}</p>
        </div>
        <button class="changelog-close-btn" @click="$emit('close')" aria-label="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="#222" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6l-12 12M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="changelog-content-scroll">
        <div class="changelog-list">
          <div v-for="(item, idx) in changelog.novidades" :key="idx" class="changelog-item">
            <div class="changelog-bullet"></div>
            <p class="changelog-text">{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="changelog-footer">
        <button class="changelog-continue-btn" @click="$emit('close')">Continuar usando o app</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  changelog: {
    type: Object,
    required: true
  }
})
defineEmits(['close'])
</script>

<style>
/* Dark mode support */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box-changelog {
  background: var(--modal-bg, #fff);
  width: 95vw;
  max-width: 480px;
  min-width: 280px;
  height: 65vh;
  max-height: 80vh;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.18);
}

@media (min-width: 640px) {
  .modal-box-changelog {
    max-width: 540px;
  height: 75vh;
  max-height: 85vh;
  }
}

@media (min-width: 1024px) {
  .modal-box-changelog {
    max-width: 700px;
  height: 80vh;
  max-height: 90vh;
  }
}
.changelog-header {
  flex-shrink: 0;
  border-bottom: 1px solid var(--modal-border, #e5e7eb);
  padding: 1.25rem 1.5rem 0.75rem 1.5rem;
  background: var(--modal-bg, #fff);
  border-radius: 18px 18px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.changelog-title {
  font-size: 1.15rem;
  font-weight: bold;
  color: var(--modal-title, #222);
  margin: 0;
}
.changelog-version {
  font-size: 0.85rem;
  color: var(--modal-muted, #888);
  margin-top: 0.25rem;
}
.changelog-close-btn {
  flex-shrink: 0;
  padding: 0.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
  margin-left: 0.5rem;
  color: var(--modal-title, #222);
  background: none;
  border: none;
  cursor: pointer;
}
.changelog-close-btn:hover {
  background-color: var(--modal-hover, #f3f4f6);
}
.changelog-content-scroll {
  height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 1.5rem;
  background: var(--modal-content-bg, #fafafa);
  scrollbar-width: thin;
  scrollbar-color: var(--modal-scrollbar, #bbb) var(--modal-content-bg, #fafafa);
}
.changelog-content-scroll::-webkit-scrollbar {
  width: 8px;
  background: var(--modal-content-bg, #fafafa);
}
.changelog-content-scroll::-webkit-scrollbar-track {
  background: var(--modal-content-bg, #fafafa);
}
.changelog-content-scroll::-webkit-scrollbar-thumb {
  background: var(--modal-scrollbar, #bbb);
  border-radius: 8px;
}
.changelog-content-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--modal-scrollbar-hover, #888);
}
.changelog-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.changelog-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--modal-item-bg, #f3f4f6);
  border-radius: 0.5rem;
  transition: background-color 0.15s;
}
.changelog-item:hover {
  background: var(--modal-item-hover, #e5e7eb);
}
.changelog-bullet {
  flex-shrink: 0;
  width: 0.5rem;
  height: 0.5rem;
  background: hsl(var(--primary));
  border-radius: 50%;
  margin-top: 0.5rem;
}
.changelog-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--modal-title, #222);
}
.changelog-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--modal-border, #e5e7eb);
  padding: 1rem 1.5rem;
  background: var(--modal-bg, #fff);
  border-radius: 0 0 18px 18px;
}
.changelog-continue-btn {
  width: 100%;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  transition: background-color 0.2s;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
}
.changelog-continue-btn:hover {
  background: hsl(var(--primary) / 0.9);
}
@media (max-width: 480px) {
  .modal-box-changelog {
    max-width: 98vw;
    min-width: 98vw;
    height: 75vh;
    max-height: 75vh;
    border-radius: 10px;
  }
  .changelog-header, .changelog-content-scroll, .changelog-footer {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .changelog-title {
    font-size: 1rem;
  }
  .changelog-text {
    font-size: 0.85rem;
  }
}

/* Dark mode variables */
:root {
  --modal-bg: hsl(var(--card));
  --modal-content-bg: hsl(var(--background));
  --modal-title: hsl(var(--foreground));
  --modal-muted: hsl(var(--muted-foreground));
  --modal-border: hsl(var(--border));
  --modal-hover: hsl(var(--muted));
  --modal-item-bg: hsl(var(--muted));
  --modal-item-hover: hsl(var(--muted));
  --modal-scrollbar: hsl(var(--muted-foreground));
  --modal-scrollbar-hover: hsl(var(--primary));
}
.dark {
  --modal-bg: hsl(var(--card));
  --modal-content-bg: hsl(var(--background));
  --modal-title: hsl(var(--foreground));
  --modal-muted: hsl(var(--muted-foreground));
  --modal-border: hsl(var(--border));
  --modal-hover: hsl(var(--muted));
  --modal-item-bg: hsl(var(--muted));
  --modal-item-hover: hsl(var(--muted));
  --modal-scrollbar: hsl(var(--muted-foreground));
  --modal-scrollbar-hover: hsl(var(--primary));
}
</style>