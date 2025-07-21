import dayjs from "dayjs"
import { apiConfig } from "./api-config.js"

export async function fetchSchedules({ date }) {
    try {
        const schedules = await fetch(`${apiConfig.baseURL}/schedules`).then(res => res.json())

        const dailySchedules = schedules.filter(schedule => dayjs(date).isSame(schedule.when, "day"))

        return dailySchedules
    } catch (error) {
        console.log(error)
        alert("Não foi possível buscar os agendamentos!")
    }
}
