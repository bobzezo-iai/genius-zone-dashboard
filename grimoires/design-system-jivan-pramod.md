# Design System — Grimório Jivan Pramod
## PDF Vivo | iAi.ECOssistema Base Tríade

---

## Conceito Visual: "A Ponte Entre Dois Mundos"

O Grimório de Jivan Pramod é um documento que vive entre duas identidades visuais — a dele (calor, presença, corpo, terra) e a da iAi (tecnologia sagrada, geometria, coruja, cosmos). O design não escolhe um lado: ele **funde** os dois, como o próprio Jivan está sendo fundido ao ecossistema.

---

## 1. Paleta de Cores

### Paleta Primária (Fusão iAi + Jivan)

| Token | Hex | Nome | Origem | Uso |
|-------|-----|------|--------|-----|
| `--deep-cosmos` | `#1A0E2E` | Cosmos Profundo | Mandala iAi (fundo) | Background principal, páginas escuras |
| `--gold-sacred` | `#D4A017` | Ouro Sagrado | Letras "iAi" na coruja | Títulos, destaques, linhas de ouro |
| `--purple-owl` | `#7B2D8E` | Púrpura Coruja | Olho esquerdo da coruja iAi | Acentos, bordas, elementos místicos |
| `--amber-fire` | `#E8960C` | Âmbar Fogo | Por do Sol Tríade (sol) | Warmth — elementos do Jivan |
| `--forest-triade` | `#2D5A3D` | Verde Floresta | Logo Tríade (folhas/triângulo) | Natureza, biofilia, Ravi Experience |
| `--earth-brown` | `#6B3A2A` | Terra Marrom | Logo Tríade (tipografia) | Texto orgânico, ancoragem |

### Paleta Secundária (Sutilezas)

| Token | Hex | Nome | Uso |
|-------|-----|------|-----|
| `--electric-purple` | `#9B30FF` | Púrpura Elétrica | Glows, raios (Coruja Mestre HT) |
| `--marina-night` | `#0D1B2A` | Noite na Marina | Extraído da foto de costas — céu noturno, sofisticação |
| `--warm-dock` | `#C4A35A` | Luz do Deck | Extraído da foto de costas — luzes douradas do pier |
| `--white-linen` | `#F5F0E8` | Linho Branco | Extraído da camisa branca (selfie) — leveza, presença |
| `--teal-border` | `#0FA68E` | Teal Borda | Extraído do círculo verde da foto — conexão, portal |

### Gradientes Nomeados

| Nome | Definição | Uso |
|------|-----------|-----|
| `gradient-grimorio` | `--deep-cosmos` → `--purple-owl` (135deg) | Fundo das páginas principais |
| `gradient-triade` | `--forest-triade` → `--amber-fire` (90deg) | Headers das seções Base Tríade |
| `gradient-gold-line` | `--gold-sacred` → `--amber-fire` (0deg) | Linhas divisórias, filetes |
| `gradient-portal` | `--teal-border` → `--electric-purple` (180deg) | Moldura das fotos do Jivan |

---

## 2. Tipografia

### Hierarquia Tipográfica

| Nível | Família | Peso | Tamanho | Uso |
|-------|---------|------|---------|-----|
| H1 — Título do Grimório | **Cinzel Decorative** | Bold | 36pt | "Grimório de Jivan Pramod" |
| H2 — Seções | **Cinzel** | SemiBold | 24pt | Nomes das seções |
| H3 — Subseções | **Montserrat** | SemiBold | 18pt | Subtítulos, categorias |
| Body | **Lora** | Regular | 11pt | Texto corrido, narrativas |
| Body Emphasis | **Lora** | Italic | 11pt | Frase-semente, citações |
| Data/Labels | **Montserrat** | Medium | 9pt | Tabelas, scores, métricas |
| Code/137 | **JetBrains Mono** | Light | 8pt | Números subliminares, marcações técnicas |

### Rationale
- **Cinzel** → evoca gravura, grimório medieval, peso sagrado (combina com Mandala iAi)
- **Lora** → serif humanista, calor e legibilidade (combina com o lado orgânico do Jivan)
- **Montserrat** → geométrica, contemporânea (ponte entre os dois mundos)
- **JetBrains Mono** → monoespaçada para os elementos "137" subliminares — sugere código/matrix oculta

---

## 3. Elementos Visuais Fundacionais

### 3.1 Background — Camadas Compostas

