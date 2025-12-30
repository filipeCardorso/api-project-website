# API Project Website

Site completo para o API Project com autenticacao, dashboard do usuario e painel admin.

## Stack Tecnologico

| Categoria | Tecnologia | Versao |
|-----------|------------|--------|
| Framework | Next.js | 16+ |
| Linguagem | TypeScript | 5.x |
| Estilo | TailwindCSS | 4.x |
| Componentes | Radix UI | - |
| Icones | Lucide React | - |
| Animacoes | Framer Motion | - |
| Autenticacao | JWT + Context API | - |

---

## Status do Projeto

### Concluido

- [x] Criar projeto Next.js com create-next-app
- [x] Instalar dependencias (Radix, Lucide, Framer Motion)
- [x] Configurar utils.ts e tema Tailwind
- [x] Criar componentes UI base (10)
- [x] Criar componentes de layout (4)
- [x] Criar dados mockados (6)
- [x] Criar componentes da landing (8)
- [x] Criar componentes de pricing (5)
- [x] Criar componentes shared (3)
- [x] Criar paginas (9)

### Concluido Recentemente

- [x] Configurar SEO (robots.txt, sitemap.xml)
- [x] Build do projeto (sem erros!)
- [x] Corrigir warning `key` prop no ComparePlansTable
- [x] Teste completo de todas as paginas (zero erros no console)
- [x] Implementar tema Dark Mode (toggle no header)
- [x] Corrigir Button `asChild` com Radix Slot (icones funcionando)
- [x] Sistema de autenticacao completo (login, registro, logout)
- [x] AuthContext com JWT, role e isAdmin
- [x] Dashboard do usuario (/dashboard)
- [x] Portal de privacidade LGPD (/account/privacy)
- [x] Painel administrativo completo (/admin)
  - [x] Dashboard admin com metricas
  - [x] Gerenciamento de usuarios
  - [x] Logs de auditoria com filtros
  - [x] Incidentes de seguranca (Art. 48 LGPD)
  - [x] Politicas de retencao de dados
- [x] Header/Mobile-nav com link Admin para admins
- [x] Cookie Consent Banner (LGPD)
- [x] Politica de Privacidade (/privacy-policy)
- [x] Politica de Cookies (/cookie-policy)

### Pendente

- [ ] Configurar dominio personalizado (opcional)
- [ ] Migrar tokens para HTTP-Only Cookies (seguranca)

---

## Estrutura do Projeto

```
api-project-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout com Header/Footer
│   │   ├── page.tsx                # Landing page
│   │   ├── globals.css             # Tema Tailwind
│   │   ├── pricing/page.tsx        # Pagina de pricing
│   │   ├── developer/page.tsx      # Developer Hub
│   │   ├── status/page.tsx         # Status page (fetch API real)
│   │   ├── security/page.tsx       # Pagina de seguranca
│   │   ├── changelog/page.tsx      # Changelog
│   │   ├── login/page.tsx          # Login funcional
│   │   ├── signup/page.tsx         # Signup funcional
│   │   ├── dashboard/page.tsx      # Dashboard do usuario
│   │   ├── privacy-policy/page.tsx # Politica de Privacidade LGPD
│   │   ├── cookie-policy/page.tsx  # Politica de Cookies
│   │   ├── account/
│   │   │   └── privacy/page.tsx    # Portal de privacidade usuario
│   │   └── admin/                  # Painel administrativo
│   │       ├── layout.tsx          # Layout admin com sidebar
│   │       ├── page.tsx            # Dashboard admin
│   │       ├── users/page.tsx      # Gerenciamento usuarios
│   │       ├── audit-logs/page.tsx # Logs de auditoria
│   │       ├── security-incidents/page.tsx  # Incidentes
│   │       └── data-retention/page.tsx      # Retencao dados
│   ├── components/
│   │   ├── ui/                     # Componentes base (10)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── select.tsx
│   │   ├── layout/                 # Layout components (4)
│   │   │   ├── container.tsx
│   │   │   ├── header.tsx          # Com link Admin para admins
│   │   │   ├── mobile-nav.tsx      # Com link Admin para admins
│   │   │   └── footer.tsx
│   │   ├── landing/                # Landing components (8)
│   │   ├── pricing/                # Pricing components (5)
│   │   ├── shared/                 # Shared components (4)
│   │   │   ├── status-widget.tsx
│   │   │   ├── code-block.tsx
│   │   │   ├── animated-counter.tsx
│   │   │   └── cookie-consent.tsx  # Banner LGPD
│   │   ├── theme-provider.tsx      # Context para tema dark/light
│   │   └── theme-toggle.tsx        # Botao toggle Sun/Moon
│   ├── contexts/
│   │   └── auth-context.tsx        # Autenticacao JWT + role
│   ├── data/                       # Dados mockados (6)
│   └── lib/
│       ├── utils.ts                # cn() helper
│       └── cookies.ts              # Utilidades cookies
├── public/
├── .env.local                      # NEXT_PUBLIC_API_URL
├── package.json
└── CLAUDE.md
```

