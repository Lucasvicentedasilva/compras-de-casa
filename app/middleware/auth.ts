import { useAuth } from '@clerk/vue'

export default defineNuxtRouteMiddleware((to) => {
    // Verificar se está no lado do cliente
    if (process.client) {
        const { userId } = useAuth()

        // Se não estiver logado, redirecionar para home
        if (!userId.value) {
            return navigateTo('/home')
        }
    }
})