# PRD — Genius Zone Dashboard

**Produto:** Genius Zone Dashboard
**Versão:** 1.0.0 (MVP)
**Data:** 2026-03-23
**Owner:** Eliezer Cardoso
**Status:** MVP Deployed

---

## Visão

Plataforma de mapeamento de Zona de Genialidade que analisa o perfil psicométrico de clientes através de 7 frameworks científicos convergentes, oferecendo dashboard interativo e mentora AI personalizada (Aurora).

## Problema

Profissionais e empreendedores não conhecem sua Zona de Genialidade e operam na Zona de Competência ou Excelência — produzindo abaixo do potencial. Testes psicométricos tradicionais são isolados, caros e não se conectam entre si.

## Solução

Dashboard unificado que cruza 7 frameworks em uma análise convergente, com duas vias de acesso:
1. **Entrega Premium** — Operador prepara grimório curado + link exclusivo `/c/{slug}`
2. **Assessment Self-Service** — Aurora conduz questionário de 43 perguntas + âncoras de calibração e gera perfil automaticamente

## Usuários-Alvo

| Persona | Descrição |
|---------|-----------|
| Operador (admin) | Prepara grimórios, gera links, gerencia clientes |
| Cliente Premium | Recebe link, responde assessment ou visualiza dashboard pronto |

## Funcionalidades (MVP)

### Fase 1 — Entrega Premium (DONE)
- Rota `/c/{slug}` com link exclusivo por cliente
- API `client-profile` com sanitização e rate limiting
- Dashboard pré-renderizado com dados curados
- Profile.json compatível com 7 frameworks
- Aurora mentora ativada automaticamente

### Fase 2 — Assessment Self-Service (DONE)
- Aurora Assessment Mode (43 perguntas, 5 seções, 100% frontend)
- 9 âncoras de calibração opcionais (Eneagrama, DISC, MBTI, etc.)
- Campo aberto para dados complementares
- Geração automática de profile.json via /api/analyze
- Recovery de sessão (localStorage por seção)
- Botão "Refazer Assessment"

### Fase 3 — Acesso Contínuo (BACKLOG)
- Magic Link Login via Supabase (Story 1.4 — SHOULD)
- Quota pessoal por user autenticado
- Persistência cross-device

## 7 Frameworks

| # | Framework | Autor | O que mede |
|---|-----------|-------|------------|
| 1 | Zone of Genius | Gay Hendricks | 4 zonas de operação (% de tempo) |
| 2 | CliftonStrengths | Don Clifton | Top 5 talentos dominantes |
| 3 | Kolbe A | Kathy Kolbe | 4 instintos conativos |
| 4 | Value Equation | Alex Hormozi | Resultado × Probabilidade ÷ (Tempo × Esforço) |
| 5 | Wealth Dynamics | Roger Hamilton | Perfil de geração de riqueza |
| 6 | Fascination Advantage | Sally Hogshead | Arquétipo de fascinação |
| 7 | Unique Ability | Dan Sullivan | Habilidade única e alinhamento |

## Stack

- **Frontend:** Vanilla JS, Chart.js 4
- **Backend:** Vercel Serverless Functions (Node.js)
- **AI:** Claude Sonnet 4.6 (análise), Claude Haiku 4.5 (Aurora chat)
- **Database:** Supabase PostgreSQL (opcional)
- **Deploy:** Vercel
- **Repo:** github.com/bobzezo-iai/genius-zone-dashboard

## Clientes Mapeados

| Cliente | Slug | Status |
|---------|------|--------|
| Jivan Pramod | jivan-pramod | Dashboard completo |
| Paulo Victor Nunes | paulo-victor-nunes | Assessment disponível |
| Dr. Airton Charles Chaves Junior | airton-charles-chaves-junior | Assessment disponível |
| Orli Silva | orli-silva | Assessment disponível |

## Métricas de Sucesso

1. Cliente acessa link e vê dashboard em <2s (com profile) ou Aurora assessment (sem profile)
2. Assessment completo em ≤35 min
3. Profile.json gerado automaticamente sem intervenção do operador
4. Aurora referencia dados específicos do perfil nas respostas

---

*PRD gerado em 2026-03-23 — Genius Zone Dashboard MVP*
