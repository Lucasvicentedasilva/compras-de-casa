# Lista de Compras - App Familiar

Um aplicativo moderno para gerenciar listas de compras em família, desenvolvido com Nuxt 3, Turso SQLite e Clerk Auth.

## ✨ Recursos

- 🛒 **Listas Inteligentes**: Organize compras com categorias, preços e quantidades
- 📱 **Família Conectada**: Todos podem acessar e editar a mesma lista
- 📊 **Histórico Completo**: Reutilize compras anteriores
- 💰 **Controle de Gastos**: Monitore seus gastos com relatórios detalhados
- 🌙 **Tema Escuro**: Interface moderna e confortável

## 🚀 Deploy para Produção

### 1. Preparação
```bash
# Limpar logs de desenvolvimento
npm run clean:logs

# Build otimizado para produção
npm run build:production
```

### 2. Variáveis de Ambiente
Copie `.env.example` para `.env` e configure:
- `TURSO_DATABASE_URL`: URL do banco Turso
- `TURSO_AUTH_TOKEN`: Token de autenticação do Turso
- `CLERK_PUBLISHABLE_KEY`: Chave pública do Clerk
- `CLERK_SECRET_KEY`: Chave secreta do Clerk

### 3. Deploy
O projeto está otimizado para deploy em:
- **Vercel**: Deploy automático via GitHub
- **Netlify**: Suporte completo a Nuxt 3
- **DigitalOcean**: App Platform compatível

## 🛠 Desenvolvimento

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build local
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura do Projeto

```
app/
├── components/         # Componentes Vue reutilizáveis
├── composables/       # Lógica de estado compartilhada
├── middleware/        # Middleware de autenticação
├── pages/            # Páginas da aplicação
├── utils/            # Utilitários (logger, etc)
└── assets/css/       # Estilos Tailwind

server/
└── api/              # API Routes do Nuxt

scripts/
├── clean-logs.js     # Remove logs de desenvolvimento
└── database/         # Scripts de migração do banco
```

## 🔒 Segurança

- Autenticação via **Clerk** com suporte a múltiplos usuários
- Middleware de proteção de rotas
- Validação de dados no servidor
- Logs de erro mantidos para produção

---

**Desenvolvido com ❤️ por [Lucas Silva](https://lucassilvadev.vercel.app/)**
- 🌐 [Portfólio](https://lucassilvadev.vercel.app/)
- 💻 [GitHub](https://github.com/Lucasvicentedasilva)
