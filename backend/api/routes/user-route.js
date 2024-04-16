import express from "express";
import { deleteUser, editUser, login, logoutAccount, register, userIsLogin } from "../controllers/user-controller.js";
import { middleware } from "../middleware/user-middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", middleware, logoutAccount);
router.put("/edit-user", middleware, editUser); 
router.delete("/delete-users/:id", deleteUser);
router.get("/my-account", middleware,userIsLogin);

export default router;
