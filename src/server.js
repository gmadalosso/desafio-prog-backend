import app from "./app.js";
import dotenv from "dotenv";
import pool from "./config/database.js";
import bcrypt from "bcrypt";
import fs from "fs/promises";

dotenv.config();

const PORT = process.env.PORT || 5001;

try {
  const connection = await pool.getConnection();
  console.log("Conexão com o MySQL concluída com sucesso!");

  // Lendo e executando o init.sql
  const sql = await fs.readFile("init.sql", "utf8");
  await connection.query(sql);
  console.log("Tabelas criadas com sucesso");

  // Inserção de usuários mockados
  const mockUsuarios = [
    { username: "professor1", password: await bcrypt.hash("senha123", 10), role: "professor" },
    { username: "aluno1", password: await bcrypt.hash("senha123", 10), role: "aluno" },
  ];

  for (const usuario of mockUsuarios) {
    await connection.query(
      "INSERT IGNORE INTO usuarios (username, password_hash, role) VALUES (?, ?, ?)",
      [usuario.username, usuario.password, usuario.role]
    );
  }

  console.log("Usuários mockados inseridos");

  connection.release(); // Libera a conexão após todas as operações
} catch (error) {
  console.error("Erro ao conectar ao MySQL:", error);
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
