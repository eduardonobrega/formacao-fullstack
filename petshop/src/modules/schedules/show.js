import dayjs from "dayjs"
import { removeSchedule } from "../../services/remove-schedule.js"

const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function showSchedules(dailySchedules) {
    periodMorning.textContent = ""
    periodAfternoon.textContent = ""
    periodNight.textContent = ""

    dailySchedules.forEach(schedule => {
        const li = document.createElement("li")
        const hourField = document.createElement("strong")
        const names = document.createElement("span")
        const pet = document.createElement("strong")
        const description = document.createElement("span")
        const removeButton = document.createElement("button")

        const date = dayjs(schedule.when)

        hourField.textContent = date.format("HH:mm")

        pet.textContent = schedule.pet
        names.append(pet, ` / ${schedule.owner}`)
        description.textContent = schedule.description
        removeButton.textContent = "Remover agendamento"
        removeButton.classList.add("link")
        removeButton.addEventListener("click", async () => await removeSchedule(schedule.id))

        li.append(hourField, names, description, removeButton)

        const hour = date.hour()

        if (hour <= 12) {
            periodMorning.appendChild(li)
        } else if (hour <= 18) {
            periodAfternoon.appendChild(li)
        } else {
            periodNight.appendChild(li)
        }
    })
}
