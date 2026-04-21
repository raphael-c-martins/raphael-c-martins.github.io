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
  - Update massivo dos Tokens CSS (`--bg`, `--accent`, etc).
  - Remoção de texturas de "bolinhas" brilhantes em favor de um Background Grid diagional sutil.
  - Fonte JetBrains Mono setada como principal nas tags e links de navbar para assemelhar a painéis de telemetria.

---
*Este arquivo será alimentado a cada iteração significativa com o anti-gravity, cobrindo introdução de async/await, pydantic, e regras de HA sempre que aplicável no backend, ou decisões estruturais no frontend.*
