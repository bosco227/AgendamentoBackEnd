const express = require("express");
const router = express.Router();

const {
  criarAgendamento,
  listarAgendamentos,
  deletarAgendamento,
} = require("../controllers/agendamentoController");

router.post("/", criarAgendamento);
router.get("/", listarAgendamentos);
router.delete("/:id", deletarAgendamento);

module.exports = router;
