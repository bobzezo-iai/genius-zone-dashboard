# Genius Zone Dashboard

Dashboard psicométrico multi-cliente que mapeia a Zona de Genialidade através de 7 frameworks científicos convergentes, com mentora AI personalizada (Aurora).

## Como Funciona

### Para clientes com perfil pronto
Acesse `/c/{slug}` (ex: `/c/jivan-pramod`) e veja o dashboard completo com todos os 7 frameworks.

### Para clientes novos
Acesse `/c/{slug}` e a Aurora conduz um assessment de ~30 min com 43 perguntas. Ao final, o dashboard é gerado automaticamente.

### Upload direto
Acesse `/` e faça upload de um documento (.pdf, .md, .txt) com dados de autoconhecimento.

## 7 Frameworks

1. **Gay Hendricks** — Zonas de Genialidade/Excelência/Competência/Incompetência
2. **CliftonStrengths (Don Clifton)** — Top 5 talentos dominantes
3. **Kolbe A (Kathy Kolbe)** — 4 instintos conativos
4. **Equação de Valor (Alex Hormozi)** — Resultado × Probabilidade ÷ (Tempo × Esforço)
5. **Wealth Dynamics (Roger Hamilton)** — Perfil de geração de riqueza
6. **Fascination Advantage (Sally Hogshead)** — Arquétipo de fascinação
7. **Unique Ability (Dan Sullivan)** — Habilidade única e alinhamento

## Stack

- **Frontend:** Vanilla JS + Chart.js 4
- **Backend:** Vercel Serverless Functions
- **AI:** Claude Sonnet 4.6 (análise) + Claude Haiku 4.5 (Aurora chat)
- **Database:** Supabase PostgreSQL (opcional)
- **Deploy:** Vercel

## Deploy

```bash
git clone https://github.com/bobzezo-iai/genius-zone-dashboard.git
cd genius-zone-dashboard
vercel env add ANTHROPIC_API_KEY production
vercel deploy --prod
```

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|:-----------:|-----------|
| `ANTHROPIC_API_KEY` | Sim | Chave da API Anthropic (Claude) |
| `SUPABASE_URL` | Não | URL do projeto Supabase |
| `SUPABASE_ANON_KEY` | Não | Chave anônima do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Não | Chave service role |

## Estrutura

```
├── index.html                 # Dashboard + boot script
├── js/
│   ├── auth-optional.js       # Auth (anonymous/Supabase)
│   ├── client-loader.js       # Detecta rota /c/{slug}, carrega perfil
│   ├── psicometria-upload.js  # Upload handler (PDF/MD/TXT)
│   ├── psicometria-renderer.js # Renderiza 7 cards com Chart.js
│   └── aurora.js              # Chat AI + Assessment Engine
├── css/
│   ├── tokens.css             # Design tokens (dark theme)
│   └── aurora.css             # Estilos do chat Aurora
├── api/
│   ├── analyze.js             # POST /api/analyze (Claude Sonnet)
│   ├── aurora.js              # POST /api/aurora (Claude Haiku)
│   ├── client-profile.js      # GET /api/client-profile?slug=
│   └── _shared/               # Auth, rate limiter, quota, logger
├── data/
│   └── assessment-questions.json # 43 perguntas + 9 âncoras
├── grimoires/
│   ├── jivan-pramod/          # Profile + assets do Jivan
│   ├── paulo-victor-nunes/    # Aguardando assessment
│   ├── airton-charles-chaves-junior/
│   └── orli-silva/
├── docs/
│   ├── prd.md                 # Product Requirements Document
│   ├── specs/                 # Specs e critiques
│   └── stories/               # User stories
└── vercel.json                # Config de deploy + rewrites
```

## Adicionar Novo Cliente

1. Criar pasta: `grimoires/{slug}/` com `assets/`, `docs/`
2. Opção A: Criar `profile.json` manualmente (entrega curada)
3. Opção B: Cliente acessa `/c/{slug}` e responde assessment via Aurora
4. Compartilhar link: `seusite.com/c/{slug}`

## Licença

MIT
