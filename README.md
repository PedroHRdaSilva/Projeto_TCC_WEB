
#CashTrack

Este repositório contém o código completo do projeto **CashTrack**, composto por duas partes:

- **API (Backend)** — responsável pelas regras de negócio, autenticação e integração com o banco de dados.
- **Web (Frontend)** — interface visual da aplicação.

---

## 🚀 Requisitos

Antes de começar, verifique se o ambiente possui:

- Sistema operacional **Ubuntu 22.04** (ou compatível)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/) — Gerenciador de pacotes
- [Git](https://git-scm.com/)


---

## ⚙️ Instalação Geral

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/seu-usuario/CashTrack.git
cd readmin

instalar dependencias 

pnpm i

Crie o arquivo .env com base no exemplo:

# URL da API que o frontend vai consumir
NEXT_PUBLIC_API_URL=http://localhost:3001/graphql

# Ambiente de execução (development | production)
NODE_ENV=development

# Chave secreta JWT (apenas como modelo, preencha no seu .env real)
JWT_SECRET=sua_chave_jwt_aqui



