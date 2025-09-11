import { createClient } from '@libsql/client'
import 'dotenv/config'

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN
})

async function cleanOrphanItems() {
    try {
        console.log('🔄 Limpando itens órfãos (sem user_id)...')

        // Primeiro, vamos ver quantos itens órfãos existem
        const orphanCount = await db.execute(
            'SELECT COUNT(*) as count FROM shopping_list WHERE user_id IS NULL'
        )

        const count = orphanCount.rows[0]?.count || 0
        console.log(`📊 Encontrados ${count} itens órfãos no banco`)

        if (count === 0) {
            console.log('✅ Nenhum item órfão encontrado!')
            return
        }

        // Mostrar alguns exemplos dos itens órfãos
        const examples = await db.execute(
            'SELECT id, name, price, quantity, category FROM shopping_list WHERE user_id IS NULL LIMIT 5'
        )

        console.log('🔍 Exemplos de itens órfãos:')
        examples.rows.forEach((item) => {
            console.log(`   - ID: ${item.id}, Nome: "${item.name || 'SEM NOME'}", Preço: R$ ${item.price || 0}, Categoria: ${item.category || 'N/A'}`)
        })

        // Deletar todos os itens órfãos
        const deleteResult = await db.execute(
            'DELETE FROM shopping_list WHERE user_id IS NULL'
        )

        console.log(`✅ ${count} itens órfãos removidos com sucesso!`)
        console.log('🎉 Banco de dados limpo!')

    } catch (error) {
        console.error('❌ Erro ao limpar itens órfãos:', error)
        process.exit(1)
    } finally {
        await db.close()
    }
}

cleanOrphanItems()