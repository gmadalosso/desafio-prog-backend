import { Router } from "express";
import { matricular } from "../controllers/matriculaController.js";
import { autenticarToken, autorizarAluno } from "../security/autenticacaoMiddleware.js";

const router = Router();
router.post("/", autenticarToken, autorizarAluno, matricular);

export default router;