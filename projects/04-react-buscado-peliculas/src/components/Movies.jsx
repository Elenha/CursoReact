function ListOfMovies ({ movies }) {
    return (
        <ul className='movies'>
        {
            movies.map(movie => (
            /* MALA práctica , esta ligado al contrato de la API dentro de nuestro componente,
                está atado a como funciona nuestra API, lo ideal es que el componente no dependa
                de la estructura de la API, sino que sea más genérico y reutilizable, para eso
                se puede hacer un mapeo de los datos que nos llegan de la API a un formato que
                nuestro componente pueda entender, así nuestro componente no depende de la
                estructura de la API y podemos cambiar la API sin tener que cambiar nuestro
                componente.
            */
            <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.image} alt={movie.title} />
            </li>
            ))}
        </ul>
    )
}

function NoMoviesResults () {
    return (
        <p>No se encontraron películas para esta búsqueda. Por favor, intenta con otro título.</p>
    )
}

export function Movies ({ movies }) {
    const hasMovies = movies && movies.length > 0

    return (
        hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />
    )
}