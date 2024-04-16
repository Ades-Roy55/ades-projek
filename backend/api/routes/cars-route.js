import express from "express";
import {
  login,
  register,
  userIsLogin,
} from "../controllers/user-controller.js";
import { middleware } from "../middleware/user-middleware.js";
import {
  addCars,
  deleteCars,
  getAllCars,
  updateCars,
} from "../controllers/cars-controller.js";

const router = express.Router();

router.get("/get-all",middleware, getAllCars);
router.post("/add-car", middleware, addCars);
router.put("/update-car/:id", middleware, updateCars);
router.delete("/delete-car/:id", middleware, deleteCars);
export default router;
