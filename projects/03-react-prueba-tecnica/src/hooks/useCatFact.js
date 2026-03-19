import { useEffect, useState } from "react";
import { getRandomFact } from "../services/facts";

export function useCatFact () {
    const [fact, setFact] = useState(null)

    const refreshFact = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }

    // No puedess usar React Query, SWE,axios, apollo
    // Efecto para recuperar la cita al cargar la página
    useEffect(refreshFact, [])

    return { fact, refreshFact }
}