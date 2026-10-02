# 🏛️ Histórico Arquitetural e Decisões de Engenharia

Este documento atua como diário de bordo e central de auditoria arquitetural do projeto, em estrita conformidade com as diretrizes de Engenharia Sênior (Alta Disponibilidade, Segurança e Padronização).

## 🚀 Entregas e Evolução

### [2026-10-02] - Mobile UX: Botão Flutuante Arrastável (Draggable FAB) com Snap Magnético & Calibração de Navegação
- **Decisão:** Implementação de capacidade de arraste inteligente (Draggable FAB) com snap magnético lateral e persistência local para o botão flutuante de alternância de tema, refinamento ergonômico dos links do menu mobile e harmonização do cabeçalho da barra de navegação.
- **Racional:** Em telas compactas de smartphones, botões flutuantes fixos podem obstruir a leitura de textos, nomes de certificados ou detalhes de projetos. Permitir que o usuário reposicione o botão livremente para qualquer borda da tela sem disparar acidentalmente a troca de tema nem travar a rolagem da página eleva o nível de usabilidade a padrões nativos de sistemas móveis (semelhante ao AssistiveTouch do iOS).
- **Execução:**
  - **Draggable FAB com Snap Magnético e Prevenção de Falsos Toques:**
    - Manipulação de eventos de ponteiro nativos (`Pointer Events`: `pointerdown`, `pointermove`, `pointerup`) com captura de ponteiro (`setPointerCapture`) e limite de sensibilidade de 6px (`Math.hypot`) para diferenciar cliques intencionais de arrastes.
    - Bloqueio de gestos nativos de rolagem da tela sobre o botão móvel via `touch-action: none` e `-webkit-touch-callout: none`.
    - Feedback tátil visual imediato durante o movimento: escala de 1.14 (`.is-dragging`) e elevação com sombreamento dinâmico adaptado a temas escuro e claro.
    - Snap magnético automático para a lateral mais próxima (esquerda ou direita com margem de segurança de 16px) utilizando curva suave `cubic-bezier(0.18, 0.89, 0.32, 1.28)`.
    - Preservação da altura vertical (`Y`) onde o elemento foi solto, com limitação de segurança para não ultrapassar a barra de navegação superior nem a barra inferior do dispositivo.
    - Persistência da coordenada preferida no `localStorage` (`rcm_fab_pos`) e restauração automática ao navegar, recarregar a página ou rotacionar o aparelho.
    - Limpeza de estilos inline e retorno à posição padrão (`bottom: 28px; right: 28px;`) em resoluções desktop (> 900px).
  - **Menu Mobile e Responsividade:**
    - Ajuste nos espaçamentos dos links de navegação mobile (`gap: 14px`, cards ergonômicos em pílula com `border-radius: 14px` e padding de 13px).
    - Unificação do fundo do cabeçalho ao abrir o menu (`body.menu-locked #navbar`) eliminando qualquer descontinuidade de cor no topo.
    - Ocultação suave do botão flutuante quando o menu mobile estiver expandido (`body.menu-locked .theme-toggle-wrapper`).

### [2026-10-02] - Atualização Curricular, Theme Manager, Hardening de Segurança & Calibração de UX
- **Decisão:** Reestruturação e modernização completa da grade de Cursos & Certificações, consolidação dos 12 projetos em grade 3 colunas com visualizadores de galeria, implementação do tema Claro como padrão executivo via View Transitions API, hardening completo de segurança no formulário/toast e calibração fina de espaçamentos verticais.
- **Racional:** Alinhar o portfólio às competências reais de Infraestrutura, Nuvem, Cibersegurança e QA, entregando uma experiência de alto padrão para recrutadores com código seguro, sem dead space e protegido contra exploração (XSS, spam de formulário, floods).
- **Execução:**
  - **Segurança Defensiva e Anti-Abuse:**
    - **Rate Limiting Anti-Flood:** Bloqueio inteligente no envio de mensagens com cooldown temporal de 45s e persistência em `localStorage` para prevenir DoS/DDoS no cliente de e-mail.
    - **Honeypot Invisível Anti-Bot:** Inclusão de input oculto para armadilha de crawlers automáticos, descartando envios maliciosos silenciosamente.
    - **Limites Estritos de Input:** Adição de `maxlength` e `minlength` rigorosos em todos os campos do formulário (Nome até 70 chars, E-mail até 80 chars, Meio de Contato até 30 chars, Mensagem até 1500 chars com contador dinâmico e alertas visuais).
    - **Blindagem XSS no Toast System:** Construção de toasts e sugestões de e-mail via manipulação de nós DOM nativos (`createElement`/`textContent`), eliminando qualquer risco de Cross-Site Scripting.
    - **Política de Cabeçalho:** Adição de `Referrer-Policy: strict-origin-when-cross-origin` para preservação de integridade de tráfego.
  - **Padronização de Tema Claro (Light Default):**
    - Definição de `data-theme="light"` como padrão no `<html>`, `localStorage`, script anti-FOUC do `<head>` e no `js/main.js`.
    - Alternador flutuante no canto inferior direito com suporte à *View Transitions API* (expansão radial geométrica calculada com `Math.hypot` a partir da origem do clique) e fallback por ripple CSS.
    - Paleta executiva Slate (`#0f172a`, `#334155`, `#64748b`) com alto contraste e legibilidade imediata.
  - **Calibração de Layout & Densidade de Informação (UX):**
    - **Eliminação de Vácuo no Hero:** Remoção do `min-height: 94vh` forçado, ajustando o espaçamento para uma transição suave e integrada até a seção Sobre.
    - **Harmonização do Contato:** Reposicionamento do card de *Disponibilidade Profissional* no centro vertical entre o texto de abertura e os 4 botões de contato direto.
    - **Grade de Projetos (12 Projetos):** Unificação em layout de 3 colunas perfeitamente alinhadas com carrosséis de telas censuradas/privadas e tags sem quebra indevida de texto.
  - **Reestruturação de Cursos & Certificações:**
    - Substituição do bootcamp legado de Java pelo curso prático *Windows Server, Active Directory & Microsoft Azure (25h) — DICARJ (Udemy)*, com foco em Hyper-V HA, pfSense, Zabbix e nuvem Azure.
    - Adição de descrições técnicas densas para os cards *Endpoint Security (27h) — Cisco Networking Academy* e *Bootcamp Cibersegurança #2 (28h) — Santander (DIO.me)* com ementas aprofundadas.
    - Separação de escopo na galeria Santander: diploma principal de 28h no topo e stack de 21 mini-certificados na navegação inferior.
  - **Lightbox Modal & Licença:**
    - **Ergonomia e Desobstrução Mobile:** Desacoplamento do botão de fechamento (`.lightbox-close`) do container de mídia para fixação nativa no canto superior direito da tela (`top: calc(18px + env(safe-area-inset-top)); right: 18px;`), eliminando qualquer sobreposição ao cabeçalho ou selos de certificados.
    - **Navegação Elevada no Mobile:** Reposicionamento das setas (`.lightbox-nav`) a `110px` da base inferior, garantindo alcance ergonômico dos polegares (one-hand workflow) sem colisão com a barra de endereços do navegador móvel.
    - **Desktop UX:** Botão de fechamento fixado no canto superior direito (`top: 24px; right: 28px;`) e setas laterais centralizadas.
    - Conversão do arquivo `LICENSE` para o regime de *Todos os Direitos Reservados (All Rights Reserved)*.

### [2026-04-20] - Setup de Infraestrutura (GitHub Pages)
- **Decisão:** Alteração do nome do repositório para `raphael-c-martins.github.io`.
- **Racional:** Promover o deploy nativo diretamente na raiz do domínio provido pelo GitHub Pages, garantindo maior profissionalismo (remoção do sub-path `/web-curriculo`).
- **Execução:**
  - Repositório renomeado via GitHub Settings.
  - Remote local atualizado com sucesso (`git remote set-url origin`).
  - Deploy configurado para build auto da branch `master` no diretório root `/`.

