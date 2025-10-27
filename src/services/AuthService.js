import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import dotenv from "dotenv";

dotenv.config();

class AuthService {
  async login(nomeUsuario, senha) {
    const usuario = await UsuarioRepository.buscarPorNomeUsuario(nomeUsuario);
    if (!usuario) throw new Error("Usuário não encontrado");

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) throw new Error("Senha incorreta");

    const token = jwt.sign(
      { id: usuario.id, nomeUsuario: usuario.nomeUsuario, papel: usuario.papel },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, usuario };
  }
}

export default new AuthService();
