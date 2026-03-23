# Spec: Multi-Cliente Premium com Aurora Contínua

**ID:** SPEC-GZD-001
**Status:** Draft
**Autor:** @pm (Morgan)
**Data:** 2026-03-23
**Complexidade:** SIMPLE (3 fases: gather → spec → critique)

---

## 1. Visão Geral

Evoluir o Genius Zone Dashboard de single-user para multi-cliente premium, permitindo:
- Entrega curada pelo operador (grimório + dashboard + link exclusivo)
- Acesso contínuo do cliente à Aurora via magic link

## 2. Arquitetura da Solução

### 2.1 Fluxo Premium (Operador → Cliente)

```
Operador prepara grimório
       ↓
Gera profile.json (7 frameworks)
       ↓
Coloca em grimoires/{slug}/profile.json
       ↓
Envia link: seusite.com/c/{slug}
       ↓
Cliente acessa → dashboard pré-renderizado + Aurora ativa
```

### 2.2 Fluxo de Acesso Contínuo (Cliente)

```
Cliente recebe link /c/{slug}
       ↓
Dashboard renderiza com dados pré-curados
       ↓
Cliente clica "Acessar Aurora" → magic link por email
       ↓
Login via Supabase → Aurora com quota pessoal (20 msg/dia)
       ↓
Próximas visitas: sessão persistente, Aurora disponível
```

### 2.3 Componentes Novos

| Componente | Tipo | Descrição |
|-----------|------|-----------|
| `/api/client-profile.js` | Serverless | Serve profile.json por slug com sanitização |
| `/js/client-loader.js` | Frontend | Detecta rota /c/{slug}, carrega perfil, injeta no localStorage |
| `grimoires/{slug}/profile.json` | Data | Dados psicométricos curados por cliente |
| Rewrite em `vercel.json` | Config | Mapeia /c/* → index.html |

### 2.4 Componentes Modificados

| Componente | Modificação |
|-----------|-------------|
| `index.html` | Adicionar script client-loader.js |
| `js/psicometria-upload.js` | Detectar modo pré-carregado, esconder upload |
| `js/auth-optional.js` | Adicionar magic link flow (FR-4) |

## 3. Requisitos Funcionais

### FR-1: Rota de Acesso por Cliente (MUST)
- URL pattern: `/c/{client-slug}`
- Vercel rewrite: `/c/:slug` → `/index.html`
- client-loader.js extrai slug da URL, chama `/api/client-profile?slug={slug}`
- Dados retornados são injetados no localStorage com chave `psicometria_data_v2_{uid}`
- Aurora.init() detecta dados e ativa FAB automaticamente

### FR-2: Profile.json por Cliente (MUST)
- Localização: `grimoires/{slug}/profile.json`
- Schema: idêntico ao output de `fill_psychometric_dashboard` tool (api/analyze.js)
- API endpoint: `GET /api/client-profile?slug={slug}`
- Segurança: slug validado com regex `/^[a-z0-9-]+$/`, sem path traversal
- Primeiro cliente: Jivan Pramod (profile.json gerado a partir do grimório .md existente)

### FR-3: Dashboard Pré-Renderizado (MUST)
- Ao detectar dados no localStorage (vindos do client-loader), renderizar dashboard imediatamente
- Esconder seção de upload, mostrar dashboard
- Manter botão "Reanalizar" para permitir novo upload
- PsicoRenderer.render(data) já aceita o formato — sem mudanças no renderer

### FR-4: Magic Link Login (SHOULD)
- Botão discreto "Entrar para acessar Aurora" no dashboard
- Supabase magic link: `supabase.auth.signInWithOtp({ email })`
- Após login: Aurora usa quota vinculada ao user autenticado
- Sem login: Aurora funciona em modo anônimo (quota por session/IP)

## 4. Requisitos Não-Funcionais

- **NFR-1 Segurança:** Sanitização de slug, leitura apenas de grimoires/, sem eval/injection
- **NFR-2 Performance:** Dashboard pré-renderizado <2s (sem chamada a /api/analyze)
- **NFR-3 Compatibilidade:** Fluxo atual de upload intacto, modo premium é aditivo

## 5. Constraints

- **CON-1:** Stack Vanilla JS + Vercel + Supabase + Anthropic (sem mudança)
- **CON-2:** Sem frameworks frontend
- **CON-3:** profile.json compatível com schema do fill_psychometric_dashboard

## 6. Stories Propostas

| # | Título | Prioridade | Refs | Dependências |
|---|--------|-----------|------|-------------|
| S1 | Rota /c/{slug} + API client-profile | MUST | FR-1, FR-2, NFR-1 | — |
| S2 | Profile.json do Jivan Pramod | MUST | FR-2 | S1 |
| S3 | Dashboard pré-renderizado via client-loader | MUST | FR-3, NFR-2, NFR-3 | S1 |
| S4 | Magic Link Login + Aurora contínua | SHOULD | FR-4 | S1, S3 |

## 7. Riscos

| Risco | Mitigação |
|-------|-----------|
| Profile.json desatualizado vs grimório .md | Documentar processo de regeneração |
| Slug exposto na URL pode ser adivinhado | Slugs não-óbvios + rate limiting na API |
| Supabase não configurado para magic link | FR-4 é SHOULD — funciona sem login em modo anônimo |

## 8. Critérios de Sucesso

1. `/c/jivan-pramod` renderiza dashboard completo com dados do Jivan em <2s
2. Aurora funciona e referencia dados específicos do perfil do Jivan
3. Fluxo de upload original continua funcionando em `/` (sem regressão)
4. Novos clientes podem ser adicionados criando pasta + profile.json

---

*Spec gerado por @pm (Morgan) — 2026-03-23*
*Referência: requirements.json (SPEC-GZD-001)*
