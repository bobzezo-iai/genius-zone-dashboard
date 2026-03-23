# Spec: Assessment Guiado pela Aurora + Âncoras de Calibração

**ID:** SPEC-GZD-002
**Status:** Draft
**Autor:** @pm (Morgan)
**Data:** 2026-03-23
**Complexidade:** STANDARD
**Parent:** SPEC-GZD-001 (Fase 1 — completa)

---

## 1. Visão Geral

Transformar a Aurora de chat passivo para **condutora ativa do assessment** de Zona de Genialidade. Cliente novo acessa `/c/{slug}`, Aurora detecta que não tem perfil, e guia o assessment conversacional (43 perguntas + âncoras de calibração + campo aberto). Ao final, gera profile.json automaticamente e transiciona para modo mentora.

## 2. Fluxo do Cliente

```
Cliente acessa /c/{slug}
       ↓
Sem profile.json → Aurora abre em modo ASSESSMENT
       ↓
"Olá {nome}! Antes de começarmos, você já tem
 resultados de outros testes?"
       ↓
[SIM] → Coleta âncoras (Eneagrama, DISC, MBTI, etc.)
      → Campo aberto: "Mais alguma coisa relevante?"
[NÃO] → Segue direto
       ↓
Aurora conduz 43 perguntas em 5 seções (~25 min)
  Seção 1: Contexto Pessoal (8 perguntas, ~5 min)
  Seção 2: Atividades e Energia (12 perguntas, ~8 min)
  Seção 3: Talentos e Padrões (10 perguntas, ~7 min)
  Seção 4: Estilo de Negócios (8 perguntas, ~5 min)
  Seção 5: Visão e Ambição (5 perguntas, ~5 min)
       ↓
Aurora: "Analisando seu perfil nos 7 frameworks..."
       ↓
POST /api/analyze com respostas + âncoras + contexto
       ↓
profile.json gerado → Dashboard renderiza
       ↓
Aurora muda para modo MENTORA
"Seu mapa de genialidade está pronto! Me pergunte qualquer coisa..."
```

## 3. Componentes

### 3.1 Aurora Assessment Engine (Frontend)

Nova lógica no `js/aurora.js` que:
- Detecta ausência de profile no localStorage
- Carrega questionário (43 perguntas) como JSON
- Apresenta perguntas sequencialmente no chat
- Salva progresso por seção no localStorage
- Compila respostas em texto estruturado para /api/analyze

### 3.2 Questionário como Dados (JSON)

```
data/assessment-questions.json
```

Arquivo JSON com as 43 perguntas estruturadas:
```json
{
  "sections": [
    {
      "id": "contexto",
      "title": "Contexto Pessoal",
      "duration": "5 min",
      "questions": [
        {
          "id": "ctx_nome",
          "text": "Qual seu nome completo?",
          "type": "open",
          "required": true,
          "feeds": ["all"]
        },
        {
          "id": "ctx_area",
          "text": "Qual sua área de atuação principal?",
          "type": "multiple_choice",
          "options": ["Tecnologia", "Marketing", "Design", ...],
          "required": true,
          "feeds": ["hamilton", "hormozi", "sullivan"]
        }
      ]
    }
  ],
  "anchors": {
    "known": [
      { "id": "eneagrama", "label": "Eneagrama", "placeholder": "Ex: Tipo 3 — Realizador" },
      { "id": "disc", "label": "DISC", "placeholder": "Ex: DI" },
      { "id": "mbti", "label": "MBTI", "placeholder": "Ex: ENTP" },
      { "id": "numerologia", "label": "Numerologia", "placeholder": "Ex: 8" },
      { "id": "signo", "label": "Signo", "placeholder": "Ex: Touro" },
      { "id": "human_design", "label": "Human Design", "placeholder": "Ex: Manifestor 4/6" },
      { "id": "inteligencias", "label": "Inteligências Múltiplas", "placeholder": "Ex: Lógica, Existencialista" },
      { "id": "tracos_carater", "label": "Traços de Caráter", "placeholder": "Ex: Esquizoide + Rígido" },
      { "id": "missao_vida", "label": "Missão de Vida", "placeholder": "Ex: Liderança" }
    ],
    "open_field": {
      "label": "Mais alguma coisa sobre você que acha relevante?",
      "description": "Outros testes, avaliações, terapias, descobertas pessoais... pode colar resultados ou simplesmente contar.",
      "max_chars": 5000
    }
  }
}
```

