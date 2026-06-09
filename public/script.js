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
        const card = document.createElement("div");
        card.innerHTML = `
<h3>${atividade.titulo}</h3>
<p>${atividade.descricao}</p>
<p><strong>Data:</strong> ${atividade.data}</p>
<p><strong>Horário:</strong> ${atividade.horario}</p>
<p><strong>Prioridade:</strong> ${atividade.prioridade}</p>
<p><strong>Status:</strong> ${atividade.status}</p>
<button onclick="editarAtividade(${atividade.id})">Editar</button>
<button onclick="excluirAtividade(${atividade.id})">Excluir</button>
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

