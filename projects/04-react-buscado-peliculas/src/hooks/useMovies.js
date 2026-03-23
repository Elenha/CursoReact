import { useRef, useState, useMemo, useCallback } from 'react'
import { serachMovies } from '../services/movies'



// Se va a preocupar de hacer todo el fechting de los datos, manejar el estado de la
// aplicación, manejar los errores, etc.
export function useMovies ({search, sort}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Usar un useRef para 'Evitar que se haga la misma búsqueda dos veces seguidas'.
  const previousSearch = useRef(search)
  /* SACARLO A UN SERVICIO Y HACER EL MAPEO DE DATOS ALLÍ,
    PARA QUE EL HOOK SOLO SE PREOCUPE DE TRAER LOS DATOS Y NO
    DE TRANSFORMARLOS, ASÍ SE SEPARA LA LÓGICA DE OBTENER LOS
    DATOS DE LA LÓGICA DE TRANSFORMAR LOS DATOS, LO CUAL HACE
    QUE EL CÓDIGOS SEA MÁS LIMPIO Y MANTENIBLE. (movies.js)

  const movies = reponseMovies.Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster
  }))

  const getMovies = () => {
    if(search){
      //setResponseMovies(withResults)
      fetch(`https://www.omdbapi.com/?apikey=98e8e9ff&s=${search}`)
        .then(res => res.json())
        .then(json => {
            setResponseMovies(json)
          })
    } else {
      setResponseMovies(withError)
    }
  }*/
  // Cada vez que se haga una búsqueda diferente a la anterior,
  // se va a ejecutar la función getMovies, usando el useCallback (para funciones).
  const getMovies = useCallback( async ({search}) => {
    // Antes de la busqueda miramos si lo que estamos buscando es lo mismo
    // que la búsqueda anterior, si es así, no hacemos nada.
    if(search === previousSearch.current) return

    try{
        setLoading(true)
        setError(null)
        // Actualizamos el valor de la búsqueda anterior con el valor actual de la búsqueda.
        previousSearch.current = search
        const newMovies = await serachMovies({search})
        setMovies(newMovies)
    }catch  (error) {
        setError(error.message)
    } finally {
      // Se ejecuta tanto en el try como en el catch!
        setLoading(false)
    }

  }, [])

  // [...movies] --> Copia del array de películas para no mutar el estado original.
  // localeCompare --> Método de JavaScript que compara dos cadenas con acentos y caracteres especiales.
  //const sortedMovies = sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  // Evitar ordenar si las peliculas no han cambiado, solo se ejecuta cuando cambia el valor de sort o movies.
  const sortedMovies = useMemo(() => {
    console.log('memoSortedMovies')
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
  }, [sort, movies])

  return {movies: sortedMovies, getMovies, loading }
  //return { movies: mappedMovies, getMovies }
}