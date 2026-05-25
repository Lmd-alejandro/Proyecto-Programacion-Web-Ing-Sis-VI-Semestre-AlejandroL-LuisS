require("dotenv").config();

const express = require("express");

const cors = require("cors");

const app = express();

const db = require("./config/db");

const authRoutes = require("./routes/auth.routes");

const tutoresRoutes = require("./routes/tutores.routes");

const reservasRoutes = require("./routes/reservas.routes");

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/tutores", tutoresRoutes);

app.use("/api/reservas", reservasRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "backend funcionando",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
