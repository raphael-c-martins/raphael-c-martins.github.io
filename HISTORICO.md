# 🏛️ Histórico Arquitetural e Decisões de Engenharia

Este documento atua como diário de bordo e central de auditoria arquitetural do projeto, em estrita conformidade com as diretrizes de Engenharia Sênior (Alta Disponibilidade, Segurança e Padronização).

## 🚀 Entregas e Evolução

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

## 🔒 Diretrizes Mandatórias de Preservação e Integridade
> **Aviso Permanente:** É expressamente proibido a qualquer agente ou desenvolvedor apagar, truncar ou resetar bancos de dados locais/remotos e diretórios de logs persistentes em qualquer rotina de manutenção. Modificações devem ocorrer sempre de forma incremental, reversível e protegida por controle de versão.

---
*Este arquivo atua como diário de bordo contínuo, registrando a evolução técnica e arquitetural de cada etapa do projeto.*

