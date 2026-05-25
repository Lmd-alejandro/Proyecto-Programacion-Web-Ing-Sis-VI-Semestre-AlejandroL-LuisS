const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const db = require("../config/db");

router.post("/register", async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    db.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo],
      async (error, resultados) => {
        if (error) {
          return res.status(500).json({
            mensaje: "error servidor",
          });
        }

        if (resultados.length > 0) {
          return res.status(400).json({
            mensaje: "el usuario ya existe",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          `
          INSERT INTO usuarios
          (nombre,correo,password,rol)
          VALUES (?,?,?,?)
          `,
          [nombre, correo, hashedPassword, "usuario"],
          (error) => {
            if (error) {
              return res.status(500).json({
                mensaje: "error servidor",
              });
            }

            res.json({
              mensaje: "usuario registrado",
            });
          },
        );
      },
    );
  } catch (error) {
    res.status(500).json({
      mensaje: "error servidor",
    });
  }
});

router.post("/login", (req, res) => {
  const { correo, password, rol } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE correo = ?",
    [correo],
    async (error, resultados) => {
      if (error) {
        return res.status(500).json({
          mensaje: "error servidor",
        });
      }

      if (resultados.length === 0) {
        return res.status(400).json({
          mensaje: "usuario no encontrado",
        });
      }

      const usuario = resultados[0];

      if (usuario.rol !== rol) {
        return res.status(401).json({
          mensaje: "rol incorrecto",
        });
      }

      const passwordCorrecta = await bcrypt.compare(password, usuario.password);

      if (!passwordCorrecta) {
        return res.status(401).json({
          mensaje: "contraseña incorrecta",
        });
      }

      res.json({
        mensaje: "login exitoso",

        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol,
        },
      });
    },
  );
});

module.exports = router;
