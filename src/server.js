import app from "./app.js";
import dotenv from "dotenv";
import pool from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

try {
  const connection = await pool.getConnection();
  console.log("Conexão com o MySQL concluída com sucesso!");
  connection.release();
} catch (error) {
  console.error("Erro ao conectar ao MySQL:", error);
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
