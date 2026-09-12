# Notes Application

Full Stack Single Page Application developed as part of the **Ensolvers technical challenge**.

The application allows users to create, edit, delete, archive, unarchive, and filter notes.

The project is built with a React frontend and an Express backend following a layered architecture with persistent storage using PostgreSQL and Prisma ORM.

---

# Features

- Create notes
- Edit notes
- Delete notes
- Archive and unarchive notes
- List active notes
- List archived notes
- Filter notes by status
- Persistent data storage with PostgreSQL
- REST API communication between frontend and backend
- Responsive user interface using Tailwind CSS

---

# Technologies

## Frontend

- React 19
- TypeScript 5.x
- Vite
- Axios
- Tailwind CSS

## Backend

- Node.js 20.x
- Express.js
- TypeScript
- Prisma ORM

## Database

- PostgreSQL
- PostgreSQL hosted on Neon

---

# Requirements

Before running the application, install:

- Node.js 20.x
- npm 10.x
- PostgreSQL compatible database

---

# Project Structure

```text
.
├── backend
│   ├── prisma
│   │   └── schema.prisma
│   │
│   ├── src
│   │   ├── controllers
│   │   │   ├── noteController.ts
│   │   │   └── categoryController.ts
│   │   │
│   │   ├── services
│   │   │   ├── noteService.ts
│   │   │   └── categoryService.ts
│   │   │
│   │   ├── repositories
│   │   │   ├── noteRepository.ts
│   │   │   └── categoryRepository.ts
│   │   │
│   │   ├── routes
│   │   │   ├── noteRoutes.ts
│   │   │   └── categoryRoutes.ts
│   │   │
│   │   ├── middlewares
│   │   │   └── errorHandler.ts
│   │   │
│   │   └── config
│   │       └── database.ts
│   │
│   ├── setup.sh
│   ├── package.json
│   └── .env.example
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── FilterButtons.tsx
│   │   │   ├── NoteCard.tsx
│   │   │   └── NoteForm.tsx
│   │   │
│   │   ├── services
│   │   │   ├── noteService.ts
│   │   │   └── categoryService.ts
│   │   │
│   │   └── types
│   │       ├── note.ts
│   │       └── category.ts
│   │
│   ├── package.json
│   └── .env.example
│
└── README.md
```

# Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your_postgresql_connection_string"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate deploy
```

Start backend server:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:3000
```

---

# Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start frontend application:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

# Running with Setup Script

A setup script is included to install dependencies, generate Prisma Client, apply migrations, and start the backend application.

From the backend folder:

```bash
./setup.sh
```

---

# API Endpoints

Base URL:

```text
http://localhost:3000
```

---

## Create Note

**POST**

```text
/notes
```

Request body:

```json
{
  "title": "Buy food",
  "content": "Croquettes for Lola and Tito"
}
```

---

## Get All Notes

**GET**

```text
/notes
```

---

## Get Active Notes

**GET**

```text
/notes/active
```

---

## Get Archived Notes

**GET**

```text
/notes/archived
```

---

## Get Note By ID

**GET**

```text
/notes/:id
```

---

## Update Note

**PUT**

```text
/notes/:id
```

Example request body:

```json
{
  "title": "Updated title",
  "content": "Updated content"
}
```

Archive example:

```json
{
  "archived": true
}
```

---

## Delete Note

**DELETE**

```text
/notes/:id
```

---

# Backend Architecture

The backend follows a layered architecture pattern:

```text
Controller
    |
    v
Service
    |
    v
Repository
    |
    v
Prisma ORM
    |
    v
PostgreSQL Database
```

This structure separates API handling, business logic, and database operations, improving maintainability and scalability.

---

# Database Model

The application uses a `Note` entity:

```text
Note
 ├── id
 ├── title
 ├── content
 ├── archived
 ├── createdAt
 └── updatedAt
```

---

# Environment Variables

## Backend

Required variable:

```env
DATABASE_URL
```

Example:

```env
DATABASE_URL="postgresql://user:password@host/database"
```

---

## Frontend

Required variable:

```env
VITE_API_URL=http://localhost:3000
```

---

# Author

**Lillys Hernández Ramos**

Frontend / Full Stack Developer
## Implemented Features

- ✅ Create, edit and delete notes
- ✅ Archive and restore notes
- ✅ Filter notes by status
- ✅ Create categories
- ✅ Assign and remove categories from notes
- ✅ Update note categories
- ✅ Filter notes by category
- ✅ Persistent storage using PostgreSQL and Prisma ORM
- ✅ Responsive UI built with Tailwind CSS
