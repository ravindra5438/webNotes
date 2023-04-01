import { Router } from "express";
import { getNotes } from "../controllers/note.js";

const router = Router();

router.get("/", getNotes);

export default router;
