import AuthService from "../services/AuthService.js";

export async function login(req, res) {
  const { nomeUsuario, senha } = req.body;

  try {
    const { token, usuario } = await AuthService.login(nomeUsuario, senha);
    res.json({
      mensagem: "Login bem-sucedido",
      token,
      usuario: {
        id: usuario.id,
        nomeUsuario: usuario.nomeUsuario,
        papel: usuario.papel,
      },
    });
  } catch (error) {
    res.status(401).json({ erro: error.message });
  }
}

export async function logout(req, res) {
  res.json({ mensagem: "Logout realizado com sucesso" });
}
