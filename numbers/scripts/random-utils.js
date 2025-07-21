function interval(min, max) {
    return max - min + 1
}
// Função que gera um número aleatório dentro de um intervalo
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export { interval, randomNumber }
