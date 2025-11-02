import { Router } from "express";
import { criarTurma, listarTurmas } from "../controllers/turmaController.js";
import { autenticarToken, autorizarProfessor } from "../security/autenticacaoMiddleware.js";

const router = Router();
router.post("/", autenticarToken, autorizarProfessor, criarTurma);
router.get("/", autenticarToken, listarTurmas);

export default router;