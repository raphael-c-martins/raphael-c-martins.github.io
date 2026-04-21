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

---
*Este arquivo é atualizado a cada iteração significativa com o anti-gravity, cobrindo introdução de async/await, pydantic, e regras de HA sempre que aplicável no backend, ou decisões estruturais no frontend.*
