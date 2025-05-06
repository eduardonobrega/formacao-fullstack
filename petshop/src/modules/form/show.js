const formSection = document.getElementById("form")
const modal = document.getElementById("modal")
const button = document.getElementById("open-form")

// Abre o formulário ao clicar no botão +
button.addEventListener("click", () => modal.classList.add("open"))

// Fecha o modal quando é clicado fora da seção do form
modal.addEventListener("click", event => {
    if (!formSection.contains(event.target)) {
        modal.classList.remove("open")
    }
})
