# Amethyst API

This project provides a collection of APIs for various functionalities, including jokes, Bible verses, quotes, math questions, science questions, Minecraft server status, and an economy system. Below is an overview of the APIs and their use cases.

## Table of Contents
1. [Jokes API](#jokes-api)
2. [Bible Verse API](#bible-verse-api)
3. [Quotes API](#quotes-api)
4. [Math Questions API](#math-questions-api)
5. [Science Questions API](#science-questions-api)
6. [Minecraft Server Status API](#minecraft-server-status-api)
7. [Economy API](#economy-api)

---

## Jokes API

**Use Case:** Provides random jokes and allows retrieval of specific jokes by ID.

### Endpoints

- **GET /api/jokes/random**
  - Fetches a random joke.

- **GET /api/jokes/:id**
  - Retrieves a joke by its ID.

---

## Bible Verse API

**Use Case:** Provides random Bible verses and allows retrieval of specific verses based on book, chapter, and verse.

### Endpoints

- **GET /api/bible/random**
  - Fetches a random Bible verse.

- **GET /api/bible/:book/:chapter/:verse**
  - Retrieves a specific Bible verse based on book, chapter, and verse.

---

## Quotes API

**Use Case:** Provides random quotes.

### Endpoints

- **GET /api/quotes/random**
  - Fetches a random quote.

---

## Math Questions API

**Use Case:** Provides random math questions for practice.

### Endpoints

- **GET /api/math/random**
  - Fetches a random math question.

---

## Science Questions API

**Use Case:** Provides random science questions for practice.

### Endpoints

- **GET /api/science/random**
  - Fetches a random science question.

---

## Minecraft Server Status API

**Use Case:** Checks the status of Minecraft servers for both Java and Bedrock editions.

### Endpoints

- **POST /api/minecraft/status**
  - Checks the status of a Minecraft server.

---

## Economy API

**Use Case:** Manages simple economy, including balance checks, earning, spending, and transferring money.

### Endpoints

- **GET /api/economy/balance/:username**
  - Retrieves the balance of a specific user.

- **POST /api/economy/earn**
  - Adds money to a user's balance.

- **POST /api/economy/spend**
  - Deducts money from a user's balance.

- **POST /api/economy/transfer**
  - Transfers money between two users.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/romalescarl18/Amethyst.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Amethyst
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file and configure your MongoDB URI and other environment variables.

5. Start the server:
   ```bash
   npm start
   ```

---

## Technologies Used

- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for building APIs.
- **MongoDB**: Database for storing data.
- **Swagger**: API documentation.
- **Gamedig**: Library for querying Minecraft server status.

---

## Usage

After starting the server, use an API client like Postman or cURL to interact with the APIs. You can also view the API documentation at `/docs` (if Swagger UI is enabled).

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.