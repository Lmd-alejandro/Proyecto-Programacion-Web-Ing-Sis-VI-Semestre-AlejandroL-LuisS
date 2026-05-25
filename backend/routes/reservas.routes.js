const express = require("express");

const router = express.Router();

const db = require("../config/db");

router.get("/", (req,res) => {

    db.query(

        "SELECT * FROM reservas",

        (error,resultados) => {

            if(error){

                return res.status(500).json({

                    mensaje:"error servidor"

                });

            }

            res.json(resultados);

        }

    );

});

router.post("/", (req,res) => {

    const {

        estudiante,
        tutor,
        fecha,
        hora

    } = req.body;

    db.query(

        `
        INSERT INTO reservas
        (
            estudiante,
            tutor,
            fecha,
            hora
        )
        VALUES
        (?,?,?,?)
        `,

        [
            estudiante,
            tutor,
            fecha,
            hora
        ],

        (error,resultado) => {

            if(error){

                return res.status(500).json({

                    mensaje:"error servidor"

                });

            }

            res.json({

                mensaje:"reserva creada"

            });

        }

    );

});

module.exports = router;