const express = require("express");

const router = express.Router();

const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM tutores", (error, resultados) => {
    if (error) {
      return res.status(500).json({
        mensaje: "error servidor",
      });
    }

    res.json(resultados);
  });
});

router.post("/", (req, res) => {
  const { nombre, materia, ciudad, precio, descripcion, imagen } = req.body;

  db.query(
    `
    INSERT INTO tutores
    (nombre,materia,ciudad,precio,descripcion,imagen)
    VALUES (?,?,?,?,?,?)
    `,
    [nombre, materia, ciudad, precio, descripcion, imagen],
    (error) => {
      if (error) {
        return res.status(500).json({
          mensaje: "error servidor",
        });
      }

      res.json({
        mensaje: "tutor creado",
      });
    },
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const { nombre } = req.body;

  db.query(
    `
    UPDATE tutores
    SET nombre=?
    WHERE id=?
    `,
    [nombre, id],
    (error) => {
      if (error) {
        return res.status(500).json({
          mensaje: "error servidor",
        });
      }

      res.json({
        mensaje: "tutor actualizado",
      });
    },
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tutores WHERE id=?", [id], (error) => {
    if (error) {
      return res.status(500).json({
        mensaje: "error servidor",
      });
    }

    res.json({
      mensaje: "tutor eliminado",
    });
  });
});

module.exports = router;
