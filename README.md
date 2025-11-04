```markdown
# 🚀 Subscription Tracker – Production-Ready Backend System

A **Subscription Management System** built for real-world use — managing users, plans, and recurring payments with proper authentication, database design, and business logic.  
Skip the CRUD tutorials — this project focuses on **scalable architecture**, **security**, and **real production features**.

---

## ✨ Features

- 🔐 **JWT Authentication & Authorization** – Secure login and protected routes with JSON Web Tokens  
- 🗄️ **Database Modeling with Mongoose** – Handle users, subscriptions, and payments efficiently  
- ⚙️ **RESTful API Architecture** – Clean, modular, and extensible codebase  
- 🧩 **Security Best Practices** – Validation, password hashing, and environment variable protection  
- 🔁 **Automated Workflows** – Subscription renewals, expirations, and status updates  
- 🪵 **Centralized Error Handling & Logging** – Structured logs and debugging-friendly design

---

## 🧱 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Backend Framework** | Node.js + Express |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT + Bcrypt |
| **Cache & Queues** | [Upstash](https://jsm.dev/backend25-upstash) |
| **Security** | [Arcjet](https://jsm.dev/backend25-arcjet) |

---

---

## 🧠 Future Improvements

- 💳 **Payment Integration:** Add Stripe or PayPal for real payment processing  
- 📧 **Email Notifications:** Send automated emails for renewals, receipts, and cancellations  
- 🧑‍💼 **Admin Dashboard:** Manage users, plans, and payments via a secure admin interface  
- 🐳 **Docker & CI/CD:** Containerize the app and automate deployment pipelines  
- 📊 **Analytics & Insights:** Track user activity and subscription performance  
- 🌍 **Localization:** Support multiple languages and regional currencies  

---

## 🐳 Containerização & CI/CD

Este projeto pode ser containerizado para facilitar deploys reproduzíveis e integração contínua. Abaixo estão as recomendações e comandos práticos para usar Docker e configurar um pipeline básico de CI/CD.

### Dockerfile (multi-stage)

- Use um Dockerfile multi-stage: uma etapa `deps` para instalar dependências, `builder` para copiar código e executar um build (se houver), e `runner` para a imagem de produção com um usuário não-root.
- Exemplo: o `Dockerfile` incluído instala dependências com `npm ci`, copia os ficheiros e expõe a porta `3000`. Ajuste o `CMD` para o ponto de entrada correto (`app.js` ou `dist/app.js` se usar TypeScript).

# 🚀 Subscription Tracker – Production-Ready Backend System

A **Subscription Management System** built for real-world use — managing users, plans, and recurring payments with proper authentication, database design, and business logic.  
Skip the CRUD tutorials — this project focuses on **scalable architecture**, **security**, and **real production features**.

---

## ✨ Features

- 🔐 **JWT Authentication & Authorization** – Secure login and protected routes with JSON Web Tokens  
- 🗄️ **Database Modeling with Mongoose** – Handle users, subscriptions, and payments efficiently  
- ⚙️ **RESTful API Architecture** – Clean, modular, and extensible codebase  
- 🧩 **Security Best Practices** – Validation, password hashing, and environment variable protection  
- 🔁 **Automated Workflows** – Subscription renewals, expirations, and status updates  
- 🪵 **Centralized Error Handling & Logging** – Structured logs and debugging-friendly design

---

## 🧱 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Backend Framework** | Node.js + Express |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT + Bcrypt |
| **Cache & Queues** | [Upstash](https://jsm.dev/backend25-upstash) |
| **Security** | [Arcjet](https://jsm.dev/backend25-arcjet) |

---

---

## 🧠 Future Improvements

- 💳 **Payment Integration:** Add Stripe or PayPal for real payment processing  
- 📧 **Email Notifications:** Send automated emails for renewals, receipts, and cancellations  
- 🧑‍💼 **Admin Dashboard:** Manage users, plans, and payments via a secure admin interface  
- 🐳 **Docker & CI/CD:** Containerize the app and automate deployment pipelines  
- 📊 **Analytics & Insights:** Track user activity and subscription performance  
- 🌍 **Localization:** Support multiple languages and regional currencies  

---

## 🐳 Containerização & CI/CD

Este projeto pode ser containerizado para facilitar deploys reproduzíveis e integração contínua. Abaixo estão as recomendações e comandos práticos para usar Docker e configurar um pipeline básico de CI/CD.

### Dockerfile (multi-stage)

- Use um Dockerfile multi-stage: uma etapa `deps` para instalar dependências, `builder` para copiar código e executar um build (se houver), e `runner` para a imagem de produção com um usuário não-root.
- Exemplo: o `Dockerfile` incluído instala dependências com `npm ci`, copia os ficheiros e expõe a porta `3000`. Ajuste o `CMD` para o ponto de entrada correto (`app.js` ou `dist/app.js` se usar TypeScript).

### .dockerignore

Adicione um `.dockerignore` com pelo menos:

```
node_modules
.env
.git
.vscode
npm-debug.log
dist
```

### Comandos úteis (local)

Build da imagem:
```bash
docker build -t sub-tracker:latest .
```

Run (com .env):
```bash
docker run --rm -p 3000:3000 --env-file .env sub-tracker:latest
```

Desenvolvimento com hot-reload (opcional, compose):
```yaml
version: '3.8'
services:
  app:
    build: .
    volumes:
      - ./:/app:cached
      - /app/node_modules
    ports:
      - "3000:3000"
    command: sh -c "npm install && npm run dev"
```

### CI/CD (GitHub Actions — resumo)

- Jobs recomendados:
  - `build-and-test`: checkout, setup-node, `npm ci`, `npm test`.
  - `build-and-push`: build da imagem Docker e push para o registro (ex.: GitHub Container Registry).
  - `deploy` (opcional): deploy via SSH no host de produção (puxa a imagem e reinicia o container).

Exemplo (resumo): use `docker/build-push-action` para construir e enviar, e `appleboy/ssh-action` para executar comandos remotos.

### Segredos e boas práticas

- Nunca comite `.env` no repositório. Use secrets do GitHub (`GITHUB_TOKEN`/PAT`, `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`).
- Use `npm ci` no CI para instalações determinísticas.
- Execute o container como usuário não-root e passe variáveis sensíveis via ambiente/secret manager.

### Nota sobre TypeScript

Se o projeto for migrado para TypeScript, adicione `RUN npm run build` no estágio `builder` e copie apenas `dist/` para o estágio `runner`. Ajuste o `CMD` para `node dist/app.js`.

---

Exemplo (resumo): use `docker/build-push-action` para construir e enviar, e `appleboy/ssh-action` para executar comandos remotos.

### Segredos e boas práticas

- Nunca comite `.env` no repositório. Use secrets do GitHub (`GITHUB_TOKEN`/PAT`, `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`).
- Use `npm ci` no CI para instalações determinísticas.
- Execute o container como usuário não-root e passe variáveis sensíveis via ambiente/secret manager.

### Nota sobre TypeScript

Se o projeto for migrado para TypeScript, adicione `RUN npm run build` no estágio `builder` e copie apenas `dist/` para o estágio `runner`. Ajuste o `CMD` para `node dist/app.js`.

---

```