import { db } from '../../../server/db/client'
import { requireAuth } from '../../../server/utils/auth'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event)
  const { id } = event.context.params || {}
  if (!id) throw createError({ statusCode: 400, message: 'ID é obrigatório' })

  const method = event.node.req.method

  switch (method) {
    case 'PATCH': {
      const { completed } = await readBody(event)
      await db.execute(
        'UPDATE shopping_list SET completed = ? WHERE id = ? AND user_id = ?',
        [completed ? 1 : 0, id, userId]
      )
      return { success: true, id, completed }
    }

    case 'DELETE': {
      await db.execute(
        'DELETE FROM shopping_list WHERE id = ? AND user_id = ?',
        [id, userId]
      )
      return { success: true, id }
    }

    default:
      throw createError({ statusCode: 405, message: `Método ${method} não permitido` })
  }
})