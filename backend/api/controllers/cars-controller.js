import { pool } from "../config/db.js";

export const getAllCars = async (req, res) => {
  try {
    const result = await pool.query("SELECT *FROM cars");
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const addCars = async (req, res) => {
  const { merk, tahun_rilis, description, image } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cars (merk, tahun_rilis, description, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [merk, tahun_rilis, description, image]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const updateCars = async (req, res) => {
  const { merk, tahun_rilis, description, image } = req.body;
  try {
    const result = await pool.query(
      "UPDATE  cars SET merk = $1, tahun_rilis = $2, description = $3, image = $4 WHERE id = $5 RETURNING *",
      [merk, tahun_rilis, description, image, req.params.id]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteCars = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM cars WHERE id = $1", [
      req.params.id,
    ]);
    res.status(200).send("data Berhasil dihapus");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
