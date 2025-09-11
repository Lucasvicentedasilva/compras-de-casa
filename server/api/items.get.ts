import { db } from '../../server/db/client'
import { requireAuth } from '../../server/utils/auth'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event)

  const result = await db.execute(
    'SELECT * FROM shopping_list WHERE user_id = ? ORDER BY id DESC',
    [userId]
  )

  return result.rows || []
})
