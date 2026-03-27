import { SortBy, type User } from '../types.d';

// Tipar las props de UsersList
interface Props {
    changeSorting: (sort: SortBy) => void
    deleteUser: (uuid: string) => void
    showColors: boolean;
    users: User[];
}

// Indicar que el objeto users es del tipo Props
export function UsersList ({changeSorting, deleteUser, showColors, users}: Props) {

    // table, thead, tbody <-- SON LA CLAVE, tr --> row, td --> cell, th --> celdas del header
    // Para la key si se van a eliminar elementos es mala idea usar el index.
    return (
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th className='pointer' onClick={() => changeSorting(SortBy.NAME) }>Nombre</th>
                    <th className='pointer' onClick={() => changeSorting(SortBy.LAST) }>Apellido</th>
                    <th className='pointer' onClick={() => changeSorting(SortBy.COUNTRY) }>País</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
				{
					users.map((user, index) => {
                        const backgroundColor = index % 2 === 0 && showColors ? '#202002' : '#240404';
                        const color = showColors ? backgroundColor : 'transparent';
						return (
							<tr key={user.login.uuid} style={{backgroundColor: color}}>
                                <td><img src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} /></td>
								<td>{user.name.first}</td>
								<td>{user.name.last}</td>
								<td>{user.location.country}</td>
								<td><button onClick={() => {deleteUser(user.login.uuid)}}>Borrar</button></td>
							</tr>
						)
					})
				}
            </tbody>
        </table>
    )
}