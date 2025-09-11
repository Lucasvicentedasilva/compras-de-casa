import { readFileSync, writeFileSync } from 'fs'
import { globSync } from 'glob'

console.log('🧹 Removendo logs de desenvolvimento...')

// Padrões de arquivos para limpar (excluindo scripts e testes)
const patterns = [
    'app/**/*.{ts,vue,js}',
    'server/**/*.{ts,js}',
    '!scripts/**/*',
    '!**/*.test.*',
    '!**/*.spec.*'
]

// Padrões de logs para remover
const logPatterns = [
    /console\.log\([^)]*\)\s*;?\s*$/gm,
    /console\.debug\([^)]*\)\s*;?\s*$/gm,
    /console\.info\([^)]*\)\s*;?\s*$/gm,
    // Manter console.error e console.warn para produção
]

let filesProcessed = 0
let logsRemoved = 0

try {
    const files = globSync(patterns, { ignore: ['node_modules/**', '.nuxt/**'] })

    for (const file of files) {
        try {
            const content = readFileSync(file, 'utf8')
            let newContent = content
            let fileLogsRemoved = 0

            // Aplicar cada padrão de remoção
            for (const pattern of logPatterns) {
                const matches = newContent.match(pattern)
                if (matches) {
                    fileLogsRemoved += matches.length
                    newContent = newContent.replace(pattern, '')
                }
            }

            // Remover linhas vazias extras
            newContent = newContent.replace(/\n\s*\n\s*\n/g, '\n\n')

            if (fileLogsRemoved > 0) {
                writeFileSync(file, newContent)
                console.log(`✅ ${file}: ${fileLogsRemoved} logs removidos`)
                filesProcessed++
                logsRemoved += fileLogsRemoved
            }
        } catch (error) {
            console.error(`❌ Erro ao processar ${file}:`, error.message)
        }
    }

    console.log(`\n🎉 Limpeza concluída!`)
    console.log(`📁 Arquivos processados: ${filesProcessed}`)
    console.log(`🗑️  Logs removidos: ${logsRemoved}`)
    console.log(`\n💡 Mantidos: console.error() e console.warn() para produção`)

} catch (error) {
    console.error('❌ Erro durante a limpeza:', error)
    process.exit(1)
}