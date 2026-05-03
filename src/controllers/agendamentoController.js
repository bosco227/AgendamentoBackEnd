let agendamentos = [];

exports.criarAgendamento = (req, res) => {
  const { nome, data, hora } = req.body;

  if (!nome || !data || !hora) {
    return res.status(400).json({ erro: "Dados obrigatórios" });
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dataAgendada = new Date(data);
  dataAgendada.setHours(0, 0, 0, 0);

  const diferenca = (dataAgendada - hoje) / (1000 * 60 * 60 * 24);

  if (diferenca < 3) {
    return res.status(400).json({
      erro: "Agendamento deve ter no mínimo 3 dias de antecedência",
    });
  }

  const conflito = agendamentos.find((a) => a.data === data && a.hora === hora);

  if (conflito) {
    return res.status(400).json({
      erro: "Já existe um agendamento para esse horário",
    });
  }

  const novo = {
    id: Date.now(),
    nome,
    data,
    hora,
  };

  agendamentos.push(novo);

  res.status(201).json(novo);
};

exports.listarAgendamentos = (req, res) => {
  res.json(agendamentos);
};

exports.deletarAgendamento = (req, res) => {
  const { id } = req.params;

  const index = agendamentos.findIndex((a) => a.id == id);

  if (index === -1) {
    return res.status(404).json({ erro: "Agendamento não encontrado" });
  }

  agendamentos.splice(index, 1);

  res.json({ mensagem: "Deletado com sucesso" });
};
