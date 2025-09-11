import { H3Event } from 'h3'

export function requireAuth(event: H3Event) {
  const { userId } = event.context.auth()

  if (!userId) {
    throw createError({ statusCode: 401, message: 'Usuário não autenticado' })
  }

  return userId
}