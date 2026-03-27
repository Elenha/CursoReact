import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

// App.css -> borrar todos los estilos!!
function App() {

  // Estado para almacenar los resultados de la API
  // Tipar el estado const [users, setUsers] = useState([])
  const [users, setUsers] = useState<User[]>([])
  // Estado para colorear filas pares e impares
  const [showColors, setShowColors] = useState(false)
  // Estado para ordenar por país
  //const [sortByCountry, setSortByCountry] = useState(false)
  // NO CREAR OTRO ESTADO PARA CONSERVAR LOS USUARIOS ORIGINALES
  // NI UNA VARIABLE, lo correcto usar un useRef

  // Aplicar filtro a todas las columnas
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)

  // Estado para filtrar por país según cadena proporcionada!!
  const [filterContry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])
  // useRef -> para guardar un valor
  // que queremos que se comparta/preserven entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente

  // Función para poner o quitar colores a las filas de la tabla
  const toggleColors = () => {
    setShowColors(!showColors)
  }

  // Función para ordenar por país
  const toggleSortByCountry = () => {
    // Forma correcta de hacerlo si se llama al serSortByCountry varias veces seguidas
    // de como está hecho en el toggleColors si se llama varias veces seguidas puede dar
    // problemas porque el estado NO se actualiza de forma síncrona.
    //setSortByCountry(prevState => !prevState)
    // Aplicar filtro a todas las columnas
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  // Función para eliminar el usuario con el uuid proporcionado
  const handleDelete = (uuid: string) => {
    // Filtramos los usuarios y devolvemos todos los que su uuid sea diferente
    // al pasado por parámetro!!
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUsers)
    // Se usa el uuid por que es unico!! NUNCA UTILIZAR EL INDICE
  }


  // Función para resetear estado
  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  // Para hacer fetch recuperar listado usar useEffect
  useEffect(() => {
		fetch('https://randomuser.me/api?results=100')
		  .then(async res => await res.json())
		  .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
		  })
		  .catch(err => {
			console.error(err)
		  })
	}, [])

  // Función ordenación columnas
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  // Primero filtramos los usuarios y luego los ordenamos!!
  // Usamos un useMemo por que se esta ejecutando cuando no debe!!
  const filteredUsers = useMemo (() => {
      return filterContry != null && filterContry.length > 0
        ? users.filter((user) => {
          // Devuelve: Todos los usuarios que incluyan el filtro del usuario!!
          return user.location.country.toLocaleLowerCase().includes(filterContry.toLocaleLowerCase())
        })
        : users
    },[users, filterContry])

     // Esto se ejecuta siempre que hacemos cualquier acción, buscar por pais, colorear filas, para
    // arreglar esto vamos a usar un useMemo
    const sortedUsers =  useMemo(() => {
      // Función para ordenar los usuarios por país
      // Para hacer una copia del array:
        // 1.- [...users].sort((a, b) =>) :: (opción mejor si el toSorted no es compatible).
        // 2.- structuredClone(users).sort((a, b) =>) :: Compia más completa del array, más robusta pero pesada.
        // 3.- users.toSorted((a, b) =>) :: esta última no es compatible con todos los navegadores.
      // toSorted hace exactamente lo mismo pero devuelve un copia ordenada sin modificar
      // el original!!! toSorted es la mejor opción de las 3!! Forma de usarla: ver types.d.ts
      //const sortedUsers = sortByCountry ?
      // users.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
      //  : users // Si no se ordena, se devuelve el array original sin modificar

      //return sorting === SortBy.COUNTRY ?
        //  filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
        //: filteredUsers // Si no se ordena, se devuelve el array original sin modificar

      //const sortedUsers = sortByCountry ? users.sort((a, b) =>
      // a.location.country.localeCompare(b.location.country))
      //: users // ESTA MAL POR QUE ESTÁS MUTANDO EL ESTADO ORIGINAL, HAY QUE CREAR UNA COPIA ANTES DE ORDENARLO

      // Para que ordene por columnas!!
      if (sorting === SortBy.NONE) return filteredUsers

      if (sorting === SortBy.COUNTRY)
        return filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))

      if (sorting === SortBy.NAME)
        return filteredUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))

      if (sorting === SortBy.LAST)
        return filteredUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))


    },[filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>{showColors ? 'Quitar colores' : 'Colorear filas'}</button>
        <button onClick={toggleSortByCountry}>{sorting === SortBy.COUNTRY ? 'Desordenar por país' : 'Ordenar por país'}</button>
        <button onClick={handleReset}>Resetear estado</button>
        <input placeholder='Filtra por país' onChange={(e) => {setFilterCountry(e.target.value)}} />
      </header>
      <main>
        <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
      {
        // Ver que devuelve resultados la API.
        //JSON.stringify(users)
      }
    </div>
  )
}

export default App
