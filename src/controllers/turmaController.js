import TurmaRepository from "../repositories/TurmaRepository.js";
import { HORARIOS_VALIDOS } from "../enums/horarioEnums.js";
import { PAPEL_USUARIO } from "../enums/papelUsuario.js";

export async function criarTurma(req, res) {
  if (req.usuario.papel !== PAPEL_USUARIO.PROFESSOR) {
    return res.status(403).json({ erro: "Apenas professores podem criar turmas" });
  }

  const { disciplina_id, horario } = req.body;

  if (!disciplina_id || !horario) {
    return res.status(400).json({ erro: "disciplina_id e horario são obrigatórios" });
  }

  if (!HORARIOS_VALIDOS.includes(horario)) {
    return res.status(400).json({ erro: "Horário inválido. Use: 21, 33, etc." });
  }

  try {
    const turma = await TurmaRepository.criar({
      disciplina_id,
      professor_id: req.usuario.id,
      horario,
    });
    res.status(201).json(turma);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

export async function listarTurmas(req, res) {
  try {
    const turmas = await TurmaRepository.listarTodas();
    res.json(turmas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}