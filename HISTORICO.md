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

---
*Este arquivo será alimentado a cada iteração significativa com o anti-gravity, cobrindo introdução de async/await, pydantic, e regras de HA sempre que aplicável no backend, ou decisões estruturais no frontend.*
