# Currículo Virtual & Portfólio Tecnológico — Raphael C. Martins

Site do currículo pessoal e portfólio de engenharia de software e infraestrutura, construído sob rigorosos padrões de performance (Zero Dependências externas no client-side), acessibilidade e design de alta densidade.

## 🔗 Acesso Online
> **Deploy:** [https://raphael-c-martins.github.io/](https://raphael-c-martins.github.io/)

---

## 🏛️ Filosofia de Construção & Arquitetura

O projeto foi inteiramente construído em **Vanilla Puro (HTML5 + CSS3 + JavaScript)**:
1. **Zero Frameworks Client-Side:** Nenhuma biblioteca pesada de frontend (React, Vue, jQuery) no client. Toda a navegação, filtros dinâmicos e modais rodam no motor nativo do navegador.
2. **Identidade Visual Dark Slate & Ouro Nobre:** Design limpo, sóbrio e profissional, afastando-se de clichês visuais e excesso de cores para focar em alto contraste, superfícies sólidas, tipografia refinada (*Plus Jakarta Sans* e *Inter*) e toques sutis em ouro suave.
3. **Filtros Dinâmicos por Categoria:** Sistema instantâneo de abas na seção de projetos (`Todos`, `Web Applications`, `QA & Automação`, `Desktop & Mídia`, `Infra & Hardening`).
4. **Lightbox Modal Nativo com Carrossel:** Visualização de certificados e telas de projetos com paginação por setas, clique externo e atalhos de teclado (`ESC`, `←`, `→`).
5. **Responsividade Mobile-First:** Suporte completo à área segura de iPhones (Dynamic Island / Notch via `env(safe-area-inset-top)`), menu hambúrguer com transição suave e expansores de texto para reduzir a fadiga de rolagem.
6. **Toast System:** Notificações visuais nativas para feedback de ações do usuário.

---

## 🎯 Posicionamento Profissional

- **Suporte Técnico & HelpDesk:** Atendimento a incidentes críticos, totens NextQS, parque de impressão, controle de chamados via GLPI e suporte presencial/remoto a usuários.
- **Infraestrutura, Redes & Servidores:** Windows Server, Active Directory (GPOs, controle de acessos), virtualização bare-metal com Proxmox VE (gestão de VMs e containers), configuração de arranjos RAID (RAID 0 de alta performance), Linux (Debian/Ubuntu), switches, roteamento e nobreaks.
- **Garantia de Qualidade (QA) & Confiabilidade:** Automação de testes ponta a ponta (E2E) com Playwright, planos e cenários de testes, triagem e ciclo de vida de bugs (P0/P1/P2), testes de regressão e telemetria de rede/console.
- **Automação & Full-Stack:** Desenvolvimento de bots, utilitários em Python, scripts PowerShell/Batch, ferramentas web com FastAPI, React e Next.js.
- **IA Agêntica, DevTools & APIs:** Engenharia de agentes e pair programming com Anti-Gravity e Claude Code, servidores MCP (Model Context Protocol), criação de Skills e Workflows autônomos, Git/GitHub e consumo de APIs REST.
- **Cibersegurança Defensiva:** Kaspersky EDR, conformidade LGPD, políticas de MFA, hardening de estações de trabalho e estratégias de backup resilientes.

---

## 📦 Projetos Exibidos na Vitrine (13 Aplicações)

| Projeto | Categoria | Tecnologias Principais | Status |
|---|---|---|---|
| **Suíte de Ferramentas Web** | Ferramenta Corporativa | React, FastAPI, Bot Assistente IA ("Jarvis"), Active Directory, Proxmox VE, Storage NAS, SRE | Em Produção 🏢 (12 Telas) |
| **How To Complete Dex** | Web Application | React 19, TypeScript, Vite, Tailwind v4, Zustand, Supabase | [Online 🟢](https://how-to-complete-dex.vercel.app) |
| **BugSync Bot** | QA & Confiabilidade | Python, discord.py, Google Sheets API, Apps Script Webhooks | Ativo ⚡ |
| **DevPad** | Web Application | Next.js 16, TypeScript, Prisma ORM, Supabase RLS, TipTap | Projeto Privado 🔒 |
| **FrameStudio PRO** | Desktop & Mídia | Python, OpenCV, PyAV (FFmpeg), Canvas RGB, RAM Cache | Open Source 📦 |
| **MediaDownloader Pro** | Full-Stack / Utilitário | FastAPI, Vanilla JS SPA, SSE em tempo real, yt-dlp, SQLite | Open Source 📦 |
| **Finance App & Investment Hub** | Web Application | Next.js App Router, TypeScript, Zustand, APIs Real-Time | Projeto Privado 🔒 |
| **I Love Security** | Cibersegurança & Privacidade | Python, FastAPI, IA Local (Zero Data Leak), Canvas | Open Source 📦 |
| **Relíquias Itaboraí — Motor Hub** | Web Application | Vanilla JS, Supabase BaaS, PostgreSQL | Projeto Privado 🔒 |
| **RMS Marcenaria e Reformas** | Landing Page Comercial | React 19, Vite, Tailwind CSS v4, Lucide React, WhatsApp | Online 🟢 |
| **Otimizador de Windows 10/11** | Infra & Hardening | PowerShell, Batch Script, Mitigação de Telemetria | Open Source 📦 |
| **Monitor de Preços de Skins (Steam)** | Automação Desktop | Python, HTTP REST Polling, Plyer OS Alerts | Open Source 📦 |
| **Interactive Anniversary Template** | UI & Animação 3D | HTML5, CSS 3D Animations, Vanilla JS, Audio API | [Online 🟢](https://interactive-anniversary-template.netlify.app/) |

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
