import { interval } from "./random-utils.js"

export function validateNumbers(min, max, amount, notRepeat) {
    if ((!min || !max || !amount) && min !== 0 && max !== 0) {
        throw new Error("Necessário informar valores válidos.") // Verifica se todos os campos foram preenchidos
    }

    if (typeof min !== "number" || typeof max !== "number" || typeof amount !== "number") {
        throw new Error("Os valores devem ser números.") // Verifica se os valores são números
    }

    if (!Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(amount)) {
        throw new Error("Os valores devem ser inteiros.") // Verifica se os valores são inteiros
    }

    if (min < 0 || max < 0 || amount < 0) {
        throw new Error("Informe apenas valores positivos.") // Verifica se os valores são positivos
    }

    if (min > max) {
        throw new Error("O valor de min não pode ser maior que max.") // Verifica se o valor mínimo é menor que o máximo
    }

    if (amount > interval(min, max) && notRepeat) {
        throw new Error("Não é possível gerar essa quantidade de números neste intervalo.") // Verifica se é possível gerar a quantidade de números sem repetição
    }
}