### [2026-04-20] - Refatoração UI/UX (Tema Lotus JPS)
- **Decisão:** Transição da paleta de cores primária (Roxo/Azul "Genérica tech") para Ouro Metálico (`#D4AF37`) sobre Preto Absoluto (`#070707`).
- **Racional:** Implementar uma estética extremamente assertiva e minimalista, incorporando referências sutis de engenharia de alta performance e motorsport (Ayrton Senna's John Player Special Lotus), sem comprometer o profissionalismo focado na área de TI.
- **Execução:**
  - Fonte JetBrains Mono setada como principal nas tags e links de navbar para assemelhar a painéis de telemetria.

### [2026-04-20] - Certifications UI & Lightbox System
- **Decisão:** Desenvolvimento de uma Galeria Modal (Lightbox) nativa (`Vanilla JS`) para visualização segura de diplomas diretamente na página, e descarte de certificados de base para preservar a Senioridade do portfólio.
- **Execução:**
  - Inserção de atributos `data-cert` nos botões para isolar os componentes dinâmicos no JS.
  - Implementação de modal full-screen com fundo fumê interativo e fechamento via `ESC` e `Click-out`.
  - Novos escopos incorporados: Atividade Extracurricular Lógica (Estácio) e Treinamento Profissionalizante de Excel Avançado.

### [2026-04-20] - Refinamento de Copywriting (Tom de Voz)
- **Decisão:** Substituição de jargões técnicos excessivos (ex: *Daemon*, *Parsing*, *Senior*, *Bottleneck Analysis*) por descrições didáticas em Português limpo.
- **Racional:** Aproximar o portfólio de recrutadores não-técnicos e gestores de RH, mantendo alta sofisticação sem inflar títulos. A comunicação torna-se honesta, direta e exalta utilidade prática do software.
- **Execução:**
  - Descrições massivamente simplificadas em todas as esferas de Projetos e Timeline.

### [2026-04-21] - Indexação de Projetos (Trindade Full-Stack)
- **Decisão:** Lançamento da grade interativa com três pilares técnicos:
  1. Otimizador Ultimate de SO (Infra, Hardening/Scripts).
  2. Monitor Steam (Desenvolvimento Back-end/Automação em Python e Consumo de API).
  3. Landing Page Customizada (Front-End Avançado com UI/UX apurada e motor de CSS puro).
- **Racional:** Provar versatilidade (Full-Stack real) e zelo por código autoral.
- **Execução:**
  - Setup dinâmico no `index.html` aplicando a mesma linguagem visual do currículo.
  - Alinhamento Geométrico Robusto na grade: aplicação de Flexbox híbrido (`display: flex; flex-direction: column; height: 100%`) nos Cards com `margin-top: auto` nos botões de finalização garantindo Grid perfeitamente alinhado verticalmente independente da assimetria do texto.

### [2026-04-21] - Lightbox Carousel & Contact APIs
- **Decisão:** Refatoração do script de Modal para suportar paginação Dinâmica (Modelo Carrossel) via JS Puro e conexão de comunicação instantânea.
- **Racional:** Eliminar o uso desorganizado de "Múltiplos Botões Tetris" no preview de múltiplos arquivos visuais e entregar a melhor experiência Desktop UX possível, além de escalar conversão no footer via integrações Diretas.
- **Execução:**
  - Mecanismo de leitura adaptativo em JS para `data-gallery` que fatia arrays via split.
  - Setas responsivas construídas via CSS com listeners de teclado (`ArrowLeft / ArrowRight`).
  - Atualização do Botão de Telefone para o Handler de API nativo `wa.me/` do WhatsApp.

### [2026-04-21] - Refinamento de Identidade (Foco em Infra/HelpDesk)
- **Decisão:** Reformulação do tom de voz da Hero Section e do "Sobre" para refletir com precisão o papel atual de profissional de Infraestrutura, Suporte HelpDesk e Automação corporativa, abandonando o enquadramento primário de "desenvolvedor front-end".
- **Racional:** Portfólio deve comunicar com clareza e honestidade para recrutadores da área de TI. A linha de abertura genérica foi substituída por uma descrição direta do papel operacional real: suporte, infraestrutura, GPOs, redes, automação.
- **Execução:**
  - Hero summary e texto do Sobre totalmente reescritos em primeira pessoa com foco técnico-operacional.
  - Typed Effect (efeito de digitação) atualizado com as frases: `Suporte Técnico (HelpDesk) 🔧`, `Infraestrutura & Redes 🌐`, `Automação de Rotinas de TI ⚡`, `Cibersegurança Defensiva 🛡️`.
  - Seção de Experiência: remoção do job de marcenaria; adição do cargo `Auxiliar de Cartório no Setor de TI` (jun 2025 – atual) com 6 subdivisões técnicas agrupadas por disciplina (HelpDesk, Infra/Redes, AD/Cyber, Automação, Operações, Compliance).
  - Mantido e refinado: card de Estagiário de TI (set 2024 – mai 2025) como sub-entrada aninhada no mesmo artigo.

### [2026-04-21] - Indexação do Projeto Suite de Ferramentas (Destaque Full-Width)
- **Decisão:** Adição do projeto "Suíte de Ferramentas Web (Hub Operacional)" como card de destaque em largura total (`grid-column: 1 / -1`) na grade de Projetos, com descrição técnica aprofundada.
- **Racional:** Este é o projeto de maior complexidade arquitetural do portfólio (SPA ReactJS + FastAPI assíncrono + WebSockets), validando a capacidade de engenharia full-stack em ambiente de produção real do cartório. Exige tratamento de destaque visual e descritivo no portfólio.
- **Execução:**
  - Card posicionado como primeiro item, visualmente diferenciado com `border-left: 4px solid var(--accent)` e label `Ferramenta Interna Corporativa`.
  - Descrição narrativa em PT-BR cobrindo as três vertentes do sistema: Monitoramento de Infra/AD, Manipulação em Lote de .TIF/PDF e Gerenciamento/Auditoria de Dados.
  - Botão de galeria via `data-gallery` apontando para 7 capturas de tela reais do sistema (suite1.png → suite7.png).
  - Tags de tecnologia destacadas: `ReactJS + FastAPI`, `WebSockets em Tempo Real`, `Monitoramento de LOGs & AD`, `Manipulação IO Avançada (.TIF)`, `UI Glassmorphism`.

### [2026-04-21] - Documentação Técnica da Suite (Copywriting de Engenharia)
- **Decisão:** Redação de uma descrição técnica impactante e recrutador-friendly para a Suite de Ferramentas, baseada em análise detalhada do projeto original (backend Python/FastAPI + frontend React).
- **Racional:** A primeira versão da descrição usava linguagem muito abstrata. A nova versão equilibra precisão técnica (async, WebSockets, engine TIFF) com acessibilidade para gestores não-técnicos, seguindo o protocolo de Copywriting de Engenharia do agente.
- **Execução:**
  - Análise real dos módulos do projeto: rotas FastAPI, componentes React, scripts utilitários e arquivos de automação.
  - Texto final aprovado: descreve a evolução de "utilitários isolados" para "Aplicação Web Moderna e Assíncrona", detalha os 3 pilares (Monitoramento AD, Manipulação IO em lote, Gerenciamento de Dados com Live Polling).
  - Confidencialidade preservada: sem exposição de caminhos de rede internos, IPs ou dados organizacionais sensíveis.

### [2026-04-22] - Otimização de Responsividade & UX Mobile (Deep-Focus)
- **Decisão:** Implementação de uma arquitetura mobile-first robusta para garantir que a "Brutalidade Operacional" se traduza perfeitamente em telas pequenas (9:16).
- **Racional:** O portfólio apresentava gargalos visuais em iPhones (notch) e excesso de scroll vertical na seção de experiência. A atualização foca em economia de espaço e navegação intuitiva.
- **Execução:**
  - **Navbar Adaptativa:** Inclusão de `env(safe-area-inset-top)` para evitar sobreposição do conteúdo pela Dynamic Island/Notch em dispositivos iOS.
  - **Menu Hamburger "Zero-Leak":** Implementação de menu lateral via JS Puro com tríade de controle `transform: translateY(-8px)`, `visibility: hidden` e `pointer-events: none`. Isso garante que cliques acidentais não ocorram enquanto o menu está invisível e remove o "vazamento" de itens para a área da navbar.
  - **Mobile CTA Tuning:** Ajuste do botão de contato no menu mobile para `width: auto` e `align-self: center`, mantendo o aspecto de botão e evitando o estiramento visual comum em layouts mobile genéricos.
  - **Sistema de Duties Expansível (Ver mais/menos):** Introdução de lógica em JS para truncar listas longas de responsabilidades profissionais. Exibe-se apenas os 3 primeiros itens por padrão no mobile, com um trigger estilizado (`.expand-trigger`) para revelar o conteúdo completo, reduzindo drasticamente a fadiga de scroll.
  - **Ajustes de Viewport Lightbox:** Reposicionamento das setas de navegação da galeria para o interior da tela (`left: 8px` / `right: 8px`) em telas menores que 768px, prevenindo que os controles fiquem fora da área de toque.

### [2026-04-28] - Indexação de Novo Projeto (I Love Security) e Atualização de Copy
- **Decisão:** Inclusão do projeto open-source "I Love Security" e atualização da descrição do "Otimizador Ultimate" no portfólio.
- **Racional:** Manter a vitrine técnica atualizada com ferramentas focadas em Privacidade (Zero Data Leak) e Alta Disponibilidade, alinhando as descrições de projetos legados ao padrão de "Brutalidade Operacional" e cibersegurança defensiva.
- **Execução:**
  - `index.html` atualizado com o card do I Love Security enfatizando arquitetura SPA e processamento offline (Vanilla JS / FastAPI).
  - Descrição do Otimizador reescrita para destacar os benefícios de Hardening e mitigação de telemetria.

### [2026-04-29] - Integração Bootcamp DIO Santander & UX de Mini Cards
- **Decisão:** Inclusão do Bootcamp de Cibersegurança #2 (Santander/DIO) com exibição hierárquica de 22 certificados.
- **Racional:** O curso entrega uma grande quantidade de sub-certificados modulares. Para evitar poluição visual e "encher linguiça" de forma elegante, implementei uma estrutura de "mini cards" empilhados que servem como atalhos para a galeria, mantendo o foco no certificado de conclusão principal.
- **Execução:**
  - **Conversão Automatizada:** Script PowerShell via Ghostscript para converter 22 PDFs em imagens PNG otimizadas (150 DPI) para web.
  - **Interface de Empilhamento (Stack UI):** Criação de `.cert-sub-stack` no CSS com margens negativas e efeito de profundidade (box-shadow + z-index no hover) para simular um maço de certificados físicos.
  - **Aprimoramento do Lightbox JS:** Refatoração da lógica de abertura para suportar `startIndex`, permitindo que o clique em um sub-certificado específico abra a galeria exatamente naquela imagem.
  - **SEO & Contexto:** Extração de tópicos técnicos dos certificados (Pentest, Ransomware, Engenharia Social) para fortalecer as keywords da seção de cursos.

### [2026-09-30] - Grande Atualização de Portfólio, Catálogo Completo de Projetos & Foco em QA
- **Decisão:** Refatoração visual e estrutural completa do portfólio pessoal, com inclusão de todos os 13 projetos desenvolvidos na raiz do ambiente, destaque especial para a área de Garantia de Qualidade (QA & Automação de Testes) e novo Design System sofisticado (Dark Slate & Gold) livre do aspecto genérico de IA.
- **Racional:** Desde a versão inicial do currículo, diversos novos sistemas de alta complexidade foram construídos (como o *How To Complete Dex*, *BugSync Bot*, *DevPad*, *FrameStudio PRO*, *Finance App* e *MediaDownloader*). Além disso, a evolução profissional recente direcionou o foco para vagas em Garantia de Qualidade (QA) e Confiabilidade de Software, exigindo uma vitrine técnica com filtros claros por categoria, métricas de impacto e copywriting humanizado e autêntico.
- **Execução:**
  - **Filtros Dinâmicos de Projetos:** Implementação nativa via JavaScript (`data-filter` / `.is-hidden`) com 5 abas ativas: *Todos (13)*, *Web Applications (7)*, *QA & Automação (2)*, *Desktop & Mídia (3)* e *Infra & Hardening (2)*, permitindo que recrutadores filtrem instantaneamente as soluções desejadas sem recarregar a página.
  - **Destaque em Qualidade de Software (QA):** Criação de um bloco destacado na seção de Habilidades (*Playwright E2E*, *Triagem P0-P2*, *Test Plans*, *Sincronização Discord/Sheets* com o *BugSync Bot* e *Auditoria de Rede/Console*) e adição de curso prático de QA na seção de certificações.
  - **Design System sem Cara de IA:** Substituição do efeito de digitação mecânico por uma Hero Executiva com cartões de métricas de impacto (13 projetos, QA Playwright, Infra no 2º Ofício, 500h+ de formação). Adoção da fonte *Plus Jakarta Sans* para títulos encorpados combinada com *Inter* para leitura suave e *JetBrains Mono* para metadados e tags.
  - **Indexação dos 13 Projetos:**
    1. *How To Complete Dex* (Web App / Tracker & Map Editor no Vercel)
    2. *BugSync Bot* (QA & Discord & Sheets)
    3. *Suíte de Ferramentas Web* (Corporativo Cartório - destaque com galeria de 7 telas)
    4. *DevPad* (Next.js 16, Prisma ORM, Supabase RLS)
    5. *FrameStudio PRO* (Desktop, OpenCV, PyAV, Caching RAM)
    6. *MediaDownloader Pro* (FastAPI, Vanilla JS, SSE em tempo real)
    7. *Finance App & Investment Hub* (Next.js App Router, cotações em tempo real)
    8. *I Love Security* (FastAPI, IA Local, Zero Data Leak)
    9. *Relíquias Itaboraí* (Acervo automotivo, painel administrativo e CRM)
    10. *RMS Marcenaria e Reformas* (Landing page comercial com simulador WhatsApp)
    11. *Otimizador de Windows 10/11* (PowerShell/Batch, hardening SO)
    12. *Monitor de Preços de Skins Steam* (Automação Python)
    13. *Interactive Anniversary Template* (CSS 3D e animações imersivas)
  - **Novos Bootcamps:** Inclusão do *Bootcamp Bradesco — GenAI, Dados & Cybersecurity* e *Heineken — IA Aplicada a Dados com Copilot*.
  - **Garantia de Qualidade E2E:** Validação visual e funcional completa realizada via Playwright MCP nos viewports Desktop (1920x1080) e Mobile (390x844), confirmando 0 erros de JavaScript no console.

### [2026-09-30] - Refinamento Estético, Sobriedade Visual e Reequilíbrio de Conteúdo
- **Decisão:** Refinamento geral da identidade visual e reequilíbrio textual do portfólio para afastar qualquer aspecto de "código genérico de IA" ou sobrecarga sensorial (vibecoding), eliminando cores neon concorrentes, retirando emojis de títulos e reposicionando o escopo de atuação profissional.
- **Racional:** O excesso de cores vibrantes simultâneas (ciano, roxo, laranja) e o uso de emojis nos títulos comprometiam a sobriedade executiva e o profissionalismo do currículo. Além disso, embora haja interesse em vagas de QA, o perfil do profissional é multidisciplinar (com forte vivência prática em suporte, infraestrutura, desenvolvimento e cibersegurança), exigindo que a narrativa do portfólio equilibrasse esses pilares sem hiperfocar exclusivamente em QA.
- **Execução:**
  - **Paleta Unificada e Sóbria:** Eliminação de `--accent-cyan`, `--accent-purple` e `--accent-orange`. Adoção de uma paleta coesa em tom de ouro suave (`#c9a84c`) com superfícies em cinza ardósia neutro e verde discreto apenas no indicador de status "Online".
  - **Remoção de Emojis:** Todos os títulos de projetos na vitrine foram limpos (ex: *DevPad*, *FrameStudio PRO*, *Finance App*, *I Love Security*, *Otimizador de Windows*, *Interactive Anniversary Template*).
  - **Reequilíbrio do "Sobre mim" e Hero:** Subtítulo do hero reordenado para `Infraestrutura & Suporte · Desenvolvimento Full-Stack · Automação & QA`. Texto biográfico reescrito para exaltar a versatilidade operacional, posicionando QA como área de aprendizado contínuo e aprofundamento.
  - **Trajetória no Cartório Ampliada:** Inclusão formal de dois marcos técnicos fundamentais na experiência do 2º Ofício:
    1. Desenvolvimento da *Suíte de Ferramentas Web* proprietária para monitoramento de infraestrutura, Active Directory e processamento massivo de arquivos.
    2. Atuação no redesenho e reestruturação da rede corporativa interna para ganhos de estabilidade e segmentação.
  - **Correção da Formação Acadêmica:** Sincronização da previsão de formatura no curso de Ciência da Computação para dezembro de 2027.
  - **Hero Monumental & Typed Effect Dinâmico:**
    - Restauração da arquitetura monumental do nome em três níveis: `Raphael` (branco), `Chernicharo` (ouro nobre) e `Martins` (branco), conferindo simetria vertical e valorizando a identidade visual do sobrenome com alto impacto.
    - Reativação do efeito de digitação dinâmico (*Typed Effect*) com cursor pulsante, alternando entre as competências: *Suporte Técnico (HelpDesk)*, *Infraestrutura & Redes*, *Automação de Rotinas com Python*, *Garantia de Qualidade & QA*, *Desenvolvimento Full-Stack* e *Cibersegurança Defensiva*.
    - Preservação da saudação de abertura `OLÁ, MUNDO 👋` e dos 4 cartões executivos de métricas de impacto logo abaixo (`13 Projetos`, `QA & E2E`, `Infra & AD`, `500h+`).
  - **Autenticidade Técnica & Expansão em IA Agêntica:**
    - Remoção de "Validação de Schemas (Zod / Pydantic)" para manter 100% de autenticidade no bloco de QA.
    - Reestruturação do bloco de DevTools para "DevTools, IA Agêntica & APIs", destacando competências modernas em engenharia de agentes: *Anti-Gravity*, *Claude Code*, *MCP (Model Context Protocol)*, *Skills & Workflows* e *APIs REST & Integrações*.
  - **Validação Visual Rigorosa:** Verificação e aprovação de cada viewport e seção via Playwright MCP.

### [2026-09-30] - Harmonização da Grade de Projetos & Correção de Quebras de Layout e Tipografia
- **Decisão:** Unificação da grade da vitrine de projetos (`.projects-grid`) em um layout contínuo de 3 colunas, eliminando o esticamento forçado (`grid-column: 1 / -1`) do card da Suíte de Ferramentas Web e substituindo o alinhamento justificado (`text-align: justify`) por alinhamento natural à esquerda (`text-align: left`).
- **Racional:** A presença de um único card com largura total no meio da grade (após dois cards padrão) causava uma quebra visual abrupta e criava um vão preto (espaço vazio de 1 coluna) na primeira fileira em telas desktop (1920x1080), além de provocar desbalanceamento na filtragem por categorias. Paralelamente, o `text-align: justify` em cartões de largura moderada gerava espaçamentos artificiais entre palavras e quebras estranhas (como "Living-" e "Dex." separados).
- **Execução:**
  - **Grade Uniforme:** Remoção de `grid-column: 1 / -1` de `.project-card--featured`, permitindo que a *Suíte de Ferramentas Web* ocupe a terceira coluna da primeira fileira lado a lado com *How To Complete Dex* e *BugSync Bot*.
  - **Síntese de Conteúdo:** Descrição do Hub Operacional sintetizada com precisão (destacando tanto o monitoramento de AD quanto o motor de alta velocidade para .TIFF/PDF), mantendo a altura do cartão 100% alinhada com os cartões vizinhos.
  - **Tipografia Fluida:** Aplicação de `text-align: left` com `word-break: normal` e `hyphens: none` nas descrições e `Living&#8209;Dex` com hífen inquebrável, eliminando espaçamentos forçados.
  - **Cache Busting:** Inclusão de versionamento no stylesheet (`style.css?v=2`) para garantir propagação instantânea sem retenção de cache pelo navegador.
  - **Validação E2E:** Auditado e aprovado com Playwright MCP nos filtros *Todos*, *Web Applications* e *QA & Automação*.

### [2026-09-30] - Auditoria Completa da Suíte de Ferramentas Web: Mapeamento de 11 Módulos, Nova Galeria & Orquestração Multi-Sistemas
- **Decisão:** Acesso ao ambiente corporativo em produção (`https://suite-de-ferramentas/`), varredura minuciosa de todos os subsistemas integrados, captura de 11 prints em alta resolução para a galeria e atualização aprofundada da descrição e tags do projeto, evidenciando sua arquitetura corporativa distribuída.
- **Racional:** A Suíte de Ferramentas Web não é apenas um painel administrativo pontual, mas o núcleo operacional (Hub SRE) de sustentação tecnológica do 2º Ofício de Itaboraí. Ela orquestra múltiplos protocolos e sistemas em simultâneo (Active Directory, Proxmox VE, Storage NAS via SMB/NFS, monitoramento 24/7 de 62 estações de trabalho, SACL NTFS de auditoria de arquivos e motor assíncrono para TIFF/PDF). Documentar toda essa envergadura técnica valoriza imensamente o portfólio.
- **Execução:**
  - **Mapeamento e Captura dos 11 Módulos Operacionais:**
    1. `suite1.png`: **Dashboard Central SRE & AD** — Telemetria de CPU/RAM/Disco local, monitoramento ICMP contínuo de 8 hosts (Servidores Windows, VMs, Proxmox, NAS e estações) e feed de últimos logons.
    2. `suite2.png`: **Inventário de Hardware/Software** — Mapeamento massivo de 62 computadores da rede com triagem de HD Crítico, antivírus, sistema operacional e alertas de permissão no AD.
    3. `suite3.png`: **Modal de Auditoria de Hardware Detalhado** — Ficha técnica profunda de cada estação (ex: ADM01), exibindo placa-mãe, CPU, memórias, discos e diagnósticos de conformidade.
    4. `suite4.png`: **Monitor de Acesso (Active Directory)** — Leitura em tempo real de eventos de logon/logoff com filtros por usuário, IP, MAC, data e sumarização diária.
    5. `suite5.png`: **Comparador de Arquivos Cartorários** — Ferramenta Side-by-Side com navegação por teclado e zoom para conferência e higienização de lotes RGI em rede SMB.
    6. `suite6.png`: **Deletor de Arquivos & Repositório Central RGI** — Mapeamento direto ao ponto de montagem Linux `/mnt/rgi/MATRMANUSCRITA` com busca exata/parcial e exclusão em lote.
    7. `suite7.png`: **Auditoria e Segurança (SRE)** — Terminal de logs 24/7 com live polling, rotação automática, histórico arquivado de meses e rastreabilidade total de exclusões com identificação de autor.
    8. `suite8.png`: **Auditoria de Protocolos (SACL NTFS)** — Rastreamento cirúrgico de criação, edição, deleção e permissões de arquivos na pasta de protocolos com telemetria contínua.
    9. `suite9.png`: **Central de Scripts e Automações** — Web Scraper automatizado para extração de tabelas com exportação Excel, auditoria de sequência de matrículas e renomeador em lote.
    10. `suite10.png`: **Testador de Hardware & Periféricos** — Interface de diagnóstico rápido para validação de teclas e botões de teclados (Logitech MK295 ABNT2/ANSI/TKL) e mouses em rotinas de HelpDesk.
    11. `suite11.png`: **Assistente Virtual Inteligente** — Chatbot interno integrado para consultas em linguagem natural de último acesso de usuários, saúde de servidores e atalhos rápidos.
  - **Atualização da Vitrine de Projetos:**
    - Subtítulo atualizado para: *Hub Central SRE, Active Directory & Orquestração Multi-Sistemas*.
    - Descrição reescrita evidenciando a complexidade do ecossistema distribuído e suas integrações simultâneas.
    - Tags atualizadas: *React + FastAPI*, *Active Directory & SACL*, *Cluster Proxmox VE*, *Auditoria Contínua 24/7*, *Storage NAS & SMB/NFS*, *WebSockets & SRE*, *Processamento .TIFF/PDF*.
    - Botão da galeria expandido para **11 Telas** com navegação contínua no Lightbox Modal.
  - **Segurança de Credenciais:** Assegurado estritamente que nenhuma credencial de acesso ou dado sensível seja exposto no código ou controle de versão.
  - **Telemetria de QA & Sincronização Google Sheets (`/qa-sheets-sync`):** Baterias de testes E2E sincronizadas com sucesso na planilha central *playwright-qa-testes* tanto na aba `raphael-c-martins.github.io` (ID da Execução `RUN-20260930-135253`, 5 cenários PASSED) quanto na aba `suite-de-ferramentas` (ID da Execução `RUN-20260930-135300`, 11 cenários PASSED cobrindo todos os 11 módulos corporativos).

---

### [2026-09-30] - Destaque do Bot Assistente Operacional IA ("Jarvis") & Expansão da Galeria para 12 Telas
- **Decisão:** Destaque arquitetural de primeiro nível para o **Bot Assistente Virtual Inteligente (estilo "Jarvis")** integrado à Suíte de Ferramentas Web, com captura de prints reais em conversação viva (`suite11.png` e `suite12.png`), enriquecimento do texto do card no portfólio e expansão da galeria para 12 telas.
- **Racional:** O assistente operacional opera como um copiloto autônomo (análogo ao Jarvis do Homem de Ferro), permitindo que a equipe de suporte e infraestrutura faça perguntas diretas em linguagem natural via chat modal. O bot consome em tempo real as APIs de telemetria e o histórico de eventos do Active Directory/SRE, entregando diagnósticos imediatos com botões de ação interativos dentro das mensagens, sem necessidade de navegar manualmente por múltiplos dashboards.
- **Execução:**
  - **Interação Viva e Capturas em Alta Resolução:**
    - `suite11.png`: Demonstração de pergunta em linguagem natural (*"o usuário raphael.martins se logou hoje?"*), com retorno analítico instantâneo do assistente listando as estações acessadas (`SV-2OFICIO-01`, `INFO03`), horários exatos, IPs e botão de atalho `[Ver Acessos de raphael.martins]`.
    - `suite12.png`: Consulta rápida de diagnóstico sistêmico (*"Saúde do Servidor"*), com retorno detalhado da telemetria (9 hosts online, 0 offline, status dos daemons de Ping Monitor, Discos e Auditoria 24/7 ativos) e atalho `[Ver Saúde dos Servidores]`.
  - **Refinamento no Portfólio (`index.html`):**
    - Subtítulo ajustado para: *Hub Central SRE, Active Directory & Assistente Operacional Inteligente*.
    - Descrição atualizada ressaltando o papel do Assistente Virtual integrado estilo "Jarvis" na tomada de decisões e suporte diário.
    - Nova tag com destaque visual: `<span class="tag--highlight">Bot Assistente IA ("Jarvis")</span>`.
    - Galeria modal ampliada para 12 imagens (`suite1.png` até `suite12.png`) com contador `(12 Telas)`.
  - **Documentação de Projeto (`README.md`):** Tabela de vitrine atualizada com o Bot Assistente IA e a nova contagem de telas.
  - **Telemetria de QA & Sincronização Google Sheets (`/qa-sheets-sync`):** Bateria de testes do Assistente Jarvis persistida na planilha central *playwright-qa-testes* na aba `suite-de-ferramentas` (ID da Execução `RUN-20260930-140414`, cenários `TC-JARVIS-01` e `TC-JARVIS-02` PASSED com validação de resposta estruturada e HTTP 200).

---

### [2026-09-30] - Layout Flagship Assíncrono: Suíte de Ferramentas Web em 2 Colunas & Paridade Visual
- **Decisão:** Reestruturação da grade de projetos (`.projects-grid`) em desktops (`@media (min-width: 900px)`), atribuindo `grid-column: span 2` e `grid-auto-flow: dense` para o card da *Suíte de Ferramentas Web (Hub Operacional)*, posicionado como projeto carro-chefe na primeira fileira ao lado de *How To Complete Dex* (1 coluna).
- **Racional:** A Suíte corporativa concentra alta densidade de recursos (Active Directory, Proxmox VE, storage NAS, telemetria de 62 estações e assistente Jarvis), tornando um card padrão de 1 coluna verticalmente esticado e sobrecarregado, o que gerava vazios visuais nos cards adjacentes. Ao conceder 2 espaços horizontais (largura de ~734px), a descrição e as 8 tags técnicas respiram naturalmente, nivelando a altura final do card pixel a pixel com o card vizinho e eliminando qualquer assimetria na visualização.
- **Execução:**
  - **CSS Grid (`style.css`):** Implementada regra `@media (min-width: 900px)` com `.projects-grid { grid-template-columns: repeat(3, 1fr); }` e `.project-card--featured { grid-column: span 2; }`.
  - **Hierarquia no HTML (`index.html`):** *Suíte de Ferramentas Web* posicionada como Item 1 (2 colunas) e *How To Complete Dex* como Item 2 (1 coluna), completando com perfeição matemática as 3 colunas da primeira linha.
  - **Preenchimento Automático (`grid-auto-flow: dense`):** Garante fluxo contínuo e responsivo na fileira seguinte (*BugSync Bot*, *DevPad*, *FrameStudio PRO*) e durante a filtragem dinâmica por categorias (*Web Applications*, *QA*, *Infra*).
  - **Validação E2E com Playwright MCP:** Auditado em 1920x1080 com alinhamento vertical dos botões de ação e verificação de todos os filtros de categoria.

---

### [2026-09-30] - Adequação de Projetos Privados: DevPad, Finance App & Relíquias Itaboraí (Transição para Galerias de Telas)
- **Decisão:** Atualização do status dos projetos **DevPad**, **Finance App & Investment Hub** e **Relíquias Itaboraí — The Motor Hub** na vitrine (`index.html`) e documentação (`README.md`) para **Projeto Privado** (`<i class="fa-solid fa-lock"></i> Projeto Privado`), com a remoção de badges inadequadas (*Open Source* e *Online*) e a eliminação de botões com links externos para repositórios privados do GitHub.
- **Racional:** Ambos os sistemas tratam de plataformas proprietárias ou projetos em desenvolvimento fechado (fora do ar publicamente ou com repositórios privados). Apontar para URLs privadas de GitHub geraria erros de acesso (HTTP 404) para recrutadores e o público geral. Ao transacionar os cards para o modelo de galeria de telas (*Lightbox Modal* nativo), o código-fonte permanece seguro enquanto a maturidade de interface, Vanilla JS/Next.js, Supabase e integrações são comprovadas através de capturas reais.
- **Execução:**
  - **Status Badge:** Substituídos `Open Source` e `Online` por `Projeto Privado` com ícone de cadeado nos três cards.
  - **Ação dos Cards:** Botões de link externo para o GitHub substituídos pelo botão interativo `Visualizar Galeria do Sistema`, preparados com `data-gallery` para o modal em tela cheia.
  - **Tabela Geral:** Atualizado no `README.md` como `Projeto Privado 🔒` para os três registros.

### [2026-09-30] - Expansão de Atribuições: Gestão de Servidores Físicos, RAID 1 e Virtualização Proxmox VE
- **Decisão:** Inclusão de atribuições formais de Infraestrutura Avançada e Sysadmin no cargo de *Auxiliar de Cartório no Setor de TI*, destacando a configuração autônoma de servidor físico bare-metal com arranjo RAID 1 e hipervisor Proxmox VE (Debian) para sustentação de sistemas locais em produção (como a *Suíte de Ferramentas Web* e o *I Love Security*).
- **Racional:** Evidenciar competências reais de alto valor técnico que vão além do suporte tradicional: capacidade de montagem, dimensionamento de storage para alta disponibilidade e tolerância a falhas (espelhamento e redundância em RAID 1), instalação e administração de ambiente de virtualização com criação de VMs/containers e hospedagem de aplicações corporativas internas em ambiente isolado e de alta performance.
- **Execução:**
  - **Experiência (`index.html`):** Adicionada atribuição dedicada `Gestão de Servidores & Virtualização (Proxmox VE)` com foco em RAID 1 (espelhamento e tolerância a falhas) e atualizada a atribuição da Suíte Web (`Sistema Proprietário de Monitoramento (Hub SRE)`), com novas tags de stack: `Proxmox VE` e `Virtualização & RAID`.
  - **Habilidades (`index.html`):** Inseridas pills em destaque para `Proxmox VE (Virtualização)` e `RAID 1 & Storage Bare-Metal`.
  - **Posicionamento Geral (`README.md`):** Atualizada a seção de Infraestrutura destacando virtualização bare-metal, RAID 1 e gestão de VMs.

### [2026-09-30] - Curadoria Técnica da Vitrine: Remoção do Monitor de Skins da Steam e Consolidação do Portfólio (12 Aplicações)
- **Decisão:** Remoção do card e das referências ao projeto *Monitor de Preços de Skins (Steam)* do portfólio (`index.html`), documentação (`README.md`) e contadores executivos de projetos (ajustados de 13 para 12 aplicações).
- **Racional:** O script de automação para monitoramento de skins no mercado da Steam possuía escopo simplificado e caráter de estudo inicial, destoando da densidade técnica, robustez arquitetural e maturidade dos demais projetos corporativos e autorais da vitrine (como a *Suíte de Ferramentas Web*, o *BugSync Bot* e o *DevPad*). Além disso, a ausência de um repositório público consolidado geraria atrito na navegação de recrutadores. A eliminação do card fortalece a imagem profissional, mantendo o portfólio 100% focado em projetos de alto impacto, infraestrutura, QA e engenharia de software sênior.
- **Execução:**
  - **Grid de Projetos (`index.html`):** Card removido; renumerada a sequência dos cards restantes; contador da Hero Section atualizado para `12 Projetos Construídos`; botão de ação ajustado para `Explorar Projetos (12)`.
  - **Filtros por Categoria (`index.html`):** Abas atualizadas com contagens estáticas exatas (`Todos 12`, `Web Applications 7`, `QA & Automação 1`, `Desktop & Mídia 3`, `Infra & Hardening 2`).
  - **Documentação Geral (`README.md`):** Título da vitrine atualizado para `(12 Aplicações)` e linha do Monitor de Skins removida da tabela comparativa.

### [2026-09-30] - Refinamento Visual Sênior: Abas de Filtro Sólidas e Eliminação de Estética "Neon IA"
- **Decisão:** Redesenho completo do estado ativo das abas de filtro de projetos (`.filter-btn.active`), substituindo o contorno neon com fundo transparente (`rgba(212, 175, 55, 0.12)`) por preenchimento sólido em amarelo-ouro institucional (`#b8860b`) com tipografia e números em branco puro (`#ffffff`), além da remoção de classes residuais de cores artificiais (`project-subtitle--cyan`).
- **Racional:** Atendimento estrito à diretriz de identidade visual corporativa do agente. Padrões vazados com bordas coloridas fluorescentes e transparências excessivas conferem um aspecto genérico de "template gerado por IA" que destoa de portfólios seniores de engenharia e SRE. A adoção de botões preenchidos sólidos com alto contraste entre o amarelo-ouro e os caracteres brancos garante legibilidade imediata, sofisticação editorial e acabamento de produto nativo.
- **Execução:**
  - **CSS (`css/style.css`):** `.filter-btn.active` configurado com `background: #b8860b`, `border-color: #b8860b`, `color: #ffffff; font-weight: 600`. Contador interno (`.filter-btn.active .filter-count`) estilizado com fundo escurecido sutil (`rgba(0, 0, 0, 0.25)`) e dígito em branco puro (`#ffffff`). Hover dos botões inativos simplificado para borda sutil branca (`rgba(255, 255, 255, 0.15)`).
  - **HTML (`index.html`):** Eliminada classe residual `project-subtitle--cyan` no card do BugSync Bot em favor da tipografia padrão corporativa.
  - **Auditoria de QA via Playwright MCP:** Renderização e alternância de abas validadas visualmente com screenshots Full HD gerados sem erros de console ou regressões de layout.

### [2026-09-30] - Humanização Editorial: Desmistificação de Jargões e Simplificação Didática das Descrições
- **Decisão:** Revisão integral dos textos, subtítulos e descrições dos 12 projetos da vitrine (`index.html` e `README.md`), substituindo termos hiperinflados, prolixos ou com vocabulário artificial de IA (ex: *"script agressivo"*, *"expurga bloatware"*, *"neutraliza telemetria invasiva"*) por uma linguagem limpa, humana, objetiva e de fácil absorção por recrutadores e gestores.
- **Racional:** O excesso de jargões técnicos herméticos sobrecarrega a cognição do leitor e transmite um aspecto artificial ("gerado por máquina"), ocultando o verdadeiro valor operacional e prático do software. A comunicação madura e sênior prioriza clareza: explica o que o sistema faz, qual problema ele resolve e como ele funciona na prática, preservando apenas os termos técnicos essenciais (como Windows, Active Directory, React, Python, Discord e Google Sheets).
- **Execução:**
  - **Reescrita dos 12 Cards (`index.html`):** Todos os subtítulos foram adaptados para títulos diretos de funcionalidade (ex: *Otimizador de Windows* -> *"Script de Limpeza, Desempenho e Privacidade para Windows"*). As descrições detalham o fluxo real de uso em parágrafos fluídos e agradáveis.
  - **Saneamento de Tags:** Removidas expressões exageradas nas pílulas de tags (ex: *Otimização Extrema* -> *Alto Desempenho*, *Hardening de SO* -> *Limpeza de SO*, *Glassmorphism UI* -> *Design Responsivo*).
  - **Alinhamento Documental (`README.md`):** Tabela de projetos sincronizada com terminologias diretas.

### [2026-09-30] - Conformidade & Privacidade: Consolidação de Prints Censurados da Suíte Web (11 Telas)
- **Decisão:** Atualização dos recursos visuais da *Suíte de Ferramentas Web*, integrando o lote de capturas de tela devidamente censuradas pelo usuário para proteção de dados confidenciais e conformidade estrita com normas de privacidade/LGPD. A galeria foi redimensionada de 12 para 11 telas (`suite1.png` até `suite11.png`), com descarte dos arquivos excedentes que não agregavam valor à apresentação.
- **Racional:** Preservação absoluta do sigilo operacional do 2º Ofício de Itaboraí. Informações nominais, dados sensíveis de usuários ou rotas internas de rede foram suprimidas das capturas, mantendo em evidência a maturidade técnica da interface, o design do sistema operacional de TI e a interação com o bot Jarvis.
- **Execução:**
  - **Recursos (`imgs/projetos/`):** 11 arquivos censurados consolidados (`suite1.png` a `suite11.png`) e exclusão de `suite12.png`.
  - **HTML (`index.html`):** Atributo `data-gallery` atualizado para conter as 11 imagens e texto do botão ajustado para `Visualizar Galeria do Sistema (11 Telas)`.
  - **Documentação (`README.md`):** Tabela da vitrine atualizada com o indicador `Em Produção 🏢 (11 Telas)`.

### [2026-09-30] - Posicionamento & Roadmap: Relíquias Itaboraí como Extensão Web do Instagram
- **Decisão:** Atualização do escopo do projeto *Relíquias Itaboraí — The Motor Hub* no portfólio (`index.html`) e documentação (`README.md`), explicitando sua finalidade como complemento aprofundado em formato de portal (estilo blog e fórum) para a página existente no Instagram, mantendo o status de projeto privado por estar em fase ativa de desenvolvimento.
- **Racional:** Alinhar o portfólio com a visão real de produto do autor. O Instagram atua como canal rápido de mídia, enquanto a plataforma web centraliza matérias detalhadas, acervo histórico e cobertura aprofundada de encontros automotivos, com roadmap prevendo consulta de placas de veículos e álbum colaborativo de flagras urbanos.
- **Execução:**
  - **HTML (`index.html`):** Subtítulo atualizado para *"Blog, Fórum & Acervo Automotivo (Extensão do Instagram)"*; descrição reescrita detalhando o propósito editorial, recursos futuros e status privado; tags atualizadas com `Blog & Fórum` e `Integração Instagram`.
  - **Documentação (`README.md`):** Tabela da vitrine ajustada com a nova síntese funcional.

### [2026-09-30] - Padronização Editorial de CTAs, Status em Desenvolvimento e Galeria do Template de Aniversário
- **Decisão:** Padronização integral dos botões de ação (CTAs) em toda a vitrine de projetos, transição de status para *Em Desenvolvimento* nos projetos em construção (*Relíquias Itaboraí* e *RMS Marcenaria*), e renovação das capturas de tela do *Interactive Anniversary Template* a partir do deploy online ativo.
- **Racional:** 
  - **Consistência de Interface (Design System):** Eliminar discrepâncias textuais entre botões que exerciam a mesma função (unificando todos os links de repositório exclusivamente como `GitHub` e todos os gatilhos de modais como `Visualize Imagens do Projeto`), fortalecendo a coesão visual e diminuindo a carga cognitiva de recrutadores.
  - **Transparência de Status:** Projetos que ainda não foram finalizados ou publicados não devem ostentar selos de *Online* ou *Privado* de forma ambígua; a inclusão do status explícito `Em Desenvolvimento` comunica maturidade e honestidade sobre o ciclo de vida do software.
  - **Contraste de Acessibilidade (WCAG):** O botão `.btn--live` (*Acessar Online*) passou a forçar cor branca pura (`#ffffff`) tanto no rótulo quanto no ícone (tanto em repouso quanto em hover), garantindo nitidez cristalina sobre o fundo translúcido esmeralda.
  - **Fidelidade Visual do Template de Aniversário:** O projeto teve suas imagens antigas substituídas por capturas reais em Full HD (1920x1080) do deploy ativo no Netlify (Hero com envelope interativo, Carta 3D com texto e Galeria fotográfica de Polaroids), acompanhado de botão de galeria modal de 3 telas.
- **Execução:**
  - **HTML (`index.html`):**
    - Todos os links de repositório padronizados como `<i class="fa-brands fa-github"></i> GitHub`.
    - Todos os botões de galeria padronizados como `<i class="fa-solid fa-images"></i> Visualize Imagens do Projeto`.
    - Cards de *Relíquias Itaboraí* e *RMS Marcenaria* atualizados com badge `<span class="badge-status badge-status--dev"><i class="fa-solid fa-code"></i> Em Desenvolvimento</span>`.
    - Card do *Interactive Anniversary Template* enriquecido com o botão de galeria modal de 3 telas (`data-gallery`).
  - **Suíte de Ferramentas Web (`index.html` & `css/style.css`):**
    - Descrição do card expandida com riqueza de detalhes operacionais: auditoria contínua de Active Directory (logons em 60+ estações), auditoria de File System 24/7 (SACL 4660/4663 via WinRM NTLM com auto-recuperação/backfill de 30 dias), inventário de hardware e software com alertas para discos <20%, monitoramento de RAID/SMART dos servidores e processamento em memória de `.TIFF`/PDF com PyMuPDF.
    - Remoção definitiva de termos como "Jarvis", padronizando a nomenclatura exclusivamente como `Chatbot / Assistente IA` com rota rápida *Zero-Token Fast Path* (respostas a 0ms) em modo seguro Read-Only.
    - Eliminação completa de tipografia amarela em `.badge-cat--corp`, `.tag--highlight`, `.tag--qa` e `.project-subtitle`, mantendo apenas o fundo suave/bordas institucionais e fixando letras em branco puro (`#ffffff`) ou slate neutro (`#cbd5e1`).
  - **CSS (`css/style.css`):**
    - `.btn--live` e `.btn--live i`: cor branca pura `#ffffff` aplicada em repouso e `:hover`.
    - `.badge-status--dev`: estilização com `var(--accent-soft)` para indicação dourada sóbria.
    - `.badge-cat--corp`, `.tag--highlight`, `.tag--qa`: `color: #ffffff` com fundos e bordas preservados.
    - `.project-subtitle`: `color: #cbd5e1` para legibilidade refinada sem reflexos amarelos.
    - `.project-desc p + p`: margem superior para respiração de múltiplos parágrafos.
  - **Recursos Visuais (`imgs/projetos/`):**
    - `webpage-aniversario_1.png`, `webpage-aniversario_2.png` e `webpage-aniversario_3.png` capturados em Full HD e integrados.
    - Atualização dos prints censurados da Suíte de Ferramentas Web.
  - **Documentação (`README.md`):** Tabela de projetos sincronizada com os status `Em Desenvolvimento 🚧` para os dois projetos, indicação de galeria de 3 telas no template e renomeação de Jarvis para `Chatbot / Assistente IA`.

### [2026-09-30] - Arquitetura de Assets: Estruturação de Subpastas por Projeto e Eliminação de Modais em Projetos Online
- **Decisão:** Reorganização estrutural do diretório de imagens de projetos (`imgs/projetos/`) em subpastas isoladas por aplicação e eliminação completa do botão de galeria modal (`Visualize Imagens do Projeto`) em projetos que já possuem deploy funcional online (*Interactive Anniversary Template*).
- **Racional:**
  - **Eficiência de Navegação e UX Limpa:** Projetos hospedados e operacionais na internet (como o *How To Complete Dex* e o *Interactive Anniversary Template*) não necessitam de galeria estática de imagens secundárias; quem navega pode acessar e experimentar diretamente a aplicação viva através do botão `Acessar Online`. Além disso, a presença de um terceiro botão causava quebra visual desproporcional na linha de ações dos cards (espremendo o texto da galeria em 4 linhas e gerando alturas assimétricas). Ao manter estritamente os dois botões equilibrados (`Acessar Online` e `GitHub`), o card retoma a simetria limpa e a ergonomia visual do design system.
  - **Rastreabilidade e Modularidade de Assets:** A migração de arquivos planos na raiz de `imgs/projetos/` para subdiretórios específicos (ex: `imgs/projetos/suite-de-ferramentas/`, `imgs/projetos/devpad/`, `imgs/projetos/finance-app/`, `imgs/projetos/reliquias-itaborai/`) extingue potenciais colisões de nomes, organiza o armazenamento físico do repositório e facilita a manutenção individual dos assets de cada software.
  - **Redução de Peso do Repositório:** Descarte dos arquivos de imagem estáticos de projetos online (`webpage-aniversario_*.png`), reduzindo o overhead do repositório no GitHub Pages.
- **Execução:**
  - **Estrutura Física (`imgs/projetos/`):**
    - Criação das subpastas dedicadas: `suite-de-ferramentas/`, `devpad/`, `finance-app/` e `reliquias-itaborai/`.
    - Migração física das 11 telas da *Suíte de Ferramentas Web* (`suite1.png` a `suite11.png`) para `imgs/projetos/suite-de-ferramentas/`.
    - Exclusão definitiva dos arquivos `webpage-aniversario_1.png`, `webpage-aniversario_2.png` e `webpage-aniversario_3.png`.
  - **HTML (`index.html`):**
    - Card do *Interactive Anniversary Template*: remoção do botão de galeria, preservando exclusivamente a dupla harmônica `Acessar Online` e `GitHub`.
    - Cards com galeria (*Suíte de Ferramentas Web*, *DevPad*, *Finance App* e *Relíquias Itaboraí*): atualização dos caminhos de `data-gallery` para apontar para as respectivas subpastas.
  - **Documentação (`README.md`):** Remoção do sufixo `(3 Telas)` do *Interactive Anniversary Template* e documentação da estrutura de subpastas por projeto.

### [2026-10-01] - Refinamento de UX & Posicionamento: Soberania de Dados, Utilitários Sem Ads, QA e Padronização de Projetos Privados
- **Decisão:** Retificação técnica das atribuições de infraestrutura para arranjo RAID 1 (espelhamento, redundância e tolerância a falhas); remoção da badge `Em Aprendizado Contínuo` do bloco de destaque de Qualidade de Software (QA) & Testes; destaque explícito da autoria e configuração de Políticas de Grupo (GPOs) customizadas no Active Directory na *Suíte de Ferramentas Web*; atualização do card de *How To Complete Dex* ressaltando o escopo inicial (FireRed/LeafGreen), o desenvolvimento ativo com pretensão de expansão para toda a franquia e a especificação do editor visual como módulo restrito a administradores; transição de *BugSync Bot* e *Suíte de Ferramentas Web* para `Projeto Privado 🔒` (com remoção do link para repositório não público no bot); ênfase na proposta de valor de utilitários limpos no *FrameStudio PRO* e *MediaDownloader Pro* (livres de anúncios, bloatwares e riscos da web); saneamento das ações dos cards *Relíquias Itaboraí* (remoção temporária do botão de galeria) e *RMS Marcenaria* (remoção do botão de GitHub apontando para repositório privado); e redefinição do posicionamento de *I Love Security*, destacando a inspiração no *iLovePDF*, soberania de dados, mitigação de vazamentos (*data leak*) e execução 100% no hardware local para ambientes corporativos.
- **Racional:**
  - **Fidelidade Técnica (Infra & SRE):** A menção a RAID 0 foi corrigida para refletir a topologia real implementada no servidor bare-metal dedicado (RAID 1 com mirroring para alta disponibilidade e integridade de dados).
  - **Autoridade e Simetria Visual em QA:** A badge "Em Aprendizado Contínuo" transmitia uma impressão de estágio iniciante que contrastava com a maturidade das ferramentas e competências listadas (Playwright E2E, Planos de Teste, Triagem P0-P2, telemetria de rede e console). A sua remoção confere maior autoridade e senioridade ao bloco de QA, unificando também a altura e a estrutura de layout com os blocos adjacentes de Desenvolvimento e Infraestrutura.
  - **Protagonismo em Engenharia de Infraestrutura (GPOs):** Evidenciar que a telemetria, inventário e logs de 60+ máquinas clientes não surgiram de forma passiva, mas através de GPOs projetadas, implementadas e homologadas autonomamente pelo profissional, orquestrando scripts de coleta, parâmetros de auditoria e SACL.
  - **Transparência de Roadmap e RBAC no Web App:** Esclarecer aos recrutadores e usuários que o *How To Complete Dex* possui roadmap de expansão contínua para todas as gerações da franquia Pokémon, delimitando claramente que ferramentas avançadas de manipulação de canvas (balde de tinta/limpeza de imagens) pertencem a uma camada restrita de backoffice/administração para inserção de novas rotas.
  - **Prevenção de Links Quebrados (404) e Modais Vazios:** Repositórios privados (*BugSync Bot* e *RMS Marcenaria*) não devem expor links públicos para o GitHub. Da mesma forma, projetos em estágio inicial de desenvolvimento sem capturas consolidadas (*Relíquias Itaboraí*) não devem exibir botão de galeria sem conteúdo, mantendo a experiência do visitante impecável e à prova de falhas.
  - **Segurança e Ética de Software (Utilitários):** A proliferação de sites suspeitos de download e conversores cheios de pop-ups maliciosos, adwares e sequestro de cliques torna aplicações self-hosted e limpas (como FrameStudio PRO e MediaDownloader Pro) extremamente atrativas. Destacar essa filosofia de engenharia evidencia compromisso com cibersegurança prática e respeito ao usuário.
  - **Soberania de Dados e Zero Data Leak (I Love Security):** Mesmo ferramentas líderes como o iLovePDF possuindo compliance com LGPD e ISO 27001, organizações corporativas e usuários conscientes demandam soberania total sobre seus fluxos documentais. Ao processar PDFs e imagens localmente sem qualquer saída de rede, o software elimina o vetor de vazamento por trânsito ou armazenamento em servidores de terceiros.
- **Execução:**
  - **HTML (`index.html`):** Atualizada a atribuição de experiência de `RAID 0` para `RAID 1 (espelhamento, redundância e tolerância a falhas)`; atualizada a pill de habilidades para `RAID 1 & Storage Bare-Metal`; removida a badge e o container redundante do cabeçalho de QA; no card da *Suíte de Ferramentas Web*, detalhado que a coleta distribuída é operacionalizada por GPOs criadas e configuradas no Active Directory, atualizada a tag para `GPOs & Active Directory (SACL)` e status badge atualizado para `Projeto Privado`; na seção de experiência profissional, adicionada menção à telemetria coletada via GPOs; no card do *How To Complete Dex*, reescrito o descritivo com o escopo atual, pretensão de expansão futura para todos os jogos e módulo administrativo de mapas com Canvas API; no card do *BugSync Bot*, atualizado o badge para `Projeto Privado` e removido o botão de link externo ao GitHub; no card do *FrameStudio PRO*, enfatizada a operação local e sem ads; no card do *MediaDownloader Pro*, atualizado o descritivo e tag para `100% Sem Anúncios`; no card de *Relíquias Itaboraí*, removido o bloco `card-actions` de galeria; no card de *RMS Marcenaria*, removido o bloco `card-actions` com o link de repositório privado; e no card de *I Love Security*, reescrito o descritivo com menção à inspiração no iLovePDF, soberania de dados corporativa, mitigação de data leaks e tags `100% Local (Anti-Data Leak)` e `Soberania de Dados`.
  - **Documentação (`README.md`):** Sincronizada a competência de Infraestrutura com arranjo RAID 1, atualizada a stack da Suíte Web com `Active Directory (GPOs)` e atualizados os status de BugSync Bot e Suíte de Ferramentas Web para `Projeto Privado 🔒`.

### [2026-10-01] - UX de Alta Densidade: Formulário de Contato Inteligente, Autocomplete de E-mail & Máscara Flexível
- **Decisão:** Implementação de micro-interações inteligentes no formulário de contato do portfólio: capitalização automática em tempo real de nomes e sobrenomes (Title Case); dropdown dinâmico com sugestões dos principais provedores de e-mail ao digitar `@`; inclusão de campo flexível para canais alternativos de contato ("Outro Meio de Contato (Opcional)") com máscara telefônica adaptativa; e integração dos novos dados no corpo da mensagem direta (`mailto`).
- **Racional:**
  - **Ergonomia e Redução de Fricção (Nome Completo):** A formatação automática em Title Case enquanto o usuário digita preserva a estética visual e a correção gramatical, mantendo a posição exata do cursor para evitar saltos indesejados e tratando conectivos da língua portuguesa (`de`, `da`, `do`, `dos`, `das`, `e`) no evento de perda de foco (`blur`).
  - **Aceleração de Digitação (Sugestões de E-mail):** O gatilho disparado ao inserir o caractere `@` permite a seleção instantânea com clique ou teclado (setas para cima/baixo, Enter e Tab) de provedores consolidados (`@gmail.com`, `@outlook.com`, `@hotmail.com`, `@yahoo.com`, `@icloud.com`, etc.), agilizando o preenchimento e mitigando erros de digitação (typos).
  - **Flexibilidade Multicanal (Outro Contato):** Recrutadores e clientes frequentemente preferem deixar um WhatsApp ou perfil profissional direto (LinkedIn/Telegram). O campo opcional detecta o padrão de entrada: se o usuário digitar dígitos, aplica a máscara de telefone brasileiro (`(XX) XXXXX-XXXX` ou `(XX) XXXX-XXXX`); se inserir letras ou links, preserva o texto livre sem travar o preenchimento.
- **Execução:**
  - **HTML (`index.html`):** Adicionado elemento `<ul id="email-suggestions">` posicionado relativamente ao input de e-mail com atributos de acessibilidade (`role="listbox"`, `role="option"`); adicionado novo campo `<input id="form-extra-contact">` com rótulo descritivo e tag `(Opcional)`. Atualizada a descrição de responsabilidades na Microlins com instrução em sistemas operacionais (Windows e introdução prática a distribuições Linux como Ubuntu e Debian), redes de computadores (protocolo DHCP, switches e categorias de cabos Cat5e/Cat6) e refinamento das tags temáticas da timeline.
  - **CSS (`css/style.css`):** Criados estilos para o dropdown de sugestões (`.email-suggestions` e `.email-suggestion-item`) seguindo o design system escuro do portfólio com `backdrop-filter`, bordas suaves em ouro velho e destaque no hover/foco.
  - **JavaScript (`js/main.js`):** Implementada a lógica reativa de Title Case, a máquina de estados do dropdown de e-mail (com navegação por teclado e auto-fechamento), o algoritmo de máscara telefônica condicional e a concatenação do contato alternativo no template de e-mail gerado.

---

## 🔒 Diretrizes Mandatórias de Preservação e Integridade
> **Aviso Permanente:** É expressamente proibido a qualquer agente ou desenvolvedor apagar, truncar ou resetar bancos de dados locais/remotos e diretórios de logs persistentes em qualquer rotina de manutenção. Modificações devem ocorrer sempre de forma incremental, reversível e protegida por controle de versão.

---
*Este arquivo atua como diário de bordo contínuo, registrando a evolução técnica e arquitetural de cada etapa do projeto.*

