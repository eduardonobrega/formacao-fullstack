import { handleInput, toggleScreen, showNumbers } from "./dom-utils.js"

const END_LIMIT = 999
const START_LIMIT = END_LIMIT - 1
const AMOUNT_LIMIT = 100

const amount = document.getElementById("amount") // Input para quantidade de números a serem sorteados
const start = document.getElementById("min") // Input para valor mínimo do intervalo
const end = document.getElementById("max") // Input para valor máximo do intervalo
const notRepeat = document.getElementById("notRepeat") // Checkbox para não repetir números
const sectionForm = document.getElementById("sectionForm") // Seção do formulário
const result = document.getElementById("result") // Seção de resultados
const form = document.querySelector("form")

function setupDom({ lottery, handleSubmit }) {
    // Evento para quando o formulário for submetido
    form.addEventListener("submit", event => {
        event.preventDefault()
        handleSubmit({ start: start.value, end: end.value, amount: amount.value, notRepeat: notRepeat.checked })
    })

    // Evento para gerar novos números quando o botão de "Gerar Novos" for clicado
    result.querySelector(".btn").addEventListener("click", () => {
        lottery.generateNumbers(Number(start.value), Number(end.value), Number(amount.value), notRepeat)
        showNumbers({ lottery })
    })

    // Evento para voltar ao formulário e resetar o contador de sorteios
    result.querySelector("#back").addEventListener("click", () => {
        toggleScreen()
        lottery.resetDrawCount() // Reseta a contagem de sorteios
    })

    // Chama a função handleInput para os campos de quantidade e intervalo
    handleInput(amount, AMOUNT_LIMIT)
    handleInput(end, END_LIMIT)
    handleInput(start, START_LIMIT, true)
}

export { setupDom, result, sectionForm }
