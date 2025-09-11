import { db } from '../../server/db/client'
import { requireAuth } from '../../server/utils/auth'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event)
  const { id, completed } = await readBody(event)

  await db.execute(
    'UPDATE shopping_list SET completed = ? WHERE id = ? AND user_id = ?',
    [completed ? 1 : 0, id, userId]
  )

  return { success: true }
})