import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PAPEL_USUARIO } from "../enums/papelUsuario.js";

dotenv.config();

export function autenticarToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ erro: "Token não fornecido" });

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: "Token inválido ou expirado" });
    req.usuario = usuario;
    next();
  });
}

export function autorizarProfessor(req, res, next) {
  if (req.usuario.papel !== PAPEL_USUARIO.PROFESSOR) {
    return res.status(403).json({ erro: "Acesso permitido apenas a professores." });
  }
  next();
}

export function autorizarAluno(req, res, next) {
  if (req.usuario.papel !== PAPEL_USUARIO.ALUNO) {
    return res.status(403).json({ erro: "Acesso permitido apenas a alunos." });
  }
  next();
}
