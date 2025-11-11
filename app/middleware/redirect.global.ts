import { useAuth } from '@clerk/vue'

export default defineNuxtRouteMiddleware((to) => {
    // Só executa para a rota raiz
    if (to.path === '/') {
        const { userId } = useAuth()

        // Se não estiver autenticado, redireciona para /home
        if (!userId.value) {
            return navigateTo('/home', { redirectCode: 302 })
        }
    }
})