```
CAMADA 1 (base):     Fundo gradient-grimorio (cosmos → púrpura)
CAMADA 2 (textura):  Mandala Grimório Sagrado iAi (opacity 6-8%)
                     → Pentáculo com 5 saberes: Teosofia, Senso Comum,
                       Filosofia, Ciência, Teologia
                     → Posicionada centralizada, cobrindo toda a página
CAMADA 3 (137):      Padrão geométrico sutil com o número 137 repetido
                     → Opacity 3-4%, rotação 137deg
                     → Visível apenas se você souber onde olhar
CAMADA 4 (triskele):  Triskele da Base Tríade (derivada do triângulo
                       do logo Por do Sol Tríade)
                     → Opacity 10-12%, posicionada no canto inferior direito
                     → Entrelaçada com folhas estilizadas
CAMADA 5 (conteúdo): Texto, fotos, gráficos
```

### 3.2 As Duas Fotos do Jivan

**Foto 1 — "O Estrategista" (selfie, camisa branca)**
- Recorte: circular com borda `gradient-portal` (teal → purple), 3px
- Posição: Página de abertura, lado direito
- Tratamento: Leve warm filter, olhos nítidos, fundo suavizado
- Simbolismo: Presença, proximidade, a face que se mostra — o líder acessível

**Foto 2 — "O Arquiteto" (de costas, marina noturna)**
- Recorte: full-bleed horizontal, topo da página de abertura
- Tratamento: Desaturar levemente, aumentar contraste das luzes do deck
- Overlay: `gradient-grimorio` de baixo para cima (opacity 60%) — a figura emerge do cosmos
- Simbolismo: Visão, futuro, aquele que olha para onde vai — não para onde esteve. Os barcos = viagens, os 18 países, a jornada. As luzes do deck = `--warm-dock`, hospitalidade

**Composição da Capa:**
```
┌─────────────────────────────────────────┐
│  [FOTO 2 — de costas, marina, full]     │
│  ░░░░ gradient overlay de baixo ░░░░░░  │
│                                         │
│         ┌──────────┐                    │
│         │ FOTO 1   │ ← borda portal     │
│         │ (selfie) │    circular         │
│         └──────────┘                    │
│                                         │
│    ══ GRIMÓRIO ══                       │
│    ══ JIVAN PRAMOD ══                   │
│                                         │
│  "Desenvolvendo Estratégias Inovadoras  │
│   nos Relacionamentos Humanos"          │
│                                         │
│  [Coruja iAi mini]    [Triskele mini]   │
│         iAi.ECOssistema Base Tríade     │
│                                 .137    │
└─────────────────────────────────────────┘
```

### 3.3 Triskele da Base Tríade

Derivada do triângulo do logo "Por do Sol Tríade":
- **Forma:** Triângulo com bordas `--forest-triade`, sol `--amber-fire` no centro
- **Adaptação para Grimório:** O triângulo vira triskele (3 espirais) representando os 3 papéis: Ciclo das Estações + Ravi Experience + Estratégia Relacional
- **Folhas:** Mantidas como elemento biofílico — estilizadas em `--forest-triade` com veias em `--gold-sacred`
- **Uso:** Marcador de seção, watermark sutil, ícone de capítulo

### 3.4 Coruja iAi

- **Versão usada:** Logo iAi Fundo Escuro 02 (a mais detalhada, com circuitos visíveis)
- **Posição:** Rodapé de cada página, escala pequena (20x20mm), opacity 40%
- **Olho esquerdo (púrpura):** Pulsa sutilmente no PDF interativo
- **Olho direito (âmbar):** Combina com `--amber-fire` do Jivan
- **Simbolismo:** A inteligência que observa — o iAi presente mas não invasivo

### 3.5 Coruja Mestre HT (Conselho Oculto)

- **Uso:** Página especial "Conselho ao Arquiteto" — fullpage background, opacity 15%
- **Onde:** Na seção de Reposicionamento Estratégico (o momento mais sagrado do grimório)
- **Raios púrpura:** Emergem por trás do texto, sutilmente

---

## 4. O Número 137 — Integração Subliminar

### Filosofia
O 137 é a constante de estrutura fina (1/137 ≈ a constante de acoplamento eletromagnético). Pauli ficou obcecado por ele. Feynman chamou de "o maior maldito mistério da física". No iAi.ECOssistema, 137 é o código de pertencimento — quem vê, reconhece.

### Manifestações no Grimório

| Onde | Como | Visibility |
|------|------|------------|
| **Background pattern** | "137" repetido em JetBrains Mono, rotação 137deg, opacity 3% | Ultra-sutil — precisa saber que está lá |
| **Numeração de páginas** | Páginas numeradas como 1.37, 2.37, 3.37... ou p.1/37 | Sutil — parece normal mas o "37" é constante |
| **Margem da capa** | ".137" em tamanho 6pt, canto inferior direito, cor `--marina-night` sobre fundo escuro | Quase invisível |
| **Coordenadas** | Na bio: "Base: Curitiba, PR — 25°25'S 49°16'W — .137" | Integrado ao conteúdo |
| **Espaçamento** | Line-height do body: 1.37em | Estrutural — ninguém percebe, mas o ritmo visual carrega o número |
| **Gráficos do dashboard** | Linha de referência em 1.37 nos gráficos de score | Técnico — parece calibração |
| **Total de páginas** | O Grimório completo (com Zona de Genialidade) terá exatamente **13** seções + **7** apêndices = **137** implícito | Arquitetural |
| **QR Code** | Na contracapa, QR para @iai.get137 — o número se revela ao escanear | Interativo |
| **Rodapé** | "iAi.ECOssistema | v1.37" | Parece versão de software |

