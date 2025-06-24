
# 🐳 Docker 

## 📜 Descrição

Contém as configurações necessárias para orquestrar:

- 🔸 API (Spring Boot)
- 🔸 Front-End (React + Vite)
- 🔸 Banco de Dados PostgreSQL

## ▶️ Executar o projeto completo

```bash
docker-compose up --build
```

## 🏗️ Serviços configurados

| Serviço     | Porta        |
|--------------|--------------|
| API          | 8080         |
| Front-End    | 5173         |
| PostgreSQL   | 5432         |

## 🔧 Observações

- Os dados do banco são persistidos em volume Docker.
- Variáveis de ambiente estão configuradas no arquivo `.env`.