---

## Paginas

| Rota | Descricao | Status |
|------|-----------|--------|
| `/` | Landing page completa | Criada |
| `/pricing` | Pricing com seletores | Criada |
| `/developer` | Developer Hub | Criada |
| `/status` | Status page (fetch real) | Criada |
| `/security` | Seguranca | Criada |
| `/changelog` | Changelog | Criada |
| `/login` | Login funcional (JWT) | Criada |
| `/signup` | Signup funcional | Criada |
| `/dashboard` | Dashboard do usuario | Criada |
| `/privacy-policy` | Politica de Privacidade LGPD | Criada |
| `/cookie-policy` | Politica de Cookies | Criada |
| `/account/privacy` | Portal de privacidade (Art. 18) | Criada |
| `/admin` | Dashboard administrativo | Criada |
| `/admin/users` | Gerenciamento de usuarios | Criada |
| `/admin/audit-logs` | Logs de auditoria | Criada |
| `/admin/security-incidents` | Incidentes de seguranca | Criada |
| `/admin/data-retention` | Politicas de retencao | Criada |

---

## Componentes Criados

### UI Base (10)
- `button.tsx` - Botoes com variantes
- `card.tsx` - Cards com header, content, footer
- `badge.tsx` - Badges com variantes
- `input.tsx` - Input de formulario
- `tabs.tsx` - Tabs com Radix
- `accordion.tsx` - Accordion com Radix
- `slider.tsx` - Slider com Radix
- `switch.tsx` - Toggle switch com Radix
- `dialog.tsx` - Modal dialog com Radix
- `select.tsx` - Select nativo

### Layout (4)
- `container.tsx` - Container responsivo
- `header.tsx` - Header fixo com navegacao
- `mobile-nav.tsx` - Menu mobile
- `footer.tsx` - Footer com links

### Landing (8)
- `hero.tsx` - Hero section com CTAs
- `badge-cloud.tsx` - Badges de credibilidade
- `how-it-works.tsx` - 3 passos
- `feature-grid.tsx` - Grid 3x2 de features
- `dev-snippets-tabs.tsx` - Tabs com code snippets
- `pricing-preview.tsx` - Preview de 3 planos
- `faq-short.tsx` - FAQ curta
- `cta-section.tsx` - CTA final

### Pricing (5)
- `pricing-selectors.tsx` - B2C/B2B, Mensal/Anual, Slider
- `pricing-cards.tsx` - Cards de planos
- `add-ons.tsx` - Cards de add-ons
- `compare-plans-table.tsx` - Tabela comparativa
- `pricing-faq.tsx` - FAQ de pricing

### Shared (3)
- `status-widget.tsx` - Widget de status (fetch real)
- `code-block.tsx` - Bloco de codigo com copy
- `animated-counter.tsx` - Contador animado

---

## Dados Mockados

### plans.ts
- 3 planos: Free (R$0), Pro (R$29/mes), Business (R$99/mes)
- Requests tiers: 10k, 100k, 500k, 2M

### features.ts
- 6 features principais da API

### snippets.ts
- Snippets para 4 endpoints (Register, Login, Refresh, List Users)
- Linguagens: cURL, JavaScript, Python
- Lista completa de 15 endpoints

### faqs.ts
- FAQs da landing (4 perguntas)
- FAQs de pricing (6 perguntas)

### add-ons.ts
- 5 add-ons: Retencao, IP Allowlist, Webhooks, Ambiente Extra, Suporte

### changelog-entries.ts
- 3 releases mockadas (1.0.0, 1.1.0, 1.2.0)

---

## Comandos

```bash
# Instalar dependencias
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Lint
npm run lint
```

