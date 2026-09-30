# Currículo Virtual & Portfólio Tecnológico — Raphael C. Martins

Site do currículo pessoal e portfólio de engenharia de software e infraestrutura, construído sob rigorosos padrões de performance (Zero Dependências externas no client-side), acessibilidade e design de alta densidade.

## 🔗 Acesso Online
> **Deploy:** [https://raphael-c-martins.github.io/](https://raphael-c-martins.github.io/)

---

## 🏛️ Filosofia de Construção & Arquitetura

O projeto foi inteiramente construído em **Vanilla Puro (HTML5 + CSS3 + JavaScript)**:
1. **Zero Frameworks Client-Side:** Nenhuma biblioteca pesada de frontend (React, Vue, jQuery) no client. Toda a navegação, filtros dinâmicos e modais rodam no motor nativo do navegador.
2. **Identidade Visual Dark Slate & Ouro Nobre:** Design limpo, profissional e elegante, afastando-se de clichês visuais genéricos de IA para focar em alto contraste, superfícies sólidas, tipografia refinada (*Plus Jakarta Sans* e *Inter*) e toques sutis de dourado e ciano.
3. **Filtros Dinâmicos por Categoria:** Sistema instantâneo de abas na seção de projetos (`Todos`, `Web Applications`, `QA & Automação`, `Desktop & Mídia`, `Infra & Hardening`).
4. **Lightbox Modal Nativo com Carrossel:** Visualização de certificados e telas de projetos com paginação por setas, clique externo e atalhos de teclado (`ESC`, `←`, `→`).
5. **Responsividade Mobile-First:** Suporte completo à área segura de iPhones (Dynamic Island / Notch via `env(safe-area-inset-top)`), menu hambúrguer com transição suave e expansores de texto para reduzir a fadiga de rolagem.
6. **Toast System:** Notificações visuais nativas para feedback de ações do usuário.

---

## 🎯 Posicionamento Profissional

- **Suporte Técnico & HelpDesk:** Atendimento a incidentes críticos, totens NextQS, parque de impressão, controle de chamados via GLPI e suporte presencial/remoto a usuários.
- **Infraestrutura, Redes & Servidores:** Windows Server, Active Directory (GPOs, controle de acessos), Linux, switches, roteamento e gestão de nobreaks.
- **Garantia de Qualidade (QA) & Confiabilidade:** Automação de testes ponta a ponta (E2E) com Playwright, planos e cenários de testes, triagem e ciclo de vida de bugs (P0/P1/P2), validação de schemas (Zod/Pydantic) e telemetria de rede/console.
- **Automação & Full-Stack:** Desenvolvimento de bots, utilitários em Python, scripts PowerShell/Batch, ferramentas web com FastAPI, React e Next.js.
- **Cibersegurança Defensiva:** Kaspersky EDR, conformidade LGPD, políticas de MFA, hardening de estações de trabalho e estratégias de backup resilientes.

---

## 📦 Projetos Exibidos na Vitrine (13 Aplicações)

| Projeto | Categoria | Tecnologias Principais | Status |
|---|---|---|---|
| **How To Complete Dex** | Web Application | React 19, TypeScript, Vite, Tailwind v4, Zustand, Supabase | [Online 🟢](https://how-to-complete-dex.vercel.app) |
| **BugSync Bot** | QA & Confiabilidade | Python, discord.py, Google Sheets API, Apps Script Webhooks | Ativo ⚡ |
| **Suíte de Ferramentas Web** | Ferramenta Corporativa | ReactJS, FastAPI, WebSockets, Active Directory, Engine TIFF | Em Produção 🏢 |
| **DevPad 🦾** | Web Application | Next.js 16, TypeScript, Prisma ORM, Supabase RLS, TipTap | Open Source 📦 |
| **FrameStudio PRO 🎬** | Desktop & Mídia | Python, OpenCV, PyAV (FFmpeg), Canvas RGB, RAM Cache | Open Source 📦 |
| **MediaDownloader Pro** | Full-Stack / Utilitário | FastAPI, Vanilla JS SPA, SSE em tempo real, yt-dlp, SQLite | Open Source 📦 |
| **Finance App & Investment Hub** | Web Application | Next.js App Router, TypeScript, Zustand, APIs Real-Time | Open Source 📦 |
| **I Love Security 🛡️❤️** | Cibersegurança & Privacidade | Python, FastAPI, IA Local (Zero Data Leak), Canvas | Open Source 📦 |
| **Relíquias Itaboraí — Motor Hub** | Web Application | Vanilla JS, Supabase BaaS, PostgreSQL, Vercel | [Online 🟢](https://site-reliquias-itaborai.vercel.app) |
| **RMS Marcenaria e Reformas** | Landing Page Comercial | React 19, Vite, Tailwind CSS v4, Lucide React, WhatsApp | Online 🟢 |
| **⚡ Otimizador de Windows 10/11** | Infra & Hardening | PowerShell, Batch Script, Mitigação de Telemetria | Open Source 📦 |
| **Monitor de Preços de Skins (Steam)** | Automação Desktop | Python, HTTP REST Polling, Plyer OS Alerts | Open Source 📦 |
| **Interactive Anniversary Template 💌** | UI & Animação 3D | HTML5, CSS 3D Animations, Vanilla JS, Audio API | [Online 🟢](https://interactive-anniversary-template.netlify.app/) |

---

## 🗂️ Estrutura do Repositório

```text
/
├── index.html          # Estrutura semântica (W3C, SEO, Open Graph e Acessibilidade)
├── css/
│   └── style.css       # Design System Dark Slate & Gold, grid responsivo e microinterações
├── js/
│   └── main.js         # Filtros dinâmicos, Lightbox Modal com carrossel e Observers
├── imgs/
│   ├── foto-rosto.jfif # Fotografia de perfil profissional
│   ├── certificados/   # Diplomas em imagem (.jpg e .png) e sub-certificados modulares
│   └── projetos/       # Capturas de tela dos sistemas em produção
├── README.md           # Manual de operação e síntese do projeto
└── HISTORICO.md        # Diário de bordo e decisões arquiteturais
```

---

## 🚀 Status e Deploy
- **Ambiente:** GitHub Pages na raiz (`https://raphael-c-martins.github.io/`).
- **Validação:** Auditado via Playwright MCP em viewport Full HD (1920x1080) e Mobile (390x844), com 0 erros de JavaScript no console.
