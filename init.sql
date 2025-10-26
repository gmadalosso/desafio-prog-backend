CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('aluno', 'professor') NOT NULL
      );
      
      CREATE TABLE IF NOT EXIST disciplinas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        codigo VARCHAR(10) NOT NULL,
        professor_id INT,
        FOREIGN KEY (professor_id) REFERENCES usuarios(id)
      );

      CREATE TABLE IF NOT EXISTS turmas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        disciplina_id INT,
        horario VARCHAR(50),
        vagas_disponiveis INT DEFAULT 30,
        FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
      );

      CRATE TABLE IF NOT EXISTS matriculas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        aluno_id INT,
        turma_id INT,
        status ENUM('ativa', 'cancelada') DEFAULT 'ativa',
        FOREIGN KEY (aluno_id) REFERENCES usuarios(id),
        FOREIGN KEY (turma_id) REFERENCES turmas(id)
      );
