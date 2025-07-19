# 🍕 Pizzashop API

This is the backend of the Pizzashop application. An app for complete restaurant order management system. It is fully integrated with the frontend [`pizzashop-web`](https://github.com/ithauront/pizzashop), and both run locally and communicate via HTTP.

    ⚠️ This project is not deployed in production. It was built using modern technologies like Bun and Elysia, which made it harder to find free and reliable hosting support. The entire system runs locally, using Docker for the database and Bun for the server.

### 💡 Why Bun, Elysia and Drizzle?

The main goal of this project was to learn and explore Bun, Elysia, and Drizzle ORM in a real-world scenario.
I chose Bun for its impressive speed and modern developer experience. Elysia was selected as a fast and expressive web framework designed specifically for Bun, while Drizzle ORM provides a fully typed and SQL-like approach to handling the database.

Together, these tools allowed us to build a type-safe, lightweight and fast backend.

---

## 🚀 Tecnologias Utilizadas

- **Bun**
- **Elysia**
- **Drizzle ORM**
- **Zod**
- **Nodemailer**
- **Docker**
- **PostgreSQL**
- **@paralleldrive/cuid2**
- **dayjs**
- **faker**


---

## 🧠 What I Learned

This was my first experience with Bun, Elysia, and Drizzle, and I covered:

   * Magic link authentication with a 7-day token expiration

   * JWT-based session signing containing user ID and restaurant ID

   * Seed generation with realistic mock data using Faker

   * Nodemailer test integration with Ethereal email accounts

   * Full integration between frontend and backend running locally

   * Strong typing and clear separation of routes, schemas, and logic

---

## 📦 Core Features

### ✅ Magic Link Authentication

Managers don’t use passwords. Instead, they receive a login link by email with a one-time code.

### 📬 Send Authentication Link

The backend generates and sends a unique code via email using Nodemailer, with a 7-day expiration.

### 🔐 Auth Sessions and Profile

   * Auth token includes userId and restaurantId

   * /signout clears the session

   * /me returns the authenticated user profile

### 🍕 Order Management

   * Create, approve, cancel, and update orders

   * Filter orders by status (pending, processing, delivered, etc.)

   * View recent and popular orders

### 🧪 Database & Seeding

We use PostgreSQL via Docker (Bitnami image).

To seed the database with mock data:

```bash
bun run seed
```
This will:

    Reset all tables

    Create users, restaurant, products, and 200 mock orders with items

## ⚙️ Getting Started
1. Clone and install dependencies:
```bash
git clone https://github.com/ithauront/pizzashop-api
cd pizzashop-api
bun install
```
2. Create .env file following this model:
```bash
DATABASE_URL_LOCAL='postgresql://docker:docker@localhost:5432/pizzashop'
API_BASE_URL='http://localhost:3333'
AUTH_REDIRECT_URL='http://localhost:5173'
JWT_SECRET_KEY='your-secret-key'
```

3. Start PostgreSQL with Docker:
```bash
docker-compose up -d
```

4. Start the backend
```bash
bun run dev
```

5. Run the frontend

Follow the instructions in the [`pizzashop-web`](https://github.com/ithauront/pizzashop) repository to run the frontend and enable full integration.


## 🚫 Deployment

Deployment was not performed due to difficulties in finding a 100% free and reliable hosting provider that supports Bun and the required Docker + PostgreSQL setup.

Platforms like Fly.io were tested, but could not guarantee true cost-free hosting for projects of this complexity.
Since this is an educational project, we chose to keep it running locally.

