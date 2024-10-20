import { Router } from "express";
import { createTodo, getUserTodos, updateTodo } from "../controllers/todo.controller.js";

const router = Router();

router.route("/").post(createTodo).get(getUserTodos);
router.route("/:id").patch(updateTodo);

export default router;