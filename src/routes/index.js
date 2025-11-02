import { Router } from "express";
import authRoutes from "./auth.routes.js";
import turmaRoutes from "./turma.routes.js";
import matriculaRoutes from "./matricula.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/turmas", turmaRoutes);
router.use("/matriculas", matriculaRoutes);


export default router;
