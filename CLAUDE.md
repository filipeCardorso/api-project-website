# API Project Website

Marketing site para o API Project (API RESTful de gerenciamento de usuarios).

## Stack Tecnologico

| Categoria | Tecnologia | Versao |
|-----------|------------|--------|
| Framework | Next.js | 16+ |
| Linguagem | TypeScript | 5.x |
| Estilo | TailwindCSS | 4.x |
| Componentes | Radix UI | - |
| Icones | Lucide React | - |
| Animacoes | Framer Motion | - |

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

### Pendente

- [ ] Configurar dominio personalizado (opcional)

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
│   │   ├── login/page.tsx          # Login (UI only)
│   │   └── signup/page.tsx         # Signup (UI only)
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
│   │   │   ├── header.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── footer.tsx
│   │   ├── landing/                # Landing components (8)
│   │   │   ├── hero.tsx
│   │   │   ├── badge-cloud.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── feature-grid.tsx
│   │   │   ├── dev-snippets-tabs.tsx
│   │   │   ├── pricing-preview.tsx
│   │   │   ├── faq-short.tsx
│   │   │   └── cta-section.tsx
│   │   ├── pricing/                # Pricing components (5)
│   │   │   ├── pricing-selectors.tsx
│   │   │   ├── pricing-cards.tsx
│   │   │   ├── add-ons.tsx
│   │   │   ├── compare-plans-table.tsx
│   │   │   └── pricing-faq.tsx
│   │   ├── shared/                 # Shared components (3)
│   │   │   ├── status-widget.tsx
│   │   │   ├── code-block.tsx
│   │   │   └── animated-counter.tsx
│   │   ├── theme-provider.tsx      # Context para tema dark/light
│   │   └── theme-toggle.tsx        # Botao toggle Sun/Moon
│   ├── data/                       # Dados mockados (6)
│   │   ├── plans.ts
│   │   ├── features.ts
│   │   ├── snippets.ts
│   │   ├── faqs.ts
│   │   ├── add-ons.ts
│   │   └── changelog-entries.ts
│   └── lib/
│       └── utils.ts                # cn() helper
├── public/
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
| `/login` | Login (UI only) | Criada |
| `/signup` | Signup (UI only) | Criada |

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
- Login/Signup sao apenas UI (sem backend)
- **Theme**: Dark/Light mode com toggle no header
  - Persistencia em localStorage
  - Detecta preferencia do sistema
  - Variaveis CSS em `globals.css` (`:root` e `.dark`)
