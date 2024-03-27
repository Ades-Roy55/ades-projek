const express = require('express');
const mariadb = require('mariadb');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'ferrari'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

pool.getConnection()
    .then(conn => {
        console.log('Database connected'); 
        conn.release(); 
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
    });

app.post('/api/v1/register', (req, res) => {
  const { nama_pengguna, email, password } = req.body;
  pool.getConnection()
          .then(conn => {
              conn.query('SELECT * FROM users WHERE email = ?', [email])
                  .then(result => {
                      conn.release(); // Mengembalikan koneksi ke pool
  
                      // Jika email sudah terdaftar, kirim pesan error
                      if (result.length > 0) {
                          res.status(400).json({ error: 'Email sudah terdaftar' });
                      } else {
                          // Jika email belum terdaftar, lanjutkan proses registrasi
                          bcrypt.genSalt(10, (err, salt) => {
                              if (err) {
                                  res.status(500).json({ error: 'Server error' });
                              } else {
                                  bcrypt.hash(password, salt, (err, hash) => {
                                      if (err) {
                                          res.status(500).json({ error: 'Server error' });
                                      } else {
                                          const hashedPassword = hash;
                                          pool.getConnection()
                                              .then(conn => {
                                                  conn.query('INSERT INTO users (nama_pengguna, email, password) VALUES (?, ?, ?)', [nama_pengguna, email, hashedPassword])
                                                      .then(result => {
                                                          res.status(200).json({ message: 'Registrasi berhasil' });
                                                          conn.release(); // Mengembalikan koneksi ke pool
                                                      })
                                                      .catch(err => {
                                                          res.status(500).json({ error: 'Gagal mendaftar, email sudah digunakan' });
                                                          conn.release(); // Mengembalikan koneksi ke pool
                                                      });
                                              })
                                              .catch(err => {
                                                  res.status(500).json({ error: 'Server error' });
                                              });
                                      }
                                  });
                              }
                          });
                      }
                  })
                  .catch(err => {
                      res.status(500).json({ error: 'Server error' });
                  });
          })
          .catch(err => {
              res.status(500).json({ error: 'Server error' });
          });
  });
  
  
  app.post('/api/v1/login', (req, res) => {
      const { email, password } = req.body;
      pool.getConnection()
          .then(conn => {
              conn.query('SELECT * FROM users WHERE email = ?', [email])
                  .then(result => {
                      conn.release(); // mengembalikan koneksi ke pool
                      if (result.length === 0) {
                          res.status(404).json({ error: 'Email tidak ditemukan' });
                      } else {
                          bcrypt.compare(password, result[0].password, (err, isMatch) => {
                              if (err) {
                                  res.status(500).json({ error: 'Server error' });
                              } else {
                                  if (isMatch) {
                                      const token = jwt.sign({ id: result[0].id_user }, 'rahasia');
                                      res.status(200).json({ message: 'Berhasil login' }); // Pesan berhasil login
                                  } else {
                                      res.status(401).json({ error: 'Password salah' });
                                  }
                              }
                          });
                      }
                  })
                  .catch(err => {
                      res.status(500).json({ error: 'Server error' });
                  });
          })
          .catch(err => {
              res.status(500).json({ error: 'Server error' });
          });
  });
// Middleware untuk verifikasi token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token tidak disediakan' });
    }

    jwt.verify(token, 'rahasia', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token tidak valid' });
        }
        req.userId = decoded.id;
        next();
    });
}

app.get('/api/v1/private', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Akses diterima' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
