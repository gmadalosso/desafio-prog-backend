import bcrypt from "bcrypt";
import { PAPEL_USUARIO } from "../enums/papelUsuario.js";

export const mockUsuarios = [
  // Professores
  {
    nomeUsuario: "professor1",
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.PROFESSOR
  },
  {
    nomeUsuario: "professor2",
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.PROFESSOR
  },
  {
    nomeUsuario: "professor3",
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.PROFESSOR
  },
  // Alunos
  {
    nomeUsuario: "aluno1", 
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.ALUNO
  },
  {
    nomeUsuario: "aluno2", 
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.ALUNO
  },
  {
    nomeUsuario: "aluno3", 
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.ALUNO
  },
  {
    nomeUsuario: "aluno4", 
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.ALUNO
  },
  {
    nomeUsuario: "aluno5", 
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.ALUNO
  }
];