### 3.3 API Enhance — Contexto de Assessment

O `/api/analyze` já aceita `text` livre. O assessment compila as respostas como texto estruturado:

```
# Assessment Zona de Genialidade — {nome}

## Âncoras de Calibração
- Eneagrama: Tipo 3 — Realizador
- Numerologia: 8
- Signo: Touro
- Dados adicionais: [campo aberto]

## Seção 1: Contexto Pessoal
P1 (Nome): Eliezer Cardoso
P2 (Área): Tecnologia / Desenvolvimento
...

## Seção 5: Visão e Ambição
P41: ...
P43: ...
```

Esse texto é enviado ao `/api/analyze` como se fosse um documento uploaded — **zero mudança na API**.

### 3.4 Componentes Modificados

| Componente | Modificação |
|-----------|-------------|
| `js/aurora.js` | Adicionar assessment mode com motor de perguntas |
| `index.html` | Boot detecta ausência de profile → abre Aurora em assessment mode |
| `data/assessment-questions.json` | Novo — 43 perguntas + âncoras estruturadas |

### 3.5 Componentes NÃO Modificados

| Componente | Motivo |
|-----------|--------|
| `/api/analyze.js` | Recebe texto livre — assessment compila respostas como texto |
| `/api/aurora.js` | Chat pós-assessment funciona como já funciona |
| `js/psicometria-renderer.js` | Renderiza profile.json — sem mudança |

## 4. Âncoras de Calibração

| Âncora | Obrigatória | Exemplo |
|--------|:-----------:|---------|
| Eneagrama | Não | Tipo 3 — Realizador |
| DISC | Não | DI |
| MBTI | Não | ENTP |
| Numerologia | Não | 8 (Poder, Abundância) |
| Signo | Não | Touro |
| Human Design | Não | Manifestor 4/6 |
| Inteligências Múltiplas | Não | Lógica, Existencialista |
| Traços de Caráter | Não | Esquizoide + Rígido |
| Missão de Vida | Não | Liderança |
| **Campo Aberto** | Não | Qualquer dado adicional (até 5000 chars) |

## 5. Stories Propostas

| # | Título | Prioridade | Deps |
|---|--------|-----------|------|
| S5 | Aurora Assessment Mode — motor de perguntas conversacional | MUST | S1 (rota /c/{slug}) |
| S6 | Âncoras de Calibração + Campo Aberto | MUST | S5 |
| S7 | Geração automática de profile.json via assessment | MUST | S5, S6 |

## 6. Decisão Arquitetural Chave

**Assessment como texto → /api/analyze existente** (sem nova API)

O assessment compila as 43 respostas + âncoras em texto estruturado e envia ao `/api/analyze` que já usa Claude Sonnet para gerar o profile.json. Isso significa:
- **Zero mudança no backend**
- Mesma qualidade de análise do upload de documento
- Âncoras enriquecem o texto enviado ao Sonnet
- Custo: 1 chamada Haiku por pergunta (~43) + 1 chamada Sonnet no final

## 7. Riscos

| Risco | Mitigação |
|-------|-----------|
| 43 chamadas Haiku podem ser caras em escala | Batch perguntas em grupos de 3-5, reduzindo chamadas |
| Cliente desiste no meio do assessment | Progresso salvo por seção, retomada possível |
| Respostas curtas geram análise pobre | Aurora faz follow-up em respostas abertas muito curtas |

---

*Spec gerado por @pm (Morgan) — 2026-03-23*
*Referência: requirements-phase2.json (SPEC-GZD-002)*
*Questionário base: formador-de-lideres/squads/zona-genialidade/tasks/run-assessment.md*
