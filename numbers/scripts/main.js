import { Lottery } from "./lottery.js" // Importa a classe Lottery
import { validateNumbers } from "./validation.js" // Função de validação
import { toggleScreen, showNumbers } from "./dom-utils.js" // Funções de manipulação de DOM
import { setupDom } from "./dom.js" // Função para configurar os eventos

// Instancia a classe da loteria
const lottery = new Lottery()

// Função que lida com o envio do formulário
function handleSubmit({ start, end, amount, notRepeat }) {
    try {
        // Valida os parâmetros antes de gerar os números
        validateNumbers(Number(start), Number(end), Number(amount), notRepeat)

        // Gera os números sorteados
        lottery.generateNumbers(Number(start), Number(end), Number(amount), notRepeat)
        toggleScreen() // Alterna para a tela de resultados
        showNumbers({ lottery }) // Exibe os números sorteados
    } catch (error) {
        alert(`Erro: ${error.message}`) // Exibe um alerta em caso de erro
    }
}

setupDom({ handleSubmit, lottery })
