import express from "express";
import cors from "cors";

import noteRoutes from "./routes/noteRoutes";
import categoryRoutes from "./routes/categoryRoutes";

import { errorHandler } from "./middlewares/errorHandler";

import { loadEnvFile } from "node:process";

if (!process.env.DATABASE_URL) {
  try {
    loadEnvFile();
  } catch {
    // En producción, Vercel proporciona DATABASE_URL directamente.
  }
}

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notes", noteRoutes);
app.use("/categories", categoryRoutes);
app.get("/", (_req, res) => {
  res.json({
    message: "Notes API is running 🚀",
  });
});

// ⭐ El middleware de errores SIEMPRE va al final
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});