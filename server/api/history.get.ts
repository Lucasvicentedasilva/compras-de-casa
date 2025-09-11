
import { db } from '../../server/db/client'
import { requireAuth } from '../../server/utils/auth'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event)

  const res = await db.execute(
    'SELECT * FROM purchase_history WHERE user_id = ? ORDER BY id DESC',
    [userId]
  )

  return res.rows
})