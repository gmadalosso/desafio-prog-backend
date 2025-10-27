import pool from "../config/database.js";

class UsuarioRepository {
  async buscarPorNomeUsuario(nomeUsuario) {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE nomeUsuario = ?", [nomeUsuario]);
    return rows[0];
  }
}

export default new UsuarioRepository();
