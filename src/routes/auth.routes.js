import { Router } from "express";
import { login, logout } from "../controllers/AuthController.js";
import { autenticarToken } from "../security/autenticacaoMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/logout", autenticarToken, logout);

export default router;
