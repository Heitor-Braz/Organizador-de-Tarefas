Feature: Task List

  Scenario: Add a new task
    Given I have accessed the task page
    When I type "Estudar Cypress" into the new task input
    And I click the add button
    Then I should see the task "1. Estudar Cypress" in the list

  Scenario: Edit an existing task
    Given a task "Comprar pão" has been added
    When I edit the task to "Comprar pão integral"
    Then the task in the list should be "1. Comprar pão integral"

  Scenario: Delete a task
    Given a task "Lavar o carro" has been added
    When I click the delete button for that task
    Then it should no longer appear in the list
