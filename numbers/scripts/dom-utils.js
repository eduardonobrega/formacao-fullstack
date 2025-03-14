import { result, sectionForm } from "./dom.js"

function toggleScreen() {
    result.classList.toggle("hide")
    sectionForm.classList.toggle("hide")
}

function showNumbers({ lottery }) {
    const ul = document.querySelector(".numbers") // Seleciona a lista onde os números serão exibidos
    const fragment = document.createDocumentFragment() // Cria um fragmento para otimizar a inserção no DOM

    result.querySelector("span").textContent = `${lottery.getDrawCount()}º resultado` // Exibe o número do sorteio

    // Itera sobre os números sorteados e cria os elementos de lista
    lottery.getNumbers().forEach(number => {
        const li = document.createElement("li")
        li.textContent = number
        fragment.appendChild(li)
    })

    // Limpa a lista e adiciona os novos números
    ul.textContent = ""
    ul.appendChild(fragment)
}

function handleInput(inputElement, limit, allowZero = false) {
    inputElement.addEventListener("input", () => {
        let value = inputElement.value
        value = value.replace(/\D+/g, "") // Remove tudo que não for número

        if (value == 0 && !allowZero) {
            value = ""
        } else if (value > limit) {
            value = Math.floor(value / 10)
        }
        inputElement.value = value
    })
}

export { showNumbers, toggleScreen, handleInput }
