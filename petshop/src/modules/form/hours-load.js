import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours"

const select = document.getElementById("time")
const fragment = document.createDocumentFragment()

export function hoursLoad({ date }) {
    const hours = openingHours.map(hour => {
        const [h, m] = hour.split(":")

        const dateWithHour = dayjs(date).add(h, "hour")

        const isHourFuture = dateWithHour.isAfter(dayjs())

        return {
            hour,
            available: isHourFuture,
        }
    })

    const groupMorning = document.createElement("optgroup")
    const groupAfternoon = document.createElement("optgroup")
    const groupNight = document.createElement("optgroup")
    groupMorning.label = "Manhã"
    groupAfternoon.label = "Tarde"
    groupNight.label = "Noite"

    hours.forEach(({ hour, available }) => {
        const option = document.createElement("option")
        option.setAttribute("value", hour)
        option.textContent = hour
        option.disabled = !available

        const [h, m] = hour.split(":")

        if (h <= 12) {
            groupMorning.appendChild(option)
        } else if (h <= 18) {
            groupAfternoon.appendChild(option)
        } else if (h <= 21) {
            groupNight.appendChild(option)
        }
    })
    select.append(groupMorning, groupAfternoon, groupNight)
}
