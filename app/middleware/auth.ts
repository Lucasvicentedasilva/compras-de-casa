import { useAuth } from '@clerk/vue'

export default defineNuxtRouteMiddleware((to) => {
    const { userId } = useAuth()

    // Se não estiver logado, redirecionar para home
    // Verifica tanto no servidor quanto no cliente
    if (!userId.value) {
        return navigateTo('/home', { redirectCode: 302 })
    }
})