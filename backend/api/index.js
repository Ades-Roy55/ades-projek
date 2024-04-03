import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRouter from "./routes/user-route.js";
import CarsRouter from "./routes/cars-route.js"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const router = express.Router();
// router utama
app.use("/api", router);

// router anak
router.use("/user", UserRouter);
router.use("/car", CarsRouter);

app.listen(process.env.API_PORT, () =>
  console.log("Server berhasil dijalankan.")
);
