// Script simples para criar dados de teste
const items = [
    { name: "Arroz", price: 15.50, quantity: 2, category: "Grãos" },
    { name: "Feijão", price: 8.90, quantity: 1, category: "Grãos" },
    { name: "Leite", price: 4.25, quantity: 3, category: "Laticínios" }
]

// Simulação de como os dados seriam salvos
const purchaseData = {
    items: items.length,
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    purchased_items: JSON.stringify(items.map((item, index) => ({ id: index + 1000, ...item, completed: true })))
}

console.log("Dados de exemplo para inserir:")
console.log("Total de itens:", purchaseData.items)
console.log("Total da compra:", purchaseData.total)
console.log("Items JSON:", purchaseData.purchased_items)

// SQL que poderia ser executado:
console.log("\nSQL para inserir:")
console.log(`INSERT INTO purchase_history (date, month, items, total, user_id, purchased_items) VALUES ('2024-01-15', 'Janeiro', ${purchaseData.items}, ${purchaseData.total}, 1, '${purchaseData.purchased_items}');`)