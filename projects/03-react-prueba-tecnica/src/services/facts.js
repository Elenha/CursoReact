const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// Esto lo puedes utilizar en cuanquier sitio??? --> EVITAR PASAR EL SET de un estado.
export const getRandomFact = async () => {
    const response = await fetch(CAT_ENDPOINT_RANDOM_FACT, { credentials: 'omit' })
    const data = await response.json()
    const { fact } = data
    return fact

    // Modo sincrono
    // return fetch(CAT_ENDPOINT_RANDOM_FACT, { credentials: 'omit' }) // Devuelve una promesa
    //     .then(response => {
    //         // TODO: Si la respuesta no es correcta, lanzar un error (if (!response.ok))
    //         return response.json()
    //     }) // Devuelve otra promesa pero la hemos concatenada con el fetch anterior
    //     .then(data => {
    //         const { fact } = data
    //         return fact
    //      }) // Devuelve una promesa con el hecho del gato
    }