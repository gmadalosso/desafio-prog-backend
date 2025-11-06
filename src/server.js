import app from "./app.js";
import dotenv from "dotenv";
import pool from "./config/database.js";
import fs from "fs/promises";
import { mockUsuarios } from "./data/mockUsuarios.js";
import { mockDisciplinas } from "./data/mockDisciplinas.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

async function executarArquivoSQL(filePath, connection) {
  const sql = await fs.readFile(filePath, "utf8");
  const comandos = sql
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  
  for (const c of comandos) {
    if (c.toUpperCase().includes('SET FOREIGN_KEY_CHECKS')) {
      continue;
    }
    await connection.query(c);
  }
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');
}

try {
  const connection = await pool.getConnection();
  console.log("Conexão com o MySQL concluída com sucesso!");

  // Limpando tabelas antes de criar
  await executarArquivoSQL("limpar_banco.sql", connection);
  console.log("Tabelas limpas com sucesso");

  // Lendo e executando o init.sql
  await executarArquivoSQL("init.sql", connection);
  console.log("Tabelas criadas com sucesso");

  // Inserção de usuários mockados
  for (const usuario of mockUsuarios) {
    await connection.query(
      "INSERT IGNORE INTO usuarios (nomeUsuario, senha_hash, papel) VALUES (?, ?, ?)",
      [usuario.nomeUsuario, usuario.senha, usuario.papel]
    );
  }

  console.log("Usuários mockados inseridos com sucesso");

  // Inserção de disciplinas mockadas
  // Buscar os IDs dos professores para associar às disciplinas
  const [professores] = await connection.query(
    "SELECT id, nomeUsuario FROM usuarios WHERE papel = 1 ORDER BY id"
  );
  
  for (const disciplina of mockDisciplinas) {
    const professorIndex = disciplina.professor_id - 1;
    const professor = professores[professorIndex];
    
    if (professor) {
      await connection.query(
        "INSERT IGNORE INTO disciplinas (nome, codigo, professor_id) VALUES (?, ?, ?)",
        [disciplina.nome, disciplina.codigo, professor.id]
      );
    } else {
      console.warn(`Professor com ID ${disciplina.professor_id} não encontrado para disciplina ${disciplina.nome}`);
    }
  }

  console.log("Disciplinas mockadas inseridas com sucesso");

  connection.release();
} catch (error) {
  console.error("Erro ao conectar ao MySQL:", error);
}

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
