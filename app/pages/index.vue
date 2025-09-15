<template>
 <div class="min-h-screen bg-background text-foreground">
    <!-- Overlay de animação de transição de tema (círculo expansivo real) -->
    <div v-if="isTransitioning" class="fixed inset-0 z-[9999] pointer-events-none">
      <div :style="circleAnimStyle" class="theme-switch-circle"></div>
    </div>

    <!-- Modal de Changelog -->
    <ChangelogModalTest v-if="showChangelog" :changelog="changelog" @close="showChangelog = false" />

  <!-- Header -->
  <header class="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border relative">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ShoppingCart class="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 class="text-xl font-bold">Lista de Compras</h1>
        </div>
        <div class="flex items-center gap-2">
          <button @click="showStartModal = true" class="p-2 rounded-lg hover:bg-accent/10 transition-colors" title="Reutilizar compra anterior">
            <Package class="w-5 h-5" />
          </button>
          <button ref="themeBtn" @click="startThemeTransition" class="p-2 rounded-lg hover:bg-accent/10 transition-colors relative overflow-visible">
            <Sun v-if="isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>
          <button @click="showHistory = !showHistory" class="p-2 rounded-lg hover:bg-accent/10 transition-colors">
            <History class="w-5 h-5" />
          </button>
          <button @click="handleLogout" class="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Sair">
            <LogOut class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
    

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-6 pb-20">
      <!-- Histórico Modal -->
      <div v-if="showHistory" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-start pt-20">
        <div class="w-full max-w-lg bg-card rounded-xl border border-border overflow-auto p-4">
          <div class="flex items-center justify-between mb-4 border-b border-border pb-2">
            <h2 class="text-lg font-semibold">Histórico de Compras</h2>
            <button @click="showHistory = false" class="p-2 hover:bg-accent/10 rounded-lg">
              <X class="w-5 h-5" />
            </button>
          </div>
          <div>
            <div v-for="month in groupedHistory" :key="month.month" class="mb-6">
              <h3 class="font-medium mb-3 text-muted-foreground">{{ month.month }}</h3>
              <div v-for="purchase in month.purchases" :key="purchase.id" 
                   @click="openPurchaseDetails(purchase)"
                   class="bg-muted/20 rounded-lg p-3 mb-2 cursor-pointer hover:bg-muted/30 transition-colors">
                <div class="flex justify-between items-start mb-2">
                  <span class="font-medium">{{ purchase.date }}</span>
                  <span class="text-primary font-bold">R$ {{ purchase.total.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{{ purchase.items }} itens</span>
                  <span class="text-xs">Clique para ver detalhes →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Inicial - Escolha de Tipo de Compra -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showStartModal" class="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex justify-center items-center p-4" @keydown.esc="showStartModal = false" tabindex="-1">
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div class="w-full max-w-md bg-card rounded-xl border border-border p-6 shadow-lg relative">
              <button @click="showStartModal = false" class="absolute top-3 right-3 p-2 rounded-md hover:bg-muted/10 transition-colors" aria-label="Fechar modal">
                <X class="w-4 h-4" />
              </button>
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart class="w-8 h-8 text-primary" />
                </div>
                <h2 class="text-xl font-bold mb-2">Como deseja começar?</h2>
                <p class="text-muted-foreground text-sm">Escolha uma opção para sua lista de compras</p>
              </div>

              <div class="space-y-3">
            <!-- Usar Última Compra -->
            <button 
              v-if="purchaseHistory.length > 0"
              @click="useLastPurchase" 
              :disabled="isLoadingPurchaseItems"
              class="w-full bg-primary text-primary-foreground p-4 rounded-lg hover:bg-primary/90 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <div v-if="isLoadingPurchaseItems" class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <History v-else class="w-5 h-5" />
                </div>
                <div>
                  <div class="font-semibold">
                    {{ isLoadingPurchaseItems ? 'Carregando...' : 'Usar Última Compra' }}
                  </div>
                  <div class="text-sm opacity-90">
                    {{ purchaseHistory[0]?.date || 'Data não disponível' }} - {{ purchaseHistory[0]?.items || 0 }} itens
                  </div>
                </div>
              </div>
            </button>

            <!-- Escolher Compra Específica -->
            <button 
              v-if="purchaseHistory.length > 1"
              @click="choosePurchaseToReuse" 
              class="w-full bg-muted hover:bg-accent p-4 rounded-lg transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <Package class="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div class="font-semibold">Escolher Compra Anterior</div>
                  <div class="text-sm text-muted-foreground">Ver todas as compras anteriores</div>
                </div>
              </div>
            </button>

            <!-- Compra Manual -->
            <button 
              @click="startManualShopping" 
              class="w-full bg-muted hover:bg-accent p-4 rounded-lg transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <Plus class="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div class="font-semibold">Criar Lista Manualmente</div>
                  <div class="text-sm text-muted-foreground">Começar do zero</div>
                </div>
              </div>
            </button>
          </div>
            </div>
          </Transition>
        </div>
      </Transition>

      <!-- Modal de Seleção de Compra -->
      <div v-if="showPurchaseOptions" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-start pt-10">
        <div class="w-full max-w-lg bg-card rounded-xl border border-border overflow-auto max-h-[80vh] p-4 m-4">
          <div class="flex items-center justify-between mb-4 border-b border-border pb-2">
            <h2 class="text-lg font-semibold">Escolher Compra para Reutilizar</h2>
            <button @click="cancelPurchaseSelection" class="p-2 hover:bg-accent/10 rounded-lg">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <div class="space-y-2">
            <div v-for="month in groupedHistory" :key="month.month" class="mb-4">
              <h3 class="font-medium mb-2 text-muted-foreground text-sm">{{ month.month }}</h3>
              <div v-for="purchase in month.purchases" :key="purchase.id" 
                   class="bg-muted/20 rounded-lg p-3 mb-2 border border-transparent hover:border-primary/20 transition-all">
                <div class="flex justify-between items-center mb-2">
                  <div>
                    <div class="font-medium">{{ purchase.date }}</div>
                    <div class="text-sm text-muted-foreground">{{ purchase.items }} itens</div>
                  </div>
                  <div class="text-right">
                    <div class="text-primary font-bold">R$ {{ purchase.total.toFixed(2) }}</div>
                  </div>
                </div>
                
                <div class="flex gap-2">
                  <button 
                    @click="loadPurchaseItems(purchase, true)"
                    :disabled="isLoadingPurchaseItems"
                    class="flex-1 bg-primary text-primary-foreground py-2 px-3 rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <div v-if="isLoadingPurchaseItems" class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    {{ isLoadingPurchaseItems ? 'Carregando...' : 'Substituir Lista' }}
                  </button>
                  <button 
                    @click="loadPurchaseItems(purchase, false)"
                    :disabled="isLoadingPurchaseItems"
                    class="flex-1 bg-muted text-muted-foreground py-2 px-3 rounded-lg text-sm hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <div v-if="isLoadingPurchaseItems" class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    {{ isLoadingPurchaseItems ? 'Carregando...' : 'Combinar' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Detalhes da Compra -->
      <div v-if="showPurchaseDetails && selectedPurchase" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center items-start pt-10">
        <div class="w-full max-w-lg bg-card rounded-xl border border-border overflow-auto max-h-[80vh] p-4 m-4">
          <div class="flex items-center justify-between mb-4 border-b border-border pb-2">
            <h2 class="text-lg font-semibold">Detalhes da Compra</h2>
            <button @click="closePurchaseDetails" class="p-2 hover:bg-accent/10 rounded-lg">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <!-- Informações da compra -->
          <div class="mb-6">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-muted/20 rounded-lg p-3">
                <div class="text-sm text-muted-foreground mb-1">📅 Data da Compra</div>
                <div class="font-medium">{{ selectedPurchase.date }}</div>
              </div>
              <div class="bg-muted/20 rounded-lg p-3">
                <div class="text-sm text-muted-foreground mb-1">💰 Total Pago</div>
                <div class="font-bold text-primary text-lg">R$ {{ selectedPurchase.total.toFixed(2) }}</div>
              </div>
            </div>
            <div class="bg-muted/20 rounded-lg p-3">
              <div class="text-sm text-muted-foreground mb-1">📦 Quantidade de Itens</div>
              <div class="font-medium">{{ selectedPurchase.items }} itens comprados</div>
            </div>
          </div>

          <!-- Lista de itens -->
          <div v-if="selectedPurchaseItems.length > 0">
            <h3 class="font-semibold mb-3 text-foreground"> Itens Comprados</h3>
            <div class="space-y-2 max-h-60 overflow-y-auto">
              <div v-for="item in selectedPurchaseItems" :key="item.id" 
                   class="bg-muted/10 rounded-lg p-3 border border-border/50">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h4 class="font-medium">{{ item.name }}</h4>
                    <div class="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span v-if="item.category" class="bg-muted/30 px-2 py-0.5 rounded-full">{{ item.category }}</span>
                      <span>Qtd: {{ item.quantity }}</span>
                      <span>Unit: R$ {{ (item.price || 0).toFixed(2) }}</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-primary">R$ {{ ((item.price || 0) * (item.quantity || 1)).toFixed(2) }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Resumo -->
            <div class="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div class="flex justify-between items-center">
                <span class="font-medium text-primary">Total Calculado:</span>
                <span class="font-bold text-primary">
                  R$ {{ selectedPurchaseItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Caso não tenha itens detalhados -->
          <div v-else class="text-center py-8">
            <Package class="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p class="text-muted-foreground">Detalhes dos itens não disponíveis para esta compra.</p>
            <p class="text-sm text-muted-foreground mt-1">Apenas compras com a nova versão têm detalhes salvos.</p>
          </div>
        </div>
      </div>

      <!-- Total Manual Modal -->
      <div v-if="showTotalModal" class="fixed inset-0 z-50 bg-background/70 backdrop-blur flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-card rounded-xl border border-border p-6 shadow-lg">
          <h2 class="text-lg font-semibold mb-4">Inserir valor total da compra</h2>
          <input type="number" v-model.number="manualTotal" placeholder="R$ 0,00"
                 class="w-full px-3 py-2 border border-border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary" />
          <div class="flex gap-3">
            <button @click="confirmTotal" class="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90">Confirmar</button>
            <button @click="cancelTotal" class="flex-1 bg-muted text-muted-foreground py-2 rounded-lg hover:bg-accent">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 bg-background/70 backdrop-blur flex items-center justify-center p-4">
        <div class="w-full max-w-sm bg-card rounded-xl border border-border p-6 shadow-lg text-center">
          <h2 class="text-lg font-semibold mb-2">{{ successTitle }}</h2>
          <p class="mb-4">{{ successMessage }}</p>
          <button @click="showSuccessModal = false" class="bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 font-medium">Fechar</button>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div v-if="isLoadingPurchaseItems && !showStartModal && !showPurchaseOptions" class="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <div class="bg-card rounded-xl border border-border p-8 shadow-lg text-center">
          <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 class="text-lg font-semibold mb-2">Carregando itens...</h3>
          <p class="text-muted-foreground">Aguarde enquanto preparamos sua lista</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-card rounded-xl p-4 border border-border">
          <div class="flex items-center gap-2 mb-2">
            <Package class="w-4 h-4 text-muted-foreground" />
            <span class="text-sm text-muted-foreground">Total de Itens</span>
          </div>
          <div class="text-2xl font-bold">{{ shoppingList.length }}</div>
        </div>
        <div class="bg-card rounded-xl p-4 border border-border">
          <div class="flex items-center gap-2 mb-2">
            <DollarSign class="w-4 h-4 text-muted-foreground" />
            <span class="text-sm text-muted-foreground">Total Estimado</span>
          </div>
          <div class="text-2xl font-bold text-primary">R$ {{ totalValue.toFixed(2) }}</div>
        </div>
      </div>

      <!-- Add Item Form -->
      <div class="bg-card rounded-2xl p-4 border border-border/50 mb-6 shadow-sm">
        <!-- Mobile Layout (Stack) -->
        <div class="block sm:hidden space-y-4 mb-4">
          <input 
            v-model="newItem.name" 
            placeholder="Nome do produto" 
            class="w-full px-4 py-3.5 bg-input border border-border/60 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200" 
          />
          <div class="flex gap-3">
            <div class="flex-1">
              <input 
                v-model.number="newItem.price"
                type="number" 
                step="0.01" 
                placeholder="Preço (R$)" 
                class="w-full px-4 py-3.5 bg-input border border-border/60 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200" 
              />
            </div>
            <div class="w-24">
              <input 
                v-model.number="newItem.quantity"
                type="number" 
                min="1" 
                placeholder="Qtd" 
                class="w-full px-3 py-3.5 bg-input border border-border/60 rounded-2xl text-base text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200" 
              />
            </div>
          </div>
          <select 
            v-model="newItem.category" 
            class="w-full px-4 py-3.5 bg-input border border-border/60 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 appearance-none"
          >
            <option value="">Selecionar categoria</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        
        <!-- Desktop Layout (Grid) -->
        <div class="hidden sm:block mb-4">
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
            <input 
              v-model="newItem.name" 
              placeholder="Nome do produto" 
              class="sm:col-span-2 px-4 py-3 bg-input border border-border/60 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200" 
            />
            <input 
              v-model.number="newItem.price" 
              type="number" 
              step="0.01" 
              placeholder="Preço (R$)" 
              class="px-4 py-3 bg-input border border-border/60 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200" 
            />
            <input 
              v-model.number="newItem.quantity" 
              type="number" 
              min="1" 
              placeholder="Qtd" 
              class="px-4 py-3 bg-input border border-border/60 rounded-2xl text-base text-center focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200" 
            />
          </div>
          <select 
            v-model="newItem.category" 
            class="w-full px-4 py-3 bg-input border border-border/60 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 appearance-none"
          >
            <option value="">Selecionar categoria</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <button @click="addItem" class="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl text-base font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm">
          <Plus class="w-5 h-5 inline mr-2" /> Adicionar Item
        </button>
      </div>

      <!-- Shopping List -->
      <div class="space-y-2">
        <div v-for="item in filteredItems" :key="item.id" class="bg-card rounded-xl p-4 border border-border transition-all duration-200" :class="{ 'opacity-60': item.completed }">
          <div class="flex items-center gap-3">
            <button @click="toggleItem(item.id)" :class="['w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors', item.completed ? 'bg-primary border-primary text-primary-foreground' : 'border-border hover:border-primary']">
              <Check v-if="item.completed" class="w-4 h-4" />
            </button>
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <h3 class="font-medium" :class="{ 'line-through text-muted-foreground': item.completed }">{{ item.name }}</h3>
                <span class="text-primary font-bold">R$ {{ ((item.price ?? 0) * (item.quantity ?? 1)).toFixed(2) }}</span>
              </div>
              <div class="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span v-if="item.category" class="bg-muted/30 px-2 py-0.5 rounded-full">{{ item.category }}</span>
                <span>Qtd: {{ item.quantity ?? 1 }}</span>
                <span>Unit: R$ {{ (item.price ?? 0).toFixed(2) }}</span>
              </div>
            </div>
            <button @click="removeItem(item.id)" class="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredItems.length === 0" class="text-center py-12">
        <Package class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 class="text-lg font-medium mb-2">Nenhum item encontrado</h3>
      </div>
    </main>

    <!-- Bottom Actions -->
    <div class="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border p-4">
      <div class="container mx-auto flex gap-3">
        <button v-if="completedItems.length" @click="clearCompleted" class="flex-1 bg-muted text-muted-foreground py-3 rounded-lg font-medium hover:bg-accent transition-colors">Limpar Comprados</button>
        <button v-if="completedItems.length" @click="showTotalModal = true" class="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">Finalizar Compra</button>
      </div>
    </div>

    <!-- Modal Inserir Total -->
    <div v-if="showTotalModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-card w-full max-w-sm rounded-xl border border-border p-6 shadow-lg text-center">
        <h2 class="text-xl font-semibold mb-4">Finalizar Compra</h2>
        <p class="mb-4 text-muted-foreground">Informe o valor total da compra (opcional):</p>
        <input type="number" v-model.number="manualTotal" placeholder="R$ 0,00" class="w-full mb-4 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        <div class="flex gap-3">
          <button @click="confirmTotal" class="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors">Confirmar</button>
          <button @click="showTotalModal = false" class="flex-1 bg-muted text-muted-foreground py-2 rounded-lg hover:bg-accent transition-colors">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal Compra Finalizada -->
    <div class="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border p-4">
        <div class="container mx-auto flex gap-3">
          <button v-if="completedItems.length" @click="clearCompleted" class="flex-1 bg-muted text-muted-foreground py-3 rounded-lg font-medium hover:bg-accent transition-colors">Limpar Comprados</button>
          <button v-if="completedItems.length" @click="openTotalModal" class="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">Finalizar Compra</button>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, nextTick } from 'vue'
// Detecta ambiente de desenvolvimento
const isDev = import.meta.env.DEV;
import { 
  ShoppingCart, Plus, Check, Trash2, Package, DollarSign, 
  History, X, Sun, Moon, LogOut
} from 'lucide-vue-next'
import type { Item, Purchase } from '~/composables/useShoppingList'
import { useShoppingList } from '~/composables/useShoppingList'
import { useAuth, useClerk } from '@clerk/vue'

import { CHANGELOG } from '~/utils/changelog'
import ChangelogModalTest from '~/components/ChangelogModalTest.vue'

// Usar o changelog global
const changelog = CHANGELOG
const showChangelog = ref(false)

// Middleware de autenticação
definePageMeta({
  middleware: 'auth'
})

// Auth
const clerk = useClerk()
const { userId } = useAuth()

// Função de logout
const handleLogout = async () => {
  await clerk.value?.signOut()
  await navigateTo('/home')
}

// Composable
const {
  shoppingList,
  purchaseHistory,
  fetchItems,
  fetchHistory,
  addItem: apiAddItem,
  toggleItem: apiToggleItem,
  removeItem: apiRemoveItem,
  finalizePurchase: apiFinalizePurchase,
  getPurchaseItems
} = useShoppingList()

// UI state
const isDark = ref(typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false)
const userTheme = ref<'system' | 'manual'>("system")
const isTransitioning = ref(false)
const isCircleActive = ref(false)
const transitionPosition = ref({ x: 0, y: 0 })
const circleColor = ref('hsl(0 0% 100%)') // valor inicial qualquer
const themeBtn = ref<HTMLElement | null>(null)
const showHistory = ref(false)
const showStartModal = ref(false)
const activeFilter = ref('all')
const showTotalModal = ref(false)
const showSuccessModal = ref(false)
const showPurchaseDetails = ref(false)
const showPurchaseOptions = ref(false)
const selectedPurchase = ref<Purchase | null>(null)
const selectedPurchaseItems = ref<Item[]>([])
const isLoadingPurchaseItems = ref(false)
const manualTotal = ref<number | null>(null)
const successMessage = ref('')
const successTitle = ref('Compra finalizada!')

// Novo item
const newItem = reactive({
  name: '',
  price: undefined, // deixa vazio até digitar
  quantity: undefined, // deixa vazio até digitar
  category: ''
})

const categories = ['Grãos','Laticínios','Carnes','Frutas','Verduras','Limpeza','Higiene','Bebidas','Padaria','Congelados']

// Computed
const totalValue = computed(() =>
  shoppingList.value.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0)
)

const pendingItems = computed(() =>
  shoppingList.value.filter(item => !item.completed)
)

const completedItems = computed(() =>
  shoppingList.value.filter(item => item.completed)
)

const usedCategories = computed(() => {
  const cats = [...new Set(shoppingList.value.map(i => i.category).filter(Boolean))]
  return cats
})

const filteredItems = computed(() => {
  let items = shoppingList.value
  if (activeFilter.value === 'pending') items = items.filter(i => !i.completed)
  else if (activeFilter.value === 'completed') items = items.filter(i => i.completed)
  else if (activeFilter.value !== 'all') items = items.filter(i => i.category === activeFilter.value)
  return items.sort((a, b) => (a.completed !== b.completed ? a.completed ? 1 : -1 : (a.name ?? '').localeCompare(b.name ?? '')))
})

// Histórico agrupado
const groupedHistory = computed(() => {
  const map: Record<string, Purchase[]> = {}
  purchaseHistory.value.forEach(p => {
    const month = p.month ?? 'Indefinido'
    if (!map[month]) map[month] = []
    map[month].push(p)
  })
  return Object.keys(map).map(month => ({ month, purchases: map[month] }))
})

// Methods
const addItem = async () => {
  if (!newItem.name.trim()) return
  await apiAddItem({
    ...newItem,
    name: newItem.name.trim(),
    price: newItem.price || 0,
    quantity: newItem.quantity || 1
  })
  Object.assign(newItem, { name: '', price: undefined, category: '', quantity: undefined })
}

const toggleItem = async (id: number) => {
  const item = shoppingList.value.find(i => i.id === id)
  if (item) await apiToggleItem(id, !item.completed)
}

const removeItem = async (id: number) => await apiRemoveItem(id)

const clearCompleted = async () => {
  for (const item of completedItems.value) {
    await apiRemoveItem(item.id)
  }
  
  // Se a lista ficou vazia, mostrar modal de nova compra
  if (shoppingList.value.length === 0) {
    setTimeout(() => {
      showStartModal.value = true
    }, 500)
  }
}

// Total modal
const openTotalModal = () => showTotalModal.value = true
const cancelTotal = () => { showTotalModal.value = false; manualTotal.value = null }

const confirmTotal = async () => {
  if (completedItems.value.length === 0) return
  const total = manualTotal.value ?? completedItems.value.reduce((sum, i) => sum + ((i.price || 0)*(i.quantity||1)), 0)
  const itemsCount = completedItems.value.length
  
  // Pegar os IDs dos itens comprados
  const purchasedItemIds = completedItems.value.map(item => item.id)
  
  const res = await apiFinalizePurchase({ items: itemsCount, total, purchasedItemIds })
  showTotalModal.value = false
  manualTotal.value = null
  
  // Verificar se a lista ficou vazia após finalizar
  if (shoppingList.value.length === 0) {
    // Mostrar modal de nova compra após um pequeno delay
    setTimeout(() => {
      showStartModal.value = true
    }, 1500)
    openSuccessModal(`Compra finalizada! Total: R$ ${res.total.toFixed(2)} - Nova compra disponível!`)
  } else {
    openSuccessModal(`Compra finalizada! Total: R$ ${res.total.toFixed(2)}`)
  }
}

// Success modal
const openSuccessModal = (message: string, title: string = 'Compra finalizada!') => {
  successMessage.value = message
  successTitle.value = title
  showSuccessModal.value = true
}

// Purchase details modal
const openPurchaseDetails = async (purchase: Purchase) => {
  selectedPurchase.value = purchase
  showPurchaseDetails.value = true
  
  try {
    // Buscar itens da compra
    selectedPurchaseItems.value = await getPurchaseItems(purchase.id)
  } catch (error) {
    console.error('Erro ao buscar itens da compra:', error)
    selectedPurchaseItems.value = []
  }
}

const closePurchaseDetails = () => {
  showPurchaseDetails.value = false
  selectedPurchase.value = null
  selectedPurchaseItems.value = []
}

// Dark mode

function startThemeTransition(event: MouseEvent) {
  userTheme.value = 'manual'
  // Pega a posição do botão
  let x = 0, y = 0
  if (themeBtn.value) {
    const rect = themeBtn.value.getBoundingClientRect()
    x = rect.left + rect.width / 2 + window.scrollX
    y = rect.top + rect.height / 2 + window.scrollY
  } else if (event && event.clientX) {
    x = event.clientX
    y = event.clientY
  }
  // Define a cor do círculo ANTES de trocar o tema
  const nextIsDark = !isDark.value
  circleColor.value = nextIsDark ? 'hsl(240 10% 3.9%)' : 'hsl(0 0% 100%)'
  transitionPosition.value = { x, y }
  isTransitioning.value = true
  isCircleActive.value = false

  nextTick(() => {
    // Força um reflow para garantir que o overlay seja renderizado
    void document.body.offsetHeight

    // Inicia a expansão do círculo
    isCircleActive.value = true

    // Só troca o tema DEPOIS da animação do círculo (650ms)
    setTimeout(() => {
      isDark.value = !isDark.value
      document.documentElement.classList.toggle('dark', isDark.value)
      isTransitioning.value = false
      isCircleActive.value = false
    }, 650)
  })
}

const circleAnimStyle = computed((): Record<string, string> => {
  const visible = isTransitioning.value || isCircleActive.value
  if (typeof window === 'undefined') return {}
  
  const { x, y } = transitionPosition.value
  const vw = window.innerWidth
  const vh = window.innerHeight
  
  // Calcula o raio máximo baseado na distância para os cantos da tela
  // Exatamente como no código do Telegram
  const corners = [
    { x: 0, y: 0 },
    { x: vw, y: 0 },
    { x: vw, y: vh },
    { x: 0, y: vh }
  ]
  const maxDist = Math.max(...corners.map(corner => 
    Math.sqrt(Math.pow(corner.x - x, 2) + Math.pow(corner.y - y, 2))
  ))
  
  const size = 60
  const scale = isCircleActive.value ? (maxDist / (size/2)) + 0.5 : 0
  
  // A cor do círculo é definida no momento do clique, ANTES da troca do tema
  // Adiciona transparência para não cobrir totalmente o conteúdo
  let bg = circleColor.value
  if (bg.startsWith('hsl(')) {
    // Converte para hsl com alpha
    bg = bg.replace('hsl(', 'hsl(').replace(')', ' / 0.85)')
  }
  
  return {
    position: 'absolute',
    left: `${x - size/2}px`,
    top: `${y - size/2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: bg,
    opacity: visible ? '1' : '0',
    transform: `scale(${scale})`,
    transition: isCircleActive.value 
      ? 'transform 650ms cubic-bezier(0.4, 0.0, 0.2, 1)' 
      : 'opacity 0ms',
    transformOrigin: 'center',
    zIndex: '9999',
    pointerEvents: 'none',
    willChange: 'transform'
  }
})

// Start modal functions
const startManualShopping = () => {
  showStartModal.value = false
}

const useLastPurchase = async () => {
  if (purchaseHistory.value.length === 0) {
    openSuccessModal('Nenhuma compra anterior encontrada. Iniciando compra manual.', 'Aviso')
    showStartModal.value = false
    return
  }
  
  isLoadingPurchaseItems.value = true
  
  try {
    const lastPurchase = purchaseHistory.value[0]
    if (lastPurchase) {
      await loadPurchaseItems(lastPurchase)
      showStartModal.value = false
      // Título personalizado para reutilização
      openSuccessModal(`${shoppingList.value.length} itens carregados para nova compra!`, 'Lista carregada!')
    }
  } finally {
    isLoadingPurchaseItems.value = false
  }
}

const choosePurchaseToReuse = () => {
  showStartModal.value = false
  showPurchaseOptions.value = true
}

const loadPurchaseItems = async (purchase: Purchase, replaceList = true) => {
  isLoadingPurchaseItems.value = true
  
  try {
    const items = await getPurchaseItems(purchase.id)
    
    // Se replaceList for true, limpar lista atual
    if (replaceList) {
      for (const currentItem of shoppingList.value) {
        await apiRemoveItem(currentItem.id)
      }
    }
    
    // Adicionar itens como não comprados
    let loadedCount = 0
    for (const item of items) {
      // Verificar se já existe item similar na lista atual (evita duplicação)
      const existingItem = shoppingList.value.find(
        existing => existing.name.toLowerCase() === item.name.toLowerCase() && 
                   existing.category === item.category
      )
      
      if (!existingItem) {
        await apiAddItem({
          name: item.name,
          price: item.price || 0,
          quantity: item.quantity || 1,
          category: item.category
        })
        loadedCount++
      }
    }
    
    showPurchaseOptions.value = false
    const action = replaceList ? 'carregados' : 'adicionados'
    const title = replaceList ? 'Lista substituída!' : 'Itens adicionados!'
    openSuccessModal(`${loadedCount} itens ${action} para nova compra!`, title)
  } catch (error) {
    console.error('Erro ao carregar itens da compra:', error)
    openSuccessModal('Erro ao carregar itens. Tente novamente.', 'Erro')
  } finally {
    isLoadingPurchaseItems.value = false
  }
}

const cancelPurchaseSelection = () => {
  showPurchaseOptions.value = false
  showStartModal.value = true
}

// Lifecycle
let themeMediaQuery: MediaQueryList | null = null

onMounted(async () => {
  // Listener para mudanças do sistema operacional
  if (typeof window !== 'undefined') {
    themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = () => {
      if (userTheme.value === 'system') {
        const dark = themeMediaQuery!.matches
        isDark.value = dark
        document.documentElement.classList.toggle('dark', dark)
      }
    }
    themeMediaQuery.addEventListener('change', updateTheme)
    // Inicializa
    updateTheme()
  }
  // Set --vh custom property for mobile height
  const setVh = () => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
  };
  window.addEventListener('resize', setVh);
  setVh(); // Set on initial load


  await fetchItems()
  await fetchHistory()

  // Se a lista está vazia, mostrar o modal inicial
  if (shoppingList.value.length === 0) {
    showStartModal.value = true
  } else {
    showStartModal.value = false
  }

  // Mostra changelog apenas na index (após login)
  const lastVersion = localStorage.getItem('changelogVersion')
  if (lastVersion !== CHANGELOG.version) {
    showChangelog.value = true
    localStorage.setItem('changelogVersion', CHANGELOG.version)
  }
})
</script>

<style>
/* Botão de debug no topo do app (header) */
.debug-btn-app {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #f3f4f6;
  color: #222;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: background 0.2s;
}
.debug-btn-app:hover {
  background: #e5e7eb;
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

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles */
input:focus, select:focus, button:focus {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
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

.bg-accent {
  background-color: hsl(var(--accent));
}

.text-destructive {
  color: hsl(var(--destructive));
}

.bg-destructive\/10 {
  background-color: hsl(var(--destructive) / 0.1);
}

.theme-switch-circle {
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
</style>

<style scoped>
/* Scrollbar personalizada para o modal de changelog */
.scrollbar-custom {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground)) transparent;
}
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}
.scrollbar-custom::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: hsl(var(--muted-foreground));
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: content-box;
  min-height: 30px;
}
.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--primary));
}

/* Theme transition animation */
.theme-switch-circle {
  will-change: transform;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
</style>