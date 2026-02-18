const amountElement = document.getElementById("amount")
const currencyElement = document.getElementById("currency")
const form = document.querySelector("form")
const description = document.getElementById("description")
const result = document.getElementById("result")

const moedas = {
    USD: {
        cotacao: 5.4,
        local: "en-US",
    },
    EUR: {
        cotacao: 6.21,
        local: "de-DE",
    },
    GBP: {
        cotacao: 7.13,
        local: "en-GB",
    },
}

function handleAmountChange() {
    // 1. Troca vírgula por ponto (para padrão americano de cálculos)
    let value = amountElement.value.replace(",", ".")
    // 2. Remove letras e deixa apenas números e o ponto
    amountElement.value = value.replace(/[^0-9.]/g, "")
}

function handleSubmit(event) {
    event.preventDefault()

    const amount = Number(amountElement.value)
    const currency = currencyElement.value

    if (!amount || currency === "") {
        return
    }

    showResult(amount, currency)
}

function showResult(amount, currency) {
    try {
        const moeda = moedas[currency]

        document.querySelector("footer").classList.add("show-result")

        // Mostra a cotação base da moeda escolhida (Ex: USD 1 = R$ 5,40)
        description.textContent = `${formatCurrency(1, moeda.local, currency)} = ${formatCurrency(moeda.cotacao)}`

        // Mostra o valor total convertido, formatado em Reais
        result.textContent = formatCurrency(convert(amount, currency))
    } catch (error) {
        console.error("Erro ao converter moeda:", error)
        document.querySelector("footer").classList.remove("show-result")
    }
}

function convert(value, currency) {
    return value * moedas[currency].cotacao
}

function formatCurrency(value, local = "pt-BR", moeda = "BRL") {
    return new Intl.NumberFormat(local, {
        style: "currency",
        currency: moeda,
    }).format(value)
}

form.addEventListener("submit", handleSubmit)
amountElement.addEventListener("input", handleAmountChange)
