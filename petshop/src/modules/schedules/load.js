import { fetchSchedules } from "../../services/fetch-schedules.js"
import { hoursLoad } from "../form/hours-load.js"
import { showSchedules } from "./show.js"

const selectedDate = document.getElementById("date")

// Buscar os agendamentos do dia selecionado e carregar as horas disponíveis
export async function schedulesDay() {
    const date = selectedDate.value

    // Buscando os agendamentos na API
    const dailySchedules = await fetchSchedules({ date })

    // Carregando as horas disponíveis
    hoursLoad({ date })

    // Renderizando os agendamentos do dia selecionado
    showSchedules(dailySchedules)
}
