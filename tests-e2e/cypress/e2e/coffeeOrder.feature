Feature: Coffee Order Creation

  Background:
    Given que estou na página home

  @automated
  Scenario Outline: Criar um café clássico sem adicionais
    When seleciono os ingredientes base "<ingredientesBase>"
    And confirmo a seleção dos ingredientes base
    Then o sistema deve reconhecer o sabor clássico "<saborClassico>"
    And o sistema deve reconhecer o adicional "Nenhum"
    And o preço total deve ser exibido corretamente com o valor "<precoClassico>"

    Examples:
      | ingredientesBase            | saborClassico | precoClassico |
      | Espresso,Leite              | Latte         | 9.00          |
      | Espresso,Leite,Chocolate    | Mocha         | 9.00          |
      | Sorvete,Chocolate           | Chocolatudo   | 30.00         |
      | Espresso,Leite,Espuma       | Macchiato     | 8.00          |

@automated
  Scenario Outline: Criar um café personalizado com adicionais
    When seleciono os ingredientes base "<ingredientesBase>"
    And adiciono os adicionais "<adicional1>" e "<adicional2>"
    And confirmo a seleção dos ingredientes base
    Then o sistema deve reconhecer o sabor clássico "Café personalizado"
    And o sistema deve reconhecer os adicionais "<adicional1>" e "<adicional2>"
    And o preço total deve ser exibido corretamente com o valor "<precoTotal>"

    Examples:
      | ingredientesBase       | adicional1 | adicional2 | precoTotal |
      | Espuma,Sorvete         | Chantilly  | Canela     | 11.00      |
      | Espuma,Chocolate,Leite | Chantilly  | Canela     | 12.00      |


  @automated
  Scenario: Tentar criar um café com menos de dois ingredientes base
    When seleciono os ingredientes base "Espuma"
    And confirmo a seleção dos ingredientes base
    Then o sistema deve exibir a mensagem de erro "Selecione pelo menos 2 ingredientes base"

  @automated
  Scenario: Tentar adicionar mais de dois adicionais
    When seleciono os ingredientes base "Espresso"
    And adiciono três adicionais
    Then o sistema deve exibir a mensagem de erro "Você só pode selecionar até 2 adicionais."
