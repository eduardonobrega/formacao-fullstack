import { hoursLoad } from "../form/hours-load"

const selectedDate = document.getElementById("date")

// Buscar os agendamentos do dia selecionado e carregar as horas disponíveis
export function schedulesDay() {
    const date = selectedDate.value
    
    hoursLoad({ date })
}