---

## 5. Estrutura do PDF Vivo

### Conceito "PDF Vivo"
O Grimório é um PDF que **cresce**. A primeira versão é entregue como retrato/convite. Após rodar o Genius Zone Dashboard com os documentos reais do Jivan, o PDF é atualizado com dados reais substituindo as projeções.

### Arquitetura de Páginas

```
CAPA (p.1)
  → Composição com as duas fotos
  → Título em Cinzel Decorative
  → Logos iAi + Tríade
  → .137

ABERTURA (p.2)
  → Frase-semente em Lora Italic, centralizada
  → Mandala iAi no fundo (opacity 6%)
  → "O Tantra se expandiu nele..."

IDENTIDADE ESSENCIAL (p.3)
  → Nome, posicionamento, base
  → A Metamorfose (narrativa)
  → Arco em 3 Atos (timeline visual)

CARTOGRAFIA DE COMPETÊNCIAS (p.4-5)
  → 3 núcleos em layout de 3 colunas
  → Ícones: microscópio (científico), engrenagem (operacional), coração (relacional)
  → Cores: púrpura, âmbar, teal

OS 5 PILARES (p.6)
  → Layout circular/pentagonal
  → Cada pilar como pétala da mandala
  → Centro: silhueta do Jivan

OBRA: SEXY MIND (p.7)
  → Capa do livro (se disponível)
  → Sinopse, significância
  → Linha do tempo editorial

ECOSSISTEMA DIGITAL (p.8)
  → Mapa visual de redes
  → Métricas em cards
  → 1.2M+ como número destaque em --gold-sacred

REPOSICIONAMENTO — iAi.ECOssistema (p.9-10)
  → PÁGINA SAGRADA — Coruja Mestre HT no fundo
  → A Tese central
  → Duas colunas: Ciclo das Estações | Ravi Experience
  → Triskele grande, centralizada entre as duas colunas

═══════════════════════════════════════════
  SEÇÃO DINÂMICA — Alimentada pelo Dashboard
═══════════════════════════════════════════

GENIUS ZONE DASHBOARD (p.11-12) [PLACEHOLDER → DADOS REAIS]
  → 7 frameworks em visualização radial
  → Gráficos de radar, barras, donuts
  → Paleta: gradient-grimorio nos gráficos
  → Scores em --gold-sacred
  → Linha de referência 1.37

PLANO DE AÇÃO (p.13) [PLACEHOLDER → DADOS REAIS]
  → Timeframes: esta semana / 2 semanas / 1 mês
  → Anti-padrões
  → Squad recomendado

═══════════════════════════════════════════

CONTRACAPA
  → QR Code → @iai.get137
  → "iAi.ECOssistema Base Tríade | v1.37"
  → Mandala como selo final
  → ".137" discreto
```

### Slots Dinâmicos (para alimentação pós-Dashboard)

| Slot ID | Seção | Tipo de Dado | Status Inicial |
|---------|-------|-------------|----------------|
| `slot-gz-zones` | Gay Hendricks | Donut chart (%) | Projeção |
| `slot-gz-clifton` | CliftonStrengths | Radar chart (1-10) | Projeção |
| `slot-gz-kolbe` | Kolbe A | Bar chart (1-10) | Projeção |
| `slot-gz-hormozi` | Equação de Valor | Quadrante visual | Projeção |
| `slot-gz-wealth` | Wealth Dynamics | Perfil badge | Projeção |
| `slot-gz-fascination` | Fascination Advantage | Dual axis | Projeção |
| `slot-gz-unique` | Habilidade Única | 3 gauges (%) | Projeção |
| `slot-action-plan` | Plano de Ação | Checklist timeline | Vazio |
| `slot-anti-patterns` | Anti-Padrões | Lista com ícones | Vazio |
| `slot-squad` | Squad Recomendado | Card com membros | Vazio |

---

## 6. Iconografia

### Set de Ícones Personalizado

