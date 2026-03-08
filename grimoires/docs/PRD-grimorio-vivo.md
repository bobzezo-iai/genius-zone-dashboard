# PRD — Grimório Vivo | Documento Pessoal Interativo

## Visão do Produto

Documento digital interativo que mapeia o perfil completo de um profissional — competências, obra, ecossistema digital, posicionamento estratégico e análise psicométrica convergente (7 frameworks). Funciona como **PDF vivo**: começa com projeções e evolui com dados reais alimentados pelo Genius Zone Dashboard.

## Problema

Profissionais de alto impacto não possuem um artefato visual que sintetize quem são, o que construíram e para onde estão indo — de forma que impressione, engaje e sirva como ferramenta estratégica.

## Solução

Um documento HTML responsivo, auto-contido, que funciona perfeitamente em **celular** e **computador**, com identidade visual premium que funde a marca do profissional com o ecossistema iAi.

## Primeiro Cliente

**Jivan Pramod** — Estrategista de Relações Humanas, ex-"Rei do Tantra", reposicionando-se no iAi.ECOssistema Base Tríade como Líder do Ciclo das Estações e Diretor de Experiência das Hospedarias Biofílicas Ravi.

---

## Requisitos Funcionais

### RF-01: Responsividade Total
- Mobile-first: projetado para celular, adaptado para desktop
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Sem scroll horizontal em nenhum dispositivo
- Touch-friendly: targets mínimo 44px

### RF-02: Estrutura de Páginas (Seções)
| # | Seção | Tipo |
|---|-------|------|
| 1 | Capa | Estático |
| 2 | Frase-Semente | Estático |
| 3 | Identidade + Arco Narrativo | Estático |
| 4 | Cartografia de Competências | Estático |
| 5 | Os 5 Pilares | Estático |
| 6 | Obra: Sexy Mind | Estático |
| 7 | Ecossistema Digital | Estático |
| 8 | Reposicionamento iAi | Estático |
| 9 | Genius Zone Dashboard (7 frameworks) | Dinâmico |
| 10 | Plano de Ação + Squad | Dinâmico |
| 11 | Contracapa + Links | Estático |

### RF-03: Auto-Contido
- Imagens embutidas como base64
- Fontes via Google Fonts CDN
- Zero JavaScript obrigatório
- Arquivo único HTML (< 200KB)

### RF-04: Slots Dinâmicos
- Elementos com `data-slot` para alimentação posterior
- Estado inicial: projeções com badge "Projeção"
- Estado final: dados reais do Genius Zone Dashboard

### RF-05: Links Interativos
- WhatsApp clicável (wa.me)
- Links do ecossistema (basetriade.com, ecoin, Instagram)
- QR code para @iai.get137

### RF-06: Impressão
- @media print com page-break-after para cada seção
- Cores preservadas (print-color-adjust: exact)
- Formato A4

---

## Requisitos Não-Funcionais

### NF-01: Performance
- First paint < 1s em 4G
- Total size < 200KB
- Sem JavaScript blocking

### NF-02: Compatibilidade
- iOS Safari 15+
- Android Chrome 90+
- Desktop Chrome/Firefox/Safari/Edge últimas 2 versões

### NF-03: Acessibilidade
- Contraste mínimo 4.5:1 em textos
- Alt text em todas as imagens
- Semântica HTML5 (section, article, header, footer)

---

## Design System (Resumo)

### Paleta
| Token | Hex | Uso |
|-------|-----|-----|
| deep-cosmos | #1A0E2E | Background |
| gold-sacred | #D4A017 | Títulos, destaques |
| purple-owl | #7B2D8E | Acentos |
| amber-fire | #E8960C | Calor/Jivan |
| forest-triade | #2D5A3D | Natureza/Biofilia |
| white-linen | #F5F0E8 | Texto body |
| teal-border | #0FA68E | Links, portais |
| warm-dock | #C4A35A | Labels, sutil |

### Tipografia
| Uso | Família | Peso |
|-----|---------|------|
| Títulos sagrados | Cinzel Decorative | 700 |
| Seções | Cinzel | 600 |
| UI/Labels | Montserrat | 500 |
| Body | Lora | 400 |
| 137/código | JetBrains Mono | 300 |

### 137 Subliminar
- line-height: 1.37
- Paginação /37
- Pattern rotacionado opacity 3%
- v1.37 no rodapé

---

## Assets

### Disponíveis
- `jivan-pramod.jpeg` — Foto (selfie + marina)
- `logo-iai-3d.png` — Coruja iAi híbrida
- `logo-ciclo-estacoes.jpeg` — Logo Ciclo das Estações
- `mandala-grimorio.png` — Mandala Sagrada iAi

### Conteúdo
- `jivan-pramod.md` — Grimório completo (texto)
- `design-system-jivan-pramod.md` — Spec visual completo

---

## Arquitetura Mobile-First

### Layout Mobile (< 768px)
```
┌──────────────────────┐
│    CAPA               │
│  ┌──────┐            │
│  │ FOTO │ 130px      │
│  └──────┘            │
│    GRIMÓRIO           │
│    JIVAN PRAMOD       │
│    frase              │
│    🦉  🌿            │
│    iAi.ECOssistema    │
└──────────────────────┘
│    scroll ↓           │
┌──────────────────────┐
│    FRASE-SEMENTE      │
│    ❝ ... ❞           │
└──────────────────────┘
│    scroll ↓           │
┌──────────────────────┐
│    IDENTIDADE         │
│    [cards stacked]    │
│    [timeline vert.]   │
└──────────────────────┘
... etc (tudo 1 coluna)
```

### Layout Desktop (> 1024px)
```
┌─────────────────────────────────┐
│       CAPA (A4 aspect ratio)    │
│   [marina full-bleed]           │
│      ┌──────┐                   │
│      │ FOTO │                   │
│      └──────┘                   │
│    GRIMÓRIO / JIVAN PRAMOD      │
│    frase em 1 linha             │
│    🦉  🌿  iAi.ECOssistema     │
└─────────────────────────────────┘
```

---

## Métricas de Sucesso

1. Abre perfeitamente em celular (iOS e Android)
2. Foto do profissional visível e nítida
3. Todos os textos legíveis sem zoom
4. Links clicáveis e funcionais
5. Impressão em A4 mantém layout
6. Cliente diz "wow" ao receber

---

*PRD v1.37 | iAi.ECOssistema Base Tríade*
*Grimório Vivo — Documento Pessoal Interativo*
