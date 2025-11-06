CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomeUsuario VARCHAR(50) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  papel INT NOT NULL
);

CREATE TABLE IF NOT EXISTS disciplinas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  codigo VARCHAR(10) NOT NULL,
  professor_id INT,
  FOREIGN KEY (professor_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS turmas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  disciplina_id INT NOT NULL,
  professor_id INT NOT NULL,
  horario CHAR(2) NOT NULL, 
  vagas_disponiveis INT DEFAULT 30 CHECK (vagas_disponiveis >= 0),
  FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
  FOREIGN KEY (professor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  UNIQUE (disciplina_id, horario)
);

CREATE TABLE IF NOT EXISTS matriculas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  aluno_id INT,
  turma_id INT,
  status INT DEFAULT 0,
  FOREIGN KEY (aluno_id) REFERENCES usuarios(id),
  FOREIGN KEY (turma_id) REFERENCES turmas(id)
);