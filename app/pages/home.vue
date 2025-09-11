<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShoppingCart class="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 class="text-xl font-bold">Lista de Compras</h1>
        </div>
        <div class="flex items-center gap-3">
          <button @click="navigateToLogin" class="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
            Entrar
          </button>
          <button @click="navigateToRegister" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Cadastrar
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20 px-4">
      <div class="container mx-auto text-center">
        <div class="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <ShoppingCart class="w-12 h-12 text-primary" />
        </div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text ">
          Organize suas compras
        </h1>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          O app definitivo para gerenciar suas listas de compras em família, reutilizar compras anteriores e manter o controle dos seus gastos. Nunca mais esqueça daquele item essencial!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="showRegister = true" class="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
            Começar Agora
          </button>
          <button @click="scrollToFeatures" class="px-8 py-4 bg-muted text-muted-foreground rounded-lg text-lg font-semibold hover:bg-accent transition-colors">
            Ver Recursos
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 bg-muted/20">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-16">Recursos Principais</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <!-- Feature 1 -->
          <div class="bg-card rounded-xl p-6 border border-border text-center">
            <div class="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Package class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Listas Inteligentes</h3>
            <p class="text-muted-foreground">
              Crie e organize suas listas de compras com categorias, preços e quantidades para um controle total.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-card rounded-xl p-6 border border-border text-center">
            <div class="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <History class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Histórico Completo</h3>
            <p class="text-muted-foreground">
              Acesse todas as suas compras anteriores e reutilize listas para economizar tempo e dinheiro.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-card rounded-xl p-6 border border-border text-center">
            <div class="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Família Conectada</h3>
            <p class="text-muted-foreground">
              Toda a família pode acessar e editar a mesma lista. Acabou o "esqueci de comprar" do seu cônjuge! 😄
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-card rounded-xl p-6 border border-border text-center">
            <div class="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DollarSign class="w-8 h-8 text-primary" />
            </div>
            <h3 class="text-xl font-semibold mb-3">Controle de Gastos</h3>
            <p class="text-muted-foreground">
              Monitore seus gastos com totais estimados e relatórios detalhados de cada compra realizada.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="py-20 px-4">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-16">Como Funciona</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
              1
            </div>
            <h3 class="font-semibold mb-2">Crie sua Lista</h3>
            <p class="text-sm text-muted-foreground">Adicione produtos com preços e quantidades</p>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
              2
            </div>
            <h3 class="font-semibold mb-2">Vá às Compras</h3>
            <p class="text-sm text-muted-foreground">Marque itens conforme coloca no carrinho</p>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
              3
            </div>
            <h3 class="font-semibold mb-2">Finalize a Compra</h3>
            <p class="text-sm text-muted-foreground">Registre o valor total e salve no histórico</p>
          </div>

          <!-- Step 4 -->
          <div class="text-center">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
              4
            </div>
            <h3 class="font-semibold mb-2">Reutilize</h3>
            <p class="text-sm text-muted-foreground">Use compras anteriores para criar novas listas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Family Benefits Section -->
    <section class="py-20 px-4 bg-primary/5">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">🏠 Perfeito para Famílias</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div class="bg-card rounded-xl p-6 border border-border">
            <div class="text-4xl mb-4">😅</div>
            <h3 class="text-xl font-semibold mb-3">Acabou o "Esqueci!"</h3>
            <p class="text-muted-foreground">
              Chega de voltar do mercado e descobrir que esqueceu o item mais importante. 
              Agora todos podem ver e marcar os itens em tempo real!
            </p>
          </div>
          <div class="bg-card rounded-xl p-6 border border-border">
            <div class="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 class="text-xl font-semibold mb-3">Uma Conta, Toda Família</h3>
            <p class="text-muted-foreground">
              Pai, mãe, filhos... todos podem acessar com a mesma conta. 
              Quem estiver no mercado pode atualizar a lista para os outros!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-primary/5">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de usuários que já otimizaram suas compras com nosso app.
        </p>
        <button @click="navigateToRegister" class="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
          Criar Conta Grátis
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-border">
      <div class="container mx-auto text-center">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
            <ShoppingCart class="w-4 h-4 text-primary-foreground" />
          </div>
          <span class="font-semibold">Lista de Compras</span>
        </div>
        
        <div class="mb-4">
          <p class="text-muted-foreground text-sm mb-2">
            Feito com ❤️ por <a href="https://lucassilvadev.vercel.app/" target="_blank" class="text-primary hover:underline font-medium">Lucas Silva</a>
          </p>
          <div class="flex items-center justify-center gap-4 text-sm">
            <a href="https://lucassilvadev.vercel.app/" target="_blank" class="text-muted-foreground hover:text-primary transition-colors">
              🌐 Portfólio
            </a>
            <a href="https://github.com/Lucasvicentedasilva" target="_blank" class="text-muted-foreground hover:text-primary transition-colors">
              💻 GitHub
            </a>
          </div>
        </div>
        
        <p class="text-muted-foreground text-sm">
          © 2025 Lista de Compras. Todos os direitos reservados.
        </p>
      </div>
    </footer>

    <!-- Login Modal -->
    <div v-if="showLogin" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-center p-4">
      <div class="w-full max-w-md bg-card rounded-xl border border-border p-6 shadow-lg">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User class="w-8 h-8 text-primary" />
          </div>
          <h2 class="text-xl font-bold mb-2">Entrar na sua conta</h2>
          <p class="text-muted-foreground text-sm">Acesse suas listas e histórico de compras</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <input 
              v-model="loginForm.email" 
              type="email" 
              placeholder="E-mail" 
              required
              class="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <input 
              v-model="loginForm.password" 
              type="password" 
              placeholder="Senha" 
              required
              class="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button 
            type="submit"
            class="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Entrar
          </button>
        </form>

        <div class="mt-6 text-center">
          <button 
            @click="switchToRegister" 
            class="text-primary hover:underline text-sm"
          >
            Não tem conta? Cadastre-se aqui
          </button>
        </div>

        <button 
          @click="showLogin = false" 
          class="absolute top-4 right-4 p-2 hover:bg-accent/10 rounded-lg"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Register Modal -->
    <div v-if="showRegister" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-center p-4">
      <div class="w-full max-w-md bg-card rounded-xl border border-border p-6 shadow-lg">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus class="w-8 h-8 text-primary" />
          </div>
          <h2 class="text-xl font-bold mb-2">Criar nova conta</h2>
          <p class="text-muted-foreground text-sm">Comece a organizar suas compras hoje mesmo</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <input 
              v-model="registerForm.name" 
              type="text" 
              placeholder="Nome completo" 
              required
              class="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <input 
              v-model="registerForm.email" 
              type="email" 
              placeholder="E-mail" 
              required
              class="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <input 
              v-model="registerForm.password" 
              type="password" 
              placeholder="Senha" 
              required
              class="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <input 
              v-model="registerForm.confirmPassword" 
              type="password" 
              placeholder="Confirmar senha" 
              required
              class="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button 
            type="submit"
            class="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Criar Conta
          </button>
        </form>

        <div class="mt-6 text-center">
          <button 
            @click="switchToLogin" 
            class="text-primary hover:underline text-sm"
          >
            Já tem conta? Faça login aqui
          </button>
        </div>

        <button 
          @click="showRegister = false" 
          class="absolute top-4 right-4 p-2 hover:bg-accent/10 rounded-lg"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  ShoppingCart, Package, History, DollarSign, 
  User, UserPlus, X, Users
} from 'lucide-vue-next'

// UI State
const showLogin = ref(false)
const showRegister = ref(false)

// Form data
const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Methods
const scrollToFeatures = () => {
  const element = document.getElementById('features')
  element?.scrollIntoView({ behavior: 'smooth' })
}

const switchToRegister = () => {
  showLogin.value = false
  showRegister.value = true
}

const switchToLogin = () => {
  showRegister.value = false
  showLogin.value = true
}

const navigateToLogin = async () => {
  await navigateTo('/login')
}

const navigateToRegister = async () => {
  await navigateTo('/register')
}

const handleLogin = async () => {
  // TODO: Implementar lógica de login
  
  alert('Funcionalidade em desenvolvimento!')
}

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('As senhas não coincidem!')
    return
  }
  
  // TODO: Implementar lógica de cadastro
  
  alert('Funcionalidade em desenvolvimento!')
}

// Set dark theme on mount
onMounted(() => {
  document.documentElement.classList.add('dark')
})
</script>

<style>
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Gradient text fallback */
@supports not (background-clip: text) {
  .bg-clip-text {
    background: none;
    color: hsl(var(--primary));
  }
}

/* Form focus styles */
input:focus {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--primary));
}

/* Button hover animations */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

/* Modal backdrop animation */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Dark mode styles using semantic tokens */
.dark {
  color-scheme: dark;
}

/* Ensure proper contrast */
.bg-background {
  background-color: hsl(var(--background));
}

.text-foreground {
  color: hsl(var(--foreground));
}

.bg-card {
  background-color: hsl(var(--card));
}

.text-card-foreground {
  color: hsl(var(--card-foreground));
}

.bg-primary {
  background-color: hsl(var(--primary));
}

.text-primary {
  color: hsl(var(--primary));
}

.text-primary-foreground {
  color: hsl(var(--primary-foreground));
}

.bg-muted {
  background-color: hsl(var(--muted));
}

.text-muted-foreground {
  color: hsl(var(--muted-foreground));
}

.border-border {
  border-color: hsl(var(--border));
}

.bg-input {
  background-color: hsl(var(--input));
}

.focus\:ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}

.focus\:ring-primary:focus {
  --tw-ring-color: hsl(var(--primary));
}

.bg-accent {
  background-color: hsl(var(--accent));
}

.text-destructive {
  color: hsl(var(--destructive));
}

.bg-destructive\/10 {
  background-color: hsl(var(--destructive) / 0.1);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground));
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--accent));
}
</style>