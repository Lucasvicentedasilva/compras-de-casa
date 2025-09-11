import { H3Event } from 'h3'
import { getAuth } from '@clerk/nuxt/server'

export function requireAuth(event: H3Event) {
  const { userId } = getAuth(event)

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Usuário não autenticado' })
  }

  return userId
}