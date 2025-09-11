import { ref } from 'vue'

export interface Item {
  id: number
  name: string
  price?: number
  quantity: number
  category?: string
  completed: boolean
}

export interface Purchase {
  id: number
  date: string
  month: string
  items: number
  total: number
  user_id: number
}

export const useShoppingList = () => {
  const shoppingList = ref<Item[]>([])
  const purchaseHistory = ref<Purchase[]>([])

  const fetchItems = async () => {
    const res = await $fetch<Item[]>('/api/items')
    shoppingList.value = res || []
  }

  const fetchHistory = async () => {
    const res = await $fetch<Purchase[]>('/api/history')
    purchaseHistory.value = res || []
  }

  const addItem = async (item: Omit<Item, 'id' | 'completed'>) => {
    const res = await $fetch<Item>('/api/items', { method: 'POST', body: item })
    shoppingList.value.push(res)
  }

  const toggleItem = async (id: number, completed: boolean) => {
    await $fetch(`/api/items/${id}`, { method: 'PATCH', body: { completed } })
    const item = shoppingList.value.find(i => i.id === id)
    if (item) item.completed = completed
  }

  const removeItem = async (id: number) => {
    await $fetch(`/api/items/${id}`, { method: 'DELETE' })
    shoppingList.value = shoppingList.value.filter(i => i.id !== id)
  }

  const finalizePurchase = async (data: { items: number; total: number; purchasedItemIds: number[] }) => {
    const res = await $fetch<Purchase>('/api/history', {
      method: 'POST',
      body: data
    })
    // Atualiza histórico local
    purchaseHistory.value.unshift(res)
    // Recarregar a lista do servidor para sincronizar
    await fetchItems()
    return res
  }

  const getPurchaseItems = async (purchaseId: number): Promise<Item[]> => {
    try {
      const res = await $fetch<Item[]>(`/api/history/items/${purchaseId}`)
      return res || []
    } catch (error) {
      console.error('[FRONTEND] Erro ao buscar itens:', error)
      return []
    }
  }

  return {
    shoppingList,
    purchaseHistory,
    fetchItems,
    fetchHistory,
    addItem,
    toggleItem,
    removeItem,
    finalizePurchase,
    getPurchaseItems
  }
}
