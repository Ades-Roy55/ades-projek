import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await argon2.hash(password);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hash]
    );
    // console.log(req.body);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await pool.query("SELECT *FROM users WHERE email = $1", [
      email,
    ]);
    if (findUser.rows[0]) {
      const passwordtrue = await argon2.verify(
        findUser.rows[0].password,
        password
      );
      if (passwordtrue) {
        const token = jwt.sign(findUser.rows[0], process.env.SECRET_KEY);
        res.cookie("token", token, {
          httpOnly: true,
        });
        res.status(200).send("Berhasil Login");
      } else {
        res.status(401).send("password salah");
      }
    } else {
      return res.status(404).send("Email tidak ditemukan");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const userIsLogin = async (req, res) => {
  try {
    return res.json({
      status: "Berhasil",
      msg: `${req.user.username} sedang login`,
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
