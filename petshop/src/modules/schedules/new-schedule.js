import { apiConfig } from "../../services/api-config.js"

export async function newSchedule({ owner, pet, phone, description, when }) {
    try {
        await fetch(`${apiConfig.baseURL}/schedules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ owner, pet, phone, description, when }), // Envia os dados como JSON
        })
    } catch (error) {
        console.log(error)
        alert("Não foi possível agendar!")
    }
}
