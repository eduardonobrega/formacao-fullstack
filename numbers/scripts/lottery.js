// Classe que representa a lógica da loteria

import { randomNumber } from "./random-utils.js"

export class Lottery {
    constructor() {
        this.numbers = [] // Lista para armazenar os números sorteados
        this.drawCount = 0 // Contador de sorteios
    }

    // Função que gera os números sorteados
    generateNumbers(min, max, amount, notRepeat) {
        this.numbers = [] // Reseta os números sorteados
        this.drawCount++ // Incrementa o contador de sorteios

        // Gera os números sorteados
        for (let i = 0; i < amount; i++) {
            let number = randomNumber(min, max)

            // Se o usuário não quer números repetidos
            if (notRepeat && this.numbers.includes(number)) {
                // Gera até encontrar um número que não esteja na lista
                while (this.numbers.includes(number)) {
                    number = randomNumber(min, max)
                }
            }

            this.numbers.push(number) // Adiciona o número sorteado à lista
        }
    }

    // Retorna a lista de números sorteados
    getNumbers() {
        return this.numbers
    }

    // Retorna o contador de sorteios
    getDrawCount() {
        return this.drawCount
    }

    // Reseta o contador de sorteios
    resetDrawCount() {
        this.drawCount = 0
    }
}
