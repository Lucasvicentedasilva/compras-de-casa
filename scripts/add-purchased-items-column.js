import { createClient } from '@libsql/client'
import 'dotenv/config'

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
})

async function addPurchasedItemsColumn() {
    try {
        console.log('🔄 Adicionando coluna purchased_items...')

        // Verificar se a coluna já existe
        const tableInfo = await db.execute("PRAGMA table_info(purchase_history)")
        const hasPurchasedItems = tableInfo.rows.some(row => row.name === 'purchased_items')

        if (hasPurchasedItems) {
            console.log('✅ Coluna purchased_items já existe na tabela purchase_history')
            return
        }

        // Adicionar a coluna purchased_items (JSON com IDs dos itens)
        await db.execute(`
      ALTER TABLE purchase_history 
      ADD COLUMN purchased_items TEXT
    `)

        console.log('✅ Coluna purchased_items adicionada com sucesso!')
        console.log('📊 Esta coluna armazenará os IDs dos itens comprados em formato JSON')

    } catch (error) {
        console.error('❌ Erro ao adicionar coluna:', error)
        process.exit(1)
    } finally {
        await db.close()
    }
}

addPurchasedItemsColumn()