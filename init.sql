-- Cria tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomeUsuario VARCHAR(50) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  papel INT NOT NULL  -- 0 = aluno, 1 = professor
);

-- Cria tabela de disciplinas
CREATE TABLE IF NOT EXISTS disciplinas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  codigo VARCHAR(10) NOT NULL,
  professor_id INT,
  FOREIGN KEY (professor_id) REFERENCES usuarios(id)
);

-- Cria tabela de turmas
CREATE TABLE IF NOT EXISTS turmas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  disciplina_id INT,
  horario VARCHAR(50),
  vagas_disponiveis INT DEFAULT 30,
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
);

-- Cria tabela de matrículas
CREATE TABLE IF NOT EXISTS matriculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT,
  turma_id INT,
  status INT DEFAULT 0,  -- 0 = ativa, 1 = cancelada
  FOREIGN KEY (aluno_id) REFERENCES usuarios(id),
  FOREIGN KEY (turma_id) REFERENCES turmas(id)
);