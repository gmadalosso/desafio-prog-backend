import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api", router);

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API do Sistema de Matrículas funcionando!" });
});

export default app;
