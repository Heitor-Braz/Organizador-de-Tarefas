describe('Lista de Tarefas', () => {

  beforeEach(() => {
    // Visita a página antes de cada teste (ajuste a URL se necessário)
    cy.visit('index.html'); // ou o caminho do seu app
  });

  it('Deve carregar a página corretamente', () => {
    cy.contains('Minhas Tarefas');
    cy.get('#entrada-tarefa').should('exist');
    cy.get('#form-tarefa').should('exist');
  });

  it('Deve adicionar uma nova tarefa', () => {
    cy.get('#entrada-tarefa').type('Estudar Cypress');
    cy.get('#form-tarefa').submit();

    cy.get('#lista-tarefas').should('contain', '1. Estudar Cypress');
  });

  it('Deve editar uma tarefa existente', () => {
    cy.get('#entrada-tarefa').type('Comprar pão');
    cy.get('#form-tarefa').submit();

    // Clica no botão de editar
    cy.contains('Editar').click();

    // Simula o prompt de edição
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns('Comprar pão integral');
    });

    // Clica novamente após o stub
    cy.contains('Editar').click();

    cy.get('#lista-tarefas')
      .should('contain', '1. Comprar pão integral');
  });

  it('Deve excluir uma tarefa', () => {
    cy.get('#entrada-tarefa').type('Lavar o carro');
    cy.get('#form-tarefa').submit();

    cy.contains('Excluir').click();

    cy.get('#lista-tarefas').should('not.contain', 'Lavar o carro');
  });
});
