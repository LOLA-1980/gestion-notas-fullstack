import { loadEnvFile } from "node:process";
import express from "express";
import cors from "cors";

import noteRoutes from "./routes/noteRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { errorHandler } from "./middlewares/errorHandler";

// En local carga backend/.env.
// En Vercel, DATABASE_URL se obtiene de Environment Variables.
if (!process.env.DATABASE_URL) {
  try {
    loadEnvFile();
  } catch {
    console.warn(
      "No se encontró un archivo .env. Se utilizarán las variables del entorno."
    );
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

// El middleware de errores debe permanecer al final.
app.use(errorHandler);

// En Vercel se exporta la aplicación sin abrir un puerto.
// Localmente sí se inicia el servidor.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;