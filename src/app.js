import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Config Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Sistema de Matrículas API"
}));

// Rotas principais
app.use("/api", router);

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "API do Sistema de Matrículas funcionando!" });
});

export default app;
