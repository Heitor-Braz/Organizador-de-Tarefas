let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const formularioTarefa = document.getElementById("form-tarefa");
const entradaTarefa = document.getElementById("entrada-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
  listaTarefas.innerHTML = "";
  tarefas.sort((a, b) => a.id - b.id).forEach((tarefa, indice) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <span>${indice + 1}. ${tarefa.texto}</span>
      <div>
        <button onclick="editarTarefa(${tarefa.id})">Editar</button>
        <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
      </div>
    `;
    listaTarefas.appendChild(item);
  });
}

function adicionarTarefa(texto) {
  const novaTarefa = { id: Date.now(), texto: texto.trim() };
  tarefas.push(novaTarefa);
  salvarTarefas();
  renderizarTarefas();
}

function editarTarefa(id) {
  const tarefa = tarefas.find(t => t.id === id);
  const novoTexto = prompt("Editar tarefa:", tarefa.texto);
  if (novoTexto) {
    tarefa.texto = novoTexto.trim();
    salvarTarefas();
    renderizarTarefas();
  }
}

function excluirTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvarTarefas();
  renderizarTarefas();
}

formularioTarefa.addEventListener("submit", evento => {
  evento.preventDefault();
  adicionarTarefa(entradaTarefa.value);
  entradaTarefa.value = "";
});

renderizarTarefas();