---

## API Target

- **Producao**: https://api-project-gules.vercel.app
- **Health**: https://api-project-gules.vercel.app/api/health
- **Docs**: https://api-project-gules.vercel.app/docs

---

## Proximos Passos

1. Rodar `npm run dev` e verificar se tudo funciona
2. Corrigir possiveis erros de TypeScript
3. Criar `robots.txt` e `sitemap.xml`
4. Testar responsividade
5. Deploy na Vercel
6. Configurar dominio personalizado (opcional)

---

## Notas

- O projeto usa TailwindCSS v4 com CSS nativo (@theme)
- Nao usa tailwind.config.ts (configuracao via CSS)
- Status page faz fetch cross-origin para API real
- Login/Signup conectam ao backend real (JWT)
- **Theme**: Dark/Light mode com toggle no header
  - Persistencia em localStorage
  - Detecta preferencia do sistema
  - Variaveis CSS em `globals.css` (`:root` e `.dark`)

---

## Autenticacao

### AuthContext (`src/contexts/auth-context.tsx`)

Fornece estado de autenticacao para toda a aplicacao.

**Interface User:**
```typescript
interface User {
  id: number
  name: string
  email: string
  role: "user" | "admin"
  createdAt: string
}
```

**Propriedades expostas:**
- `user` - Dados do usuario logado (ou null)
- `isAuthenticated` - Boolean
- `isAdmin` - Boolean (user?.role === "admin")
- `isLoading` - Boolean (carregando estado inicial)
- `login(email, password)` - Faz login
- `register(name, email, password)` - Registra usuario
- `logout()` - Desloga
- `getToken()` - Retorna access token (para requests)

**Armazenamento:**
- `localStorage.accessToken` - JWT (15min)
- `localStorage.refreshToken` - UUID (7 dias)
- `localStorage.user` - JSON serializado

### Rotas Protegidas

| Rota | Requer Auth | Requer Admin |
|------|-------------|--------------|
| `/dashboard` | Sim | Nao |
| `/account/*` | Sim | Nao |
| `/admin/*` | Sim | Sim |

---

## Painel Admin (`/admin`)

### Layout

Layout com sidebar fixa contendo navegacao:
- Dashboard (metricas gerais)
- Usuarios (CRUD, roles)
- Logs de Auditoria (Art. 37 LGPD)
- Incidentes de Seguranca (Art. 48 LGPD)
- Retencao de Dados (Art. 16 LGPD)

### Paginas Admin

#### Dashboard (`/admin`)
- Total de usuarios ativos/excluidos
- Status de compliance LGPD
- Incidentes recentes
- Ultimas atividades

#### Usuarios (`/admin/users`)
- Listagem paginada com busca
- Alterar role (user/admin)
- Soft delete de usuarios

#### Audit Logs (`/admin/audit-logs`)
- Listagem com filtros (acao, userId, data)
- Visualizacao de dados antes/depois
- Paginacao

#### Security Incidents (`/admin/security-incidents`)
- Registro de novos incidentes
- Notificacao ANPD (3 dias uteis)
- Notificacao usuarios afetados
- Niveis de risco: low, medium, high, critical

#### Data Retention (`/admin/data-retention`)
- Estatisticas de dados para limpeza
- Execucao de politicas de retencao
- Cronograma LGPD

---

## Portal de Privacidade (`/account/privacy`)

Funcionalidades para o usuario (Art. 18 LGPD):

- **Acessar Dados** - Download JSON com todos os dados
- **Exportar Dados** - Portabilidade (Art. 18, V)
- **Preferencias de Consentimento** - Marketing, analytics, terceiros
- **Excluir Conta** - Solicitar exclusao (30 dias)

---

## Configuracao de Ambiente

### `.env.local`

```bash
# URL do backend (obrigatorio para desenvolvimento local)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### URLs de API

| Ambiente | URL |
|----------|-----|
| Producao | https://api-project-gules.vercel.app |
| Desenvolvimento | http://localhost:3001 |

> **Nota:** Em producao, a variavel pode ser omitida (usa fallback).

---

## Usuario Admin para Testes

Para testar localmente com banco local:

```
Email: admin@test.com
Senha: Admin123
```

> **Nota:** Este usuario existe apenas no banco local.
> Em producao, use o dashboard Vercel/Neon para criar admins.
