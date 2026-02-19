const form = document.querySelector("form")
const inputTextItem = document.querySelector("form input")
const listaElement = document.querySelector("ul")
const btnSort = document.querySelector(".btn-sort")
let lista = []
const message = document.querySelector(".message")
const btnCloseMessage = message.querySelector("button")
let messageTimer

function addItem(item) {
    const jaTem = lista.some(({ name }) => name.toLowerCase() === item.toLowerCase())

    if (jaTem) {
        alert("Item já adicionado na lista")
        return
    }

    lista.unshift({
        name: item,
        checked: false,
    })
    renderLista()
}

function shoMessage(name) {
    if (messageTimer) {
        clearTimeout(messageTimer)
    }

    message.querySelector("span").textContent = `${name} foi removido da lista`
    message.classList.add("show")

    messageTimer = setTimeout(() => {
        message.classList.remove("show")
        messageTimer = null // Limpa a variável após o uso
    }, 2000)
}

function removeItem(index) {
    const item = lista.splice(index, 1)
    renderLista()
    shoMessage(item[0].name)
}

function handleFormSubmit(event) {
    event.preventDefault()

    const item = inputTextItem.value
    inputTextItem.value = ""
    if (!item) {
        return
    }

    addItem(item)
}

function changeStateItem(index, state) {
    lista[index].checked = state
    sortList()
}

function renderLista() {
    listaElement.innerHTML = ""
    const fragment = document.createDocumentFragment()

    lista.forEach((item, i) => {
        const li = document.createElement("li")
        const label = document.createElement("label")
        const input = document.createElement("input")
        const p = document.createElement("p")

        input.setAttribute("type", "checkbox")
        input.checked = item.checked
        p.textContent = item.name

        label.append(input, p)

        const button = document.createElement("button")
        button.setAttribute("aria-label", "Remover item")
        button.innerHTML = ` 
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13 3.66669L12.5869 10.3501C12.4813 12.0576 12.4285 12.9114 12.0005 13.5253C11.7889 13.8288 11.5165 14.0849 11.2005 14.2774C10.5614 14.6667 9.706 14.6667 7.99513 14.6667C6.28208 14.6667 5.42553 14.6667 4.78603 14.2766C4.46987 14.0838 4.19733 13.8272 3.98579 13.5232C3.55792 12.9084 3.5063 12.0534 3.40307 10.3435L3 3.66669"
                stroke="#6B6671"
                stroke-linecap="round"
            />
            <path
                d="M2 3.66665H14M10.7038 3.66665L10.2487 2.7278C9.9464 2.10415 9.7952 1.79233 9.53447 1.59785C9.47667 1.55471 9.4154 1.51634 9.35133 1.48311C9.0626 1.33331 8.71607 1.33331 8.023 1.33331C7.31253 1.33331 6.95733 1.33331 6.66379 1.48939C6.59873 1.52399 6.53665 1.56391 6.47819 1.60876C6.21443 1.81111 6.06709 2.13435 5.77241 2.78082L5.36861 3.66665"
                stroke="#6B6671"
                stroke-linecap="round"
            />
            <path d="M6.33337 11V7" stroke="#6B6671" stroke-linecap="round" />
            <path d="M9.66663 11V7" stroke="#6B6671" stroke-linecap="round" />
        </svg>`

        button.addEventListener("click", () => {
            removeItem(i)
        })
        input.addEventListener("change", () => {
            changeStateItem(i, input.checked)
        })

        li.append(label, button)
        fragment.appendChild(li)
    })

    listaElement.appendChild(fragment)
    localStorage.setItem("@quicklist", JSON.stringify(lista))
}

function sortList(byName = false) {
    lista.sort((a, b) => {
        if (a.checked !== b.checked) {
            return a.checked ? 1 : -1
        }

        if (byName) {
            return a.name.localeCompare(b.name)
        }
    })
    renderLista()
}

form.addEventListener("submit", handleFormSubmit)
btnSort.addEventListener("click", () => sortList(true))
btnCloseMessage.addEventListener("click", () => message.classList.remove("show"))

window.addEventListener("load", () => {
    try {
        const data = localStorage.getItem("@quicklist")
        if (data) {
            lista = JSON.parse(data)
            renderLista()
        }
    } catch (error) {
        console.error("Erro ao carregar dados do LocalStorage", error)
        lista = []
    }
})
