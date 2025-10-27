import bcrypt from "bcrypt";
import { PAPEL_USUARIO } from "../enums/papelUsuario.js";

export const mockUsuarios = [
  {
    nomeUsuario: "professor1",
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.PROFESSOR
  },
  {
    nomeUsuario: "aluno1", 
    senha: await bcrypt.hash("senha123", 10),
    papel: PAPEL_USUARIO.ALUNO
  }
];
