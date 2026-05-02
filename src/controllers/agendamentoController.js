const pool = require("../db");

exports.criarAgendamento = async (req, res) => {
  const { nome, data, hora } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO agendamentos (nome, data, hora) VALUES ($1, $2, $3) RETURNING *",
      [nome, data, hora],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    // 👇 trata conflito do banco
    if (err.code === "23505") {
      return res.status(400).json({
        erro: "Já existe um agendamento para esse horário",
      });
    }

    console.error(err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};

exports.listarAgendamentos = async (req, res) => {
  const result = await pool.query("SELECT * FROM agendamentos");
  res.json(result.rows);
};

exports.deletarAgendamento = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM agendamentos WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        erro: "Agendamento não encontrado",
      });
    }

    res.json({ mensagem: "Agendamento deletado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};
