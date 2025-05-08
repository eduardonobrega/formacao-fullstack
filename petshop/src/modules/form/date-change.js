import { hoursLoad } from "./hours-load.js"

const selectedDate = document.getElementById("dateForm")

dateForm.addEventListener("change", () => hoursLoad({ date: selectedDate.value }))