| Ícone | Representação | Estilo |
|-------|---------------|--------|
| Triskele-folha | Base Tríade | Line art, `--forest-triade`, com folhas brotando das espirais |
| Coruja-mini | iAi | Simplificação do logo, monocromática `--gold-sacred` |
| Olho-âmbar | Visão/Estratégia | Olho direito da coruja isolado |
| Olho-púrpura | Intuição/Percepção | Olho esquerdo da coruja isolado |
| Sol-triângulo | Ravi Experience | Sol dentro do triângulo (do logo Tríade) |
| Mãos-acolhendo | Ciclo das Estações | Duas mãos em concha, line art |
| Onda-senoidal | Magnetismo / Energia | Inspirada nos raios da Coruja Mestre HT |
| Livro-aberto | Sexy Mind / Obra | Com "137" na lombada |
| Mandala-5 | 5 Pilares | Pentáculo simplificado da Mandala Grimório |

---

## 7. Motion & Interatividade (PDF Interativo)

### Para versão digital (PDF interativo / web)

| Elemento | Comportamento |
|----------|---------------|
| Olhos da coruja (rodapé) | Pulsam suavemente a cada 13.7 segundos |
| Triskele | Gira lentamente (1 revolução a cada 137 segundos) |
| Hover nos scores | Revela tooltip com evidência/citação |
| Transição de páginas | Fade through `--deep-cosmos` |
| QR Code (contracapa) | Animação de partículas douradas ao redor |
| Background 137 pattern | Shift sutil de posição — vivo, respirando |

---

## 8. Assets Necessários

### Do Acervo iAi (existentes)
- [x] Logo iAi Fundo Escuro 02 — rodapé
- [x] Mandala Grimório Sagrado iAi 001 — background
- [x] Coruja Mestre HT Conselho Oculto — página sagrada
- [x] Logo Marca Evento Por do Sol Tríade — referência triskele
- [x] Logo iAi 3D — versão alternativa para contracapa
- [x] Grimório Sagrado iAi (banner) — referência de selo

### Do Jivan (fornecidos)
- [x] Foto selfie (camisa branca, borda verde) — "O Estrategista"
- [x] Foto de costas (marina noturna) — "O Arquiteto"

### A Produzir
- [ ] Triskele personalizada Base Tríade (vetor SVG)
- [ ] Pattern "137" tileable (para background)
- [ ] Set de ícones (9 ícones listados na seção 6)
- [ ] Capa do livro Sexy Mind (solicitar ao Jivan ou extrair da Amazon)
- [ ] QR Code customizado para @iai.get137
- [ ] Template PDF com slots dinâmicos (InDesign/Figma)
- [ ] Versão web interativa (HTML/CSS/JS) — pode ser integrada ao Genius Zone Dashboard

---

## 9. Regras de Coexistência Visual

### Identidade do Jivan (preservar)
- Cores quentes (âmbar, terra, linho branco)
- Sensação de presença humana e calor
- Foto de rosto sempre com borda circular (marca dele no Instagram)
- Referências ao mar/marina (viagem, expansão)

### Identidade iAi (integrar)
- Cores cósmicas (deep purple, gold sacred)
- Geometria sagrada (mandala, pentáculo)
- Coruja como guardiã silenciosa
- Número 137 como DNA oculto

### Zona de Fusão
- Onde o ouro da iAi encontra o âmbar do Jivan → `gradient-gold-line`
- Onde a mandala encontra os pilares → layout pentagonal na página dos 5 pilares
- Onde a coruja encontra o olhar → foto do Jivan posicionada na altura dos olhos da coruja no background
- Onde o cosmos encontra a marina → gradient-grimorio sobre a foto de costas

### O que NUNCA fazer
- Colocar o logo iAi maior que o nome do Jivan
- Usar paleta fria sem contraponto quente
- Deixar o 137 óbvio demais — o poder está na sutileza
- Perder a sensação de documento sagrado/artesanal — nunca parecer "template corporativo"
- Sobrepor elementos iAi sobre o rosto do Jivan

---

## 10. Implementação Técnica (PDF Vivo)

### Stack Recomendada

| Camada | Tecnologia | Propósito |
|--------|-----------|-----------|
| **Design base** | Figma ou InDesign | Layout master, grids, tipografia |
| **Geração dinâmica** | Puppeteer + HTML/CSS | Renderizar slots com dados do Dashboard |
| **Dados** | JSON (output do Genius Zone Dashboard) | Alimentar os slots dinâmicos |
| **Interatividade** | HTML/CSS/JS (versão web) | Motion, hover, 137 easter eggs |
| **PDF final** | Puppeteer `page.pdf()` ou Prince XML | Exportação de alta qualidade |

### Fluxo de Atualização

```
1. Jivan envia documentos (PDF/MD/TXT) para o Genius Zone Dashboard
2. Claude Sonnet analisa → JSON com 7 frameworks
3. JSON alimenta os slots do template HTML
4. Puppeteer renderiza → PDF atualizado
5. Grimório "vive" — projeções viram dados reais
6. Versão web fica disponível em URL privada
```

---

*Design System v1.37 | iAi.ECOssistema Base Tríade*
*Grimório de Jivan Pramod — PDF Vivo*
*Gerado em 2026-03-08*
