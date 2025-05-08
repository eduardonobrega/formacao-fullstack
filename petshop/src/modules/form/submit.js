const dayjs = require("dayjs")
const { newSchedule } = require("../schedules/new-schedule.js")
const { closeForm } = require("./show.js")

const form = document.querySelector("form")
// Fields
const owner = document.getElementById("owner")
const pet = document.getElementById("pet")
const phone = document.getElementById("phone")
const description = document.getElementById("description")
const dateForm = document.getElementById("dateForm")
const time = document.getElementById("time")

form.addEventListener("submit", async event => {
    event.preventDefault()

    try {
        if (!owner.value || !pet.value || !phone.value || !description.value || !dateForm.value || !time.value) {
            return alert("Informe todos os campos!")
        }
        const [hour, minutes] = time.value.split(":")

        const when = dayjs(dateForm.value).add(Number(hour), "hour")

        await newSchedule({
            owner: owner.value,
            pet: pet.value,
            phone: phone.value,
            description: description.value,
            when,
        })
        
        closeForm()
        alert("Agendamento criado com sucesso")
    } catch (error) {
        console.log(error)
        alert("Não foi possível enviar os dados!")
    }
})
