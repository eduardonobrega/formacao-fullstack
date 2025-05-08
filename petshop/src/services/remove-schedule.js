import { apiConfig } from "./api-config.js"
import { schedulesDay } from "../modules/schedules/load.js"

export async function removeSchedule(id) {
    try {
        const isConfirm = confirm("Certeza que deseja remover este agendamento?")

        if (!isConfirm) {
            return
        }

        await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
            method: "DELETE",
        })
        await schedulesDay()
    } catch (error) {
        console.log(error)
        alert("Não foi possível remover o agendamento.")
    }
}
