
# 🧪 Testes E2E & API 

## 📜 Descrição

Testes automatizados utilizando **Cypress + Cucumber (BDD)**, cobrindo:

- ✅ Testes End-to-End com interface (UI).
- ✅ Testes diretos na API (`cy.request`).

## 🏗️ Organização dos Testes

```
cypress/
 ┣ e2e/   ← Testes E2E com Gherkin (UI)
 ┣ api/   ← Testes de API (sem interface)
 ┣ fixtures/
 ┣ support/
```

## 🔥 Tecnologias e Metodologias

- **Cypress:** Motor dos testes.
- **Cucumber + Gherkin:** Escrita dos cenários (BDD).

## ⚙️ Pré-requisitos

Para rodar os testes, você precisa ter instalado:

-  **Node.js** (recomendado versão 18 ou superior) → [https://nodejs.org](https://nodejs.org)
- Váriavis de ambiente **env** :
    - Na pasta tests-e2e/ existe um arquivo chamado: `cypress.env.example`
    - Este arquivo deve ser renomeado para: `cypress.env.json`
    - E permanecer na mesma pasta (tests-e2e/).


## ✅ Como executar no terminal:


| Comando              | O que faz                                    |
|----------------------|-----------------------------------------------|
| `npm run open`       | Abre Cypress no modo gráfico (interativo)    |
| `npm run test:all`   | 🔥 Executa **todos** os testes (E2E + API)   |
| `npm run test:e2e`   | 🚀 Executa só os testes E2E (`.feature`)     |
| `npm run test:api`   | 🧠 Executa só os testes de API     |
