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

    hours.forEach(({ hour, available }) => {
        const option = document.createElement("option")
        option.setAttribute("value", hour)
        option.textContent = hour
        option.disabled = !available
        fragment.append(option)
    })
    select.appendChild(fragment)
}
