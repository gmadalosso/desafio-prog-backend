-- Script para limpar todas as tabelas e resetar AUTO_INCREMENT
-- Executar este script no MySQL antes de reiniciar o servidor

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE matriculas;
TRUNCATE TABLE turmas;
TRUNCATE TABLE disciplinas;
TRUNCATE TABLE usuarios;

SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE usuarios AUTO_INCREMENT = 1;
ALTER TABLE disciplinas AUTO_INCREMENT = 1;
ALTER TABLE turmas AUTO_INCREMENT = 1;
ALTER TABLE matriculas AUTO_INCREMENT = 1;

SELECT 'Tabelas limpas com sucesso!' as status;

