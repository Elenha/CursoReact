import { useEffect, useState } from "react";
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`

export function App() {
    const [fact, setFact] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const getRandomFact = () => {
        fetch(CAT_ENDPOINT_RANDOM_FACT, { credentials: 'omit' })
            .then(response => {
                // TODO: Si la respuesta no es correcta, lanzar un error (if (!response.ok))
                return response.json()
            })
            .then(data => {
                const { fact } = data
                setFact(fact)
        })

        // Modo asincrono
        //async function fetchData() {
        //    const response = await fetch(CAT_ENDPOINT_RANDOM_FACT)
        //    const data = await response.json()
        //    setFact(data.fact)
        //}

        //fetchData()
    }
    // No puedess usar React Query, SWE,axios, apollo
    // Efecto para recuperar la cita al cargar la página
    useEffect(() => {
        getRandomFact()

    }, [])

    // Efecto para recuperar la imagen cada vez que enemos una cita nueva
    useEffect(() => {
        if (!fact) return
        // Obtener la primera palabra del hecho
        //const firstWord = fact.split(' ')[0]
        // Para obtener las 3 primeras palabras del hecho
        const firstThreeWords = fact.split(' ').slice(0, 3).join(' ')
        console.log(firstThreeWords)

        fetch(`https://cataas.com/cat/says/${firstThreeWords}?size=50&color=red&json=true`)
            .then(response => {
                // TODO: Si la respuesta no es correcta, lanzar un error (if (!response.ok))
                return response.json()
            })
            .then(data => {
                const { url } = data
                setImageUrl(url)
                console.log(url)
            })
    }, [fact])

    const handleClick = () => {
        getRandomFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            {/* Siempre piden que añadamos un botón para refrescar */}
            <button onClick={handleClick}>Obtener nuevo hecho</button>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={imageUrl} alt={`Imagen extraida usando las primeras 3 palabras de ${fact}`} />}
            </section>
        </main>
    );
}