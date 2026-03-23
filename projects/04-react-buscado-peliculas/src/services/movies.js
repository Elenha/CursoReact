const API_KEY = '98e8e9ff'
export const serachMovies = async ({search}) => {
    if(search === '')  return null

    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
        // Hacer el mapeo de datps aquí!!!
        const movies = json.Search

        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster
        }))

    }catch(error) {
        throw new Error(`Error buscando películas: ${error.message}`)
    }
}