import dayjs from "dayjs"
import { schedulesDay } from "./schedules/load"

// Adicionando data atual nos inputs de data
const datesInput = document.querySelectorAll("input[type=date]")
const today = dayjs().format("YYYY-MM-DD")
datesInput.forEach(input => {
    input.value = today
    input.min = today
})

document.addEventListener("DOMContentLoaded", schedulesDay)
