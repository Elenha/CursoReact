import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'
//import { useRef } from 'react'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    // Para que no valide la primera vez que se renderiza el componente,
    // ya que el estado inicial es una cadena vacía, entonces no queremos
    // mostrar un error en ese momento, por eso usamos useRef para mantener
    // un valor persistente entre renders que nos indique si es la
    // primera vez que se está validando el input o no.
    if(isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if(search.length === 0) {
      setError('No se puede buscar una película sin título')
      return
    }else if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    setError(null)

  }, [search])

  return {search, updateSearch, error}
}
function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const { movies, getMovies, loading } = useMovies({search, sort})
  //const inputRef = useRef() <-- ABUSA DE ESTO MUCHO

  // No dice si ordena o no por título las pelisculas
  const handleSort = () => {
    setSort(!sort)
  }
  const handleSubmit= (event) => {
    event.preventDefault()
    getMovies({search})
    // current es nativo de React, es una propiedad que tiene el valor actual
    // del elemento al que se le asigna la referencia, en este caso el input,
    // entonces inputRef.current.value nos da el valor actual del input.
    //const value = inputRef.current.value

    // Recuperar los datos con el evento
    //const fields = new FormData(event.target)
    //const query = fields.get('query')
    // OTRA FORMA MAS COMPACTA QUE TE DEVUELVE LOS VALORES EN UN OBJETO (DESCONTROLADA..
    // required también es, recomendado!!), FORMA CONTROLADA CREANDO ESTADO)
    //const {query} = Object.fromEntries(new FormData(event.target))
    console.log({search})
  }
  // No funciona el debounce por que trata cada función como si fuera diferente
  // Se esta creando en cada render un nuevo debounce en realidad, funciones diferentes.
  const debouncedGetMovies = useCallback (
    debounce(search => {
      console.log('searching', search)
      getMovies({search})
    }, 300)
    , [getMovies]
  )

  const handleChange = (event) => {
    // Puedes poner prevalidaciones de input, ej: no permitir espacios vacios....
    const newSearch = event.target.value
    updateSearch(newSearch)
    /// **** Haz que la búsqueda se haga automáticamente al escribir.
    debouncedGetMovies(newSearch)
    /* La validación se puede hacer aquí!!!
    if(newQuery.length === 0) {
      setError('No se puede buscar una película sin título')
      return
    }else if (newQuery.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    setError(null)*/
  }
  // Para ver cuantas veces se renderiza el componente usando getMovies.
  useEffect(() => {
    console.log('useEffect getMovies')
  }, [getMovies])

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          {/* <input ref={inputRef} type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <input name='query' type='text' placeholder='Avengers, Star Wars, The Matrix...' /> :DESCONTROLADA*/}
          <input onChange={handleChange} value={search} name='query' type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
