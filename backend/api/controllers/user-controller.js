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
    res.status(201).json({
      msg: "Akun berhasil terdaftar",
      data: result.rows[0],
    });
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
        res.status(200).json({ msg: "Berhasil Login", token });
      } else {
        res.status(401).json({ msg: "password salah" });
      }
    } else {
      return res.status(404).json({ msg: "Email tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const userIsLogin = async (req, res) => {
  try {
    const userId = req.user.id; // Mengambil ID pengguna dari token
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (result.rows.length > 0) {
      return res.json({
        status: "Berhasil",
        msg: `${result.rows[0].username} sedang login`,
        data: result.rows[0],
      });
    } else {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};


export const getAllUser = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [userId]);
    if (result.rowCount > 0) {
      res.status(200).json({ msg: "Pengguna berhasil dihapus" });
    } else {
      res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
