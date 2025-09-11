import { db } from '../../server/db/client'
import { requireAuth } from '../../server/utils/auth'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event)
  const body = await readBody(event)
  let { name, price, quantity = 1, category } = body

  // Validação do nome
  if (!name || !name.trim()) {
    throw new Error('O nome do item é obrigatório')
  }
  name = name.trim()

  // Price opcional, default 0
  if (typeof price !== 'number') {
    price = 0
  }

  const res = await db.execute(
    'INSERT INTO shopping_list (name, price, quantity, category, completed, user_id) VALUES (?, ?, ?, ?, 0, ?)',
    [name, price, quantity, category, userId]
  )

  // Buscar o item recém-inserido pelo ID
  const insertedId = res.lastInsertRowid ? Number(res.lastInsertRowid) : null
  if (!insertedId) throw new Error('Erro ao inserir o item')

  const insertedItem = await db.execute(
    'SELECT * FROM shopping_list WHERE id = ?',
    [insertedId]
  )

  return insertedItem.rows[0] // retorna o item completo
})