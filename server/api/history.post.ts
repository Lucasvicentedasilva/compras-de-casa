
import { db } from '../../server/db/client'
import { requireAuth } from '../../server/utils/auth'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event)

  const body = await readBody(event)
  const { items, total, purchasedItemIds } = body

  if (typeof total !== 'number' || !items) {
    throw new Error('Total ou items inválidos')
  }

  const today = new Date()
  const dateStr = today.toLocaleDateString('pt-BR')
  const month = today.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  // Buscar os dados completos dos itens antes de deletá-los
  let purchasedItemsData = null
  if (purchasedItemIds && Array.isArray(purchasedItemIds) && purchasedItemIds.length > 0) {
    const placeholders = purchasedItemIds.map(() => '?').join(',')
    const itemsResult = await db.execute(
      `SELECT * FROM shopping_list WHERE id IN (${placeholders}) AND user_id = ?`,
      [...purchasedItemIds, userId]
    )

    // Salvar os dados completos em JSON
    purchasedItemsData = JSON.stringify(itemsResult.rows)
  }

  const insertResult = await db.execute(
    'INSERT INTO purchase_history (date, total, items, month, user_id, purchased_items) VALUES (?, ?, ?, ?, ?, ?)',
    [dateStr, total, items, month, userId, purchasedItemsData]
  )

  // Deletar itens comprados da shopping_list APÓS salvar os dados completos
  if (purchasedItemIds && Array.isArray(purchasedItemIds) && purchasedItemIds.length > 0) {
    const placeholders = purchasedItemIds.map(() => '?').join(',')
    await db.execute(
      `DELETE FROM shopping_list WHERE id IN (${placeholders}) AND user_id = ?`,
      [...purchasedItemIds, userId]
    )

  }

  // pega o último id inserido de forma segura
  const insertedId = insertResult.lastInsertRowid ? Number(insertResult.lastInsertRowid) : null

  if (!insertedId) {
    return {
      id: null,
      date: dateStr,
      total,
      items,
      month,
      user_id: userId
    }
  }

  const inserted = await db.execute(
    'SELECT * FROM purchase_history WHERE id = ?',
    [insertedId]
  )

  const record = inserted.rows[0]

  // garante que retorna pelo menos algo
  return record ?? {
    id: insertedId,
    date: dateStr,
    total,
    items,
    month,
    user_id: userId
  }
})