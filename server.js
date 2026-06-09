const express = require("express");
const atividades = require("./dados")

const app = express()
const PORT = 5000

app.use(express.json());
app.use(express.static('public'))

//READ - listar todas as atividades

app.get("/atividades", (req, res) => {

    res.json(atividades);
});

//CREATE - cadastrar nova atividade

app.post("/atividades", (req, res) => {

    const novaAtividade = {
        id: Date.now(),
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        data: req.body.data,
        horario: req.body.horario,
        prioridade: req.body.prioridade,
        status: req.body.status
    };

    atividades.push(novaAtividade);

    res.json({
        mensagem: "Atividade cadastrada com sucesso",
        atividade: novaAtividade
    });
});

//UPDATE - editar uma atividade

app.post("/atividades/:id", (req, res) => {
    const id = Number(req.params.id);
    const atividade = atividades.find((item) => item.id === id)

    if (!atividade) {
        return res.status(404).json({
            mensagem: "Atividade não encontrada!"
        })
    }

    atividade.titulo = req.body.titulo;
    atividade.descricao = req.body.descricao;
    atividade.data = req.body.data;
    atividade.horario = req.body.horario;
    atividade.prioridade = req.body.prioridade;
    atividade.status = req.body.status;

    res.json({
        mensagem: "Atividade atualizada com sucesso!",
        atividade: atividade
    });
});

//DELETE - excluir uma atividade

app.delete("/atividades/:id", (req, res) => {
    const id = Number(req.params.id)
    const indice = atividades.findIndex((item) => item.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Atividade não encontrada!"
        })
    }

    atividades.splice(indice, 1);

    res.json({
        mensagem: "Atividade excluída com sucesso!"
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
