<p align="center">
  <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2Jhd2VoemtqMTd0YXU1NmFveHp0aDJ0b3cxMWZsNXZvOXdzeGkybSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TId7jkAePkQ4Q5VpBk/giphy.gif" alt="Blog API GIF" width="300"/>
</p>

<h1 align="center">📝 Blog Pessoal API</h1>

<p align="center">
  <em>API backend com NestJS focada em autenticação, segurança e gerenciamento de conteúdo</em>
</p>

<p align="center">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-v10-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-v20-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-v5-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-v8-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img alt="JWT" src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge"/>
</p>

---

## 📖 Sobre o Projeto

API desenvolvida com **NestJS** para gerenciamento de um blog pessoal, com foco em **segurança e autenticação de usuários**.

O sistema permite cadastro, login e gerenciamento de conteúdos como **postagens, temas e comentários**, seguindo boas práticas de arquitetura backend.

---

## 🔐 Segurança

| Recurso | Descrição |
|--------|--------|
| 🔒 **Bcrypt** | Criptografia de senhas com hash seguro |
| 🔑 **JWT** | Autenticação stateless por token |
| 🛡️ **Guards** | Proteção de rotas autenticadas |
| 🧠 **Passport** | Estratégias de autenticação Local e JWT |

---

## ✨ Funcionalidades

| Recurso | Descrição |
|---|---|
| 👤 **Usuário** | Cadastro, atualização e busca |
| 🔐 **Login** | Autenticação com retorno de JWT |
| 📝 **Postagem** | CRUD completo |
| 🏷️ **Tema** | CRUD completo |
| 💬 **Comentário** | CRUD completo |
| 🔗 **Relacionamentos** | Usuário ↔ Postagem ↔ Tema ↔ Comentário |

---

## 🏗️ Estrutura do Projeto

```
src/
├── auth/
│   ├── bcrypt/
│   ├── constants/
│   ├── controllers/
│   ├── guard/
│   ├── services/
│   ├── strategy/
│   └── auth.module.ts
├── usuario/
├── postagem/
├── tema/
├── comentario/
└── app.module.ts
```

---

## 🗂️ Diagrama ER

```mermaid
erDiagram
    USUARIO {
        int id PK
        string nome
        string usuario
        string senha
        string foto
    }
    POSTAGEM {
        int id PK
        string titulo
        string texto
        date data
        int usuarioId FK
        int temaId FK
    }
    TEMA {
        int id PK
        string descricao
    }
    COMENTARIO {
        int id PK
        string texto
        int postagemId FK
    }

    USUARIO ||--o{ POSTAGEM : cria
    POSTAGEM }o--|| TEMA : pertence
    POSTAGEM ||--o{ COMENTARIO : possui
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js v20+
- MySQL v8+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/blogpessoal.git

# Acesse a pasta do projeto
cd blogpessoal

# Instale as dependências
npm install
```

### Rodando a aplicação

```bash
# Desenvolvimento (com hot reload)
npm run start:dev
```

> A API estará disponível em `http://localhost:4001`

---

## 🔗 Endpoints da API

### 👤 Usuário

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/usuarios/cadastrar` | ❌ | Criar usuário |
| `POST` | `/usuarios/logar` | ❌ | Login |
| `GET` | `/usuarios` | ✅ | Listar usuários |
| `GET` | `/usuarios/:id` | ✅ | Buscar por ID |
| `PUT` | `/usuarios` | ✅ | Atualizar usuário |

### 📝 Postagem

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/postagens` | ✅ | Listar postagens |
| `POST` | `/postagens` | ✅ | Criar postagem |
| `PUT` | `/postagens` | ✅ | Atualizar postagem |
| `DELETE` | `/postagens/:id` | ✅ | Deletar postagem |

### 🏷️ Tema

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/temas` | ✅ | Listar temas |
| `POST` | `/temas` | ✅ | Criar tema |
| `PUT` | `/temas` | ✅ | Atualizar tema |

---

## 🔐 Autenticação

### Login

```http
POST /usuarios/logar
```

**Body:**
```json
{
  "usuario": "root@root.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Uso nas rotas protegidas:**
```
Authorization: Bearer TOKEN_JWT
```

> ⚠️ Todas as rotas marcadas com ✅ exigem o token no header da requisição.

---

## 🧪 Testando com Insomnia

1. Crie uma nova **Workspace** chamada `Blog Pessoal API`
2. Adicione as requests com os métodos e URLs acima
3. Para `POST` e `PUT`, configure o body como **JSON**
4. Faça login em `/usuarios/logar` e copie o `access_token`
5. Nas rotas protegidas, adicione o header:
   ```
   Authorization: Bearer SEU_TOKEN_AQUI
   ```

---

## 🎯 Aprendizados

- ✅ Autenticação segura com **JWT**
- ✅ Criptografia de senhas com **Bcrypt**
- ✅ Arquitetura modular com **NestJS**
- ✅ Relacionamentos entre entidades com **TypeORM**
- ✅ Proteção de rotas com **Guards e Passport**

---

## 👩‍💻 Autora

**Lohanna B**  
Feito com 💜 e muito ☕

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
