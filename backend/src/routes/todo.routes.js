import { Router } from "express";
import { createTodo, getUserTodos, updateTodo } from "../controllers/todo.controller.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.route("/").post(createTodo);
router.get('/', getUserTodos);
router.route("/:id").patch(updateTodo);

export default router;