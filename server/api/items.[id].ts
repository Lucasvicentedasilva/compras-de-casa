import { db } from '../../server/db/client'
import { requireAuth } from '../../server/utils/auth'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event)

  // Pega os params de forma segura
  const params = getRouterParams(event)
  const id = params.id ? Number(params.id) : null

  if (!id) {
    throw createError({ statusCode: 400, message: 'ID inválido' })
  }

  await db.execute(
    'DELETE FROM shopping_list WHERE id = ? AND user_id = ?',
    [id, userId]
  )

  return { success: true }
})