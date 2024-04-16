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


export const getAllUser = async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const editUser = async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  try {
    // Temukan pengguna berdasarkan ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    // Perbarui data pengguna
    user.username = updatedUserData.username;
    user.email = updatedUserData.email;
    
    // Simpan perubahan
    await user.save();

    res.status(200).json({ message: 'Data pengguna berhasil diperbarui', user });
  } catch (error) {
    console.error('Gagal mengedit data pengguna:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengedit data pengguna' });
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

export const logoutAccount = async (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.clearCookie("token");
  res.status(200).json({ msg: "Logout berhasil" });
};