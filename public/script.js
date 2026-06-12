const API_URL = "/atividades";
const formAtividade = document.getElementById("formAtividade");
const inputId = document.getElementById("id");
const inputTitulo = document.getElementById("titulo");
const inputDescricao = document.getElementById("descricao");
const inputData = document.getElementById("data");
const inputHorario = document.getElementById("horario");
const inputPrioridade = document.getElementById("prioridade");
const inputStatus = document.getElementById("status");
const listaAtividades = document.getElementById("listaAtividades");
async function carregarAtividades() {
    const resposta = await fetch(API_URL);
    const atividades = await resposta.json();

    listaAtividades.innerHTML = "";

    atividades.forEach((atividade) => {

        let corPrioridade = "";
        let corfundo = "";


        if (atividade.prioridade == "Baixa") {
            corPrioridade = "rgb(15, 146, 15)"
        } else if (atividade.prioridade == "Média") {
            corPrioridade = "rgb(255, 179, 0)"
        } else if (atividade.prioridade == "Alta") {
            corPrioridade = "rgb(201, 26, 26)"
        }

        if (atividade.status == "Concluída") {
            corfundo = "rgb(15, 146, 15, 0.25)"
        } else if (atividade.status == "Pendente") {
            corfundo = "rgba(255, 179, 0, 0.25)"
        } else if (atividade.status == "Em Andamento") {
            corfundo = "rgba(139, 161, 188, 0.45)"
            corPrioridade = "rgb(14, 91, 185)"
        }

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="informacoes">
                <div class="card-dados">
                    <div class="card-titulo">
                        <h3>${atividade.titulo}</h3>
                    </div>
                    <div class="card-descricao">
                        <p>${atividade.descricao}</p>
                    </div>
                </div>
                <div class="campo-linha">
                    <p><strong>Data:</strong> ${atividade.data}</p>
                    <p><strong>Horário:</strong> ${atividade.horario}</p>
                </div>
                <div class="campo-coluna">
                    <p style="color: ${corPrioridade}; font-weight: bold;">
                        <strong>Prioridade:</strong> ${atividade.prioridade}
                    </p>
                    <p style="color: ${corPrioridade}; font-weight: bold; background-color: ${corfundo}; border-radius: 7px; padding: 2px 8px;">
                        <strong>Status:</strong> ${atividade.status}
                    </p>
                </div>
            </div>

            <div class="card-botoes">
                <button onclick="editarAtividade(${atividade.id})">Editar</button>
                <button id="excluir" onclick="excluirAtividade(${atividade.id})">Excluir</button>
            </div>
        `;

        listaAtividades.appendChild(card);
    });
}

formAtividade.addEventListener("submit", async (event) => {
    event.preventDefault();
    const atividade = {
        titulo: inputTitulo.value,
        descricao: inputDescricao.value,
        data: inputData.value,
        horario: inputHorario.value,
        prioridade: inputPrioridade.value,
        status: inputStatus.value
    };
    if (inputId.value) {
        await fetch(`${API_URL}/${inputId.value}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atividade)
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atividade)
        });
    }
    limparFormulario();
    carregarAtividades();
});
async function editarAtividade(id) {
    const resposta = await fetch(API_URL);
    const atividades = await resposta.json();
    const atividade = atividades.find((item) => item.id === id);
    inputId.value = atividade.id;
    inputTitulo.value = atividade.titulo;
    inputDescricao.value = atividade.descricao;
    inputData.value = atividade.data;
    inputHorario.value = atividade.horario;
    inputPrioridade.value = atividade.prioridade;
    inputStatus.value = atividade.status;
}
async function excluirAtividade(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    carregarAtividades();
}
function limparFormulario() {
    inputId.value = "";
    inputTitulo.value = "";
    inputDescricao.value = "";
    inputData.value = "";
    inputHorario.value = "";
    inputPrioridade.value = "";
    inputStatus.value = "";
}
document.getElementById("btnLimpar").addEventListener("click", limparFormulario);
carregarAtividades();

