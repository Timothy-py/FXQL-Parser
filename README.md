# FXQL Statement Parser

A Foreign Exchange Query Language (FXQL) Statement Parser designed to serve as part of a central federation system for Bureau De Change (BDC) operations, enabling the standardization of exchange rate information.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running the Test](#running-the-test)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Request Examples](#request-examples)

---

## Features

- **FXQL Syntax Parsing**: Validates FXQL statements for syntax compliance.
- **Database Storage**: Stores valid statements in a PostgreSQL database using Prisma ORM.
- **Comprehensive Error Responses**: Returns detailed error messages with line numbers and positions.
- **Batch Processing**: Handles multiple FXQL statements in a single request.
- **Scalable and Secure**: Built on NestJS for scalability and secure API development.

---

## Technologies Used

- **NestJS**: Framework for scalable and efficient server-side applications.
- **TypeScript**: Static typing for JavaScript.
- **Prisma**: Next-generation ORM for database management.
- **PostgreSQL**: Relational database system.
- **Docker**: Containerized deployment.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+)
- **Docker** (for containerized development)
- **PostgreSQL**

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:Timothy-py/FXQL-Parser.git
   cd FXQL-Parser
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:
   
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/fxql_db
   PORT=3000
   NODE_ENV=DEVELOPMENT
   ```

4. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

5. Generate database tables:

   ```bash
   npx prisma db push
   ```

---

## Running the Application

### With Docker

1. Build and run the containers:

   ```bash
   docker-compose up --build
   ```

2. Access the application at [http://localhost:3000](http://localhost:3000).

### Without Docker

1. Start the application:

   ```bash
   yarn start:dev
   ```

2. The application will run at [http://localhost:3000](http://localhost:3000).

---

## Running the Test
```bash
   yarn test
   ```
---

## Usage

### API Endpoints

- **POST** `/fxql-statements`: Submit FXQL statements for parsing and validation.

### Request Examples

#### Valid FXQL Statement

**Request:**

```json
{
  "FXQL": "USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n  CAP 10000\\n}"
}
```

**Response:**

```json
{
  "message": "FXQL Statement Parsed Successfully.",
  "code": "FXQL-200",
  "data": [
    {
      "EntryId": 1,
      "SourceCurrency": "USD",
      "DestinationCurrency": "GBP",
      "BuyPrice": 0.85,
      "SellPrice": 0.90,
      "CapAmount": 10000
    }
  ]
}
```