import pool from "../config/database.js";

class TurmaRepository {
    async criar(turma) {
        const [result] = await pool.query(
            `INSERT INTO turmas (disciplina_id, professor_id, horario, vagas_disponiveis)
            VALUES (?, ?, ?, ?)`,
            [turma.disciplina_id, turma.professor_id, turma.horario, turma.vagas_disponiveis || 30]
        );
        return { id: result.insertId, ...turma };
    }

    async buscaPorId(id) {
        const [rows] = await pool.query("SELECT * FROM turmas WHERE id = ?", [id]);
        return rows[0];
    }

    async listarTodas() {
        const [rows] = await pool.query("SELECT * FROM turmas");
        return rows;
    }

    async decrementarVaga(turmaId) {
        await pool.query(
            "UPDATE turmas SET vagas_disponiveis = vagas_disponiveis - 1 WHERE id = ? AND vagas_disponiveis > 0",
            [turmaId]
        );
    }
}

export default new TurmaRepository();