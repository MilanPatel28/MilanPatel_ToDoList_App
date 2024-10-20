import { Router } from "express";
import { registerUser, loginUser, logoutUser, checkAuth } from "../controllers/user.controller.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', verifyJWT, checkAuth);

export default router;