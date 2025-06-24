
# 🎨 Front-End 

## 📜 Descrição

Front-End desenvolvido em **React + Vite + Tailwind CSS**, responsável pela interface de montagem de cafés personalizados.

## 🏗️ Estrutura do Projeto

```
src/
 ┣ components/   ← Componentes reutilizáveis
 ┣ contexts/     ← Contextos globais (ex.: OrderContext)
 ┣ hooks/        ← Hooks personalizados
 ┣ pages/        ← Páginas da aplicação
 ┣ services/     ← Consumo de API
 ┣ types/        ← Tipagens TypeScript
 ┗ utils/        ← Funções utilitárias
```

## ▶️ Como rodar o Front-End individualmente

Exemplo de configuração para ambiente local:
- Altere o Arquivo .env no frontend:

```bash
VITE_API_URL=http://localhost:8080
```

- Rode a aplicação em modo dev:
```bash
cd frontend-react
npm install
npm run dev
```

Aplicação disponível em: `http://localhost:5173`
