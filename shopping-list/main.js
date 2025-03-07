let itens = [];

const input = document.getElementById("newItem");
const alertBox = document.querySelector(".alert");
const closeAlertBtn = document.getElementById("closeAlert");
const alertDescription = alertBox.querySelector("span");

function showAlert(itemName) {
    alertBox.classList.remove("hide");

    alertDescription.textContent = `${itemName} foi removido da lista`;

    const timeout = setTimeout(() => {
        alertBox.classList.add("hide");
    }, 3000);

    closeAlertBtn.onclick = () => {
        alertBox.classList.add("hide");
        clearTimeout(timeout);
    };
}

function updateItensLocal() {
    localStorage.setItem("@quicklist:itens", JSON.stringify(itens));
}

function toggleItem(item) {
    itens = itens.map((obj) =>
        obj.item === item ? { ...obj, checked: !obj.checked } : obj
    );
    updateItensLocal();
}

function updateItemView() {
    const ul = document.querySelector("ul");

    ul.innerHTML = "";

    itens.forEach(({ item, checked }) => {
        const li = document.createElement("li");

        li.classList.add("list-item");
        li.innerHTML = `
            <label>
                <div>
                    <input
                        type="checkbox"
                        name=${item}
                        id=${item}
                        ${checked ? "checked" : ""}
                    />
                    <span>${item}</span>
                </div>

                <button class="delete">
                    <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13 4.16669L12.5869 10.8501C12.4813 12.5576 12.4285 13.4114 12.0005 14.0253C11.7889 14.3288 11.5165 14.5849 11.2005 14.7774C10.5614 15.1667 9.706 15.1667 7.99513 15.1667C6.28208 15.1667 5.42553 15.1667 4.78603 14.7766C4.46987 14.5838 4.19733 14.3272 3.98579 14.0232C3.55792 13.4084 3.5063 12.5534 3.40307 10.8435L3 4.16669"
                            stroke="#6B6671"
                            stroke-linecap="round"
                        />
                        <path
                            d="M2 4.16665H14M10.7038 4.16665L10.2487 3.2278C9.9464 2.60415 9.7952 2.29233 9.53447 2.09785C9.47667 2.05471 9.4154 2.01634 9.35133 1.98311C9.0626 1.83331 8.71607 1.83331 8.023 1.83331C7.31253 1.83331 6.95733 1.83331 6.66379 1.98939C6.59873 2.02399 6.53665 2.06391 6.47819 2.10876C6.21443 2.31111 6.06709 2.63435 5.77241 3.28082L5.36861 4.16665"
                            stroke="#6B6671"
                            stroke-linecap="round"
                        />
                        <path
                            d="M6.33337 11.5V7.5"
                            stroke="#6B6671"
                            stroke-linecap="round"
                        />
                        <path
                            d="M9.66663 11.5V7.5"
                            stroke="#6B6671"
                            stroke-linecap="round"
                        />
                    </svg>
                </button>
            </label>
        `;

        li.querySelector(".delete").addEventListener("click", () =>
            removeItem(item)
        );
        const checkbox = li.querySelector("input");

        checkbox.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                checkbox.checked = !checkbox.checked;
            }
        });
        checkbox.addEventListener("change", () => toggleItem(item));
        ul.append(li);
    });
}

function addNewItem(item) {
    itens.unshift({ item, checked: false });
    updateItemView();
    updateItensLocal();
}

function removeItem(itemRemoved) {
    itens = itens.filter(({ item }) => item !== itemRemoved);
    updateItemView();
    updateItensLocal();
    showAlert(itemRemoved);
}

function validateInput(input) {
    // Campo não vazio
    if (!input) {
        alert("Informe um item!");
        return false;
    }

    // Apenas caracteres válidos
    if (!/^[a-zA-ZÀ-ÿ0-9\s,.()-]+$/.test(input)) {
        alert("O item contém caracteres inválidos!");
        return false;
    }

    // Tamanho mínimo e máximo:
    if (input.length < 2 || input.length > 50) {
        alert("O item deve ter entre 2 e 50 caracteres.");
        return false;
    }

    // Evitar itens duplicados:
    input = String(input).toLowerCase();
    const itemOnList = itens.some((obj) => obj.item === input);

    if (itemOnList) {
        alert(`${input} já foi adicionado`);
        return false;
    }

    return true;
}

function handleSubmit() {
    let newItem = input.value.trim().replace(/\s+/g, " "); // Remove espaços extras

    if (validateInput(newItem)) {
        input.value = "";
        addNewItem(newItem.toLowerCase());
    }
}

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    handleSubmit();
});

window.addEventListener("load", () => {
    const localItens = localStorage.getItem("@quicklist:itens");

    itens = localItens ? JSON.parse(localItens) : [];
    updateItemView();
});
