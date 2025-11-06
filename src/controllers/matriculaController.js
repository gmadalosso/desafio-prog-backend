import TurmaRepository from "../repositories/TurmaRepository.js";
import pool from "../config/database.js";
import { PAPEL_USUARIO } from "../enums/papelUsuario.js";

export async function matricular(req, res) {
    if (req.usuario.papel !== PAPEL_USUARIO.ALUNO) {
        return res.status(403).json({ erro: "Apenas alunos podem se matricular"});
    }

    const { turma_id } = req.body;
    const aluno_id = req.usuario.id;

    try {
        const turma = await TurmaRepository.buscaPorId(turma_id);
        if (!turma) return res.status(404).json({ erro: "Turma não encontrada"});
    
        if (turma.vagas_disponiveis <= 0 ) return res.status(400).json({ erro: "Vagas esgotadas"});
    
        await pool.query(
            "INSERT INTO matriculas (aluno_id, turma_id, status) VALUES (?, ?, 0)",
            [aluno_id, turma_id]
        );
    
        await TurmaRepository.decrementarVaga(turma_id);
    
        res.status(201).json({ mensagem: "Matrícula realizada com sucesso"});
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}