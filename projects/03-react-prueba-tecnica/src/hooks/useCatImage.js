import { useEffect, useState } from "react";

export function useCatImage({ fact }) {
    const [imageUrl, setImageUrl] = useState(null)

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

    return {imageUrl}
}