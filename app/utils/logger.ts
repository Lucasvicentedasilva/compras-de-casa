// Utilitário para logging condicional baseado no ambiente
export const logger = {
    log: (...args: any[]) => {
        if (process.dev) {

        }
    },

    error: (...args: any[]) => {
        // Erros sempre são logados, mesmo em produção
        console.error(...args)
    },

    warn: (...args: any[]) => {
        if (process.dev) {
            console.warn(...args)
        }
    },

    info: (...args: any[]) => {
        if (process.dev) {

        }
    },

    debug: (...args: any[]) => {
        // Debug logs apenas em desenvolvimento
        if (process.dev) {

        }
    }
}