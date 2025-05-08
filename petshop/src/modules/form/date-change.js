import { schedulesDay } from "../schedules/load.js"
import { hoursLoad } from "./hours-load.js"

const dateForm = document.getElementById("dateForm")
const date = document.getElementById("date")

dateForm.addEventListener("change", () => hoursLoad({ date: dateForm.value }))

date.addEventListener("change", () => {
    schedulesDay({ date: date.value })
    dateForm.value = date.value
})
