import express from "express";
import { login, register, userIsLogin } from "../controllers/user-controller.js";
import { middleware } from "../middleware/user-middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/my-account", middleware,userIsLogin);

export default router;
