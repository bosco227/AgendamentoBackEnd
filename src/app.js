const express = require("express");
const cors = require("cors");

const agendamentoRoutes = require("./routes/agendamentoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/agendamentos", agendamentoRoutes);

module.exports = app;
