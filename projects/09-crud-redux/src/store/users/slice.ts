import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Yazman Rodriguez",
		email: "yazmanito@gmail.com",
		github: "yazmanito",
	},
	{
		id: "2",
		name: "John Doe",
		email: "leo@gmail.com",
		github: "leo",
	},
	{
		id: "3",
		name: "Haakon Dahlberg",
		email: "haakon@gmail.com",
		github: "midudev",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

// IFIE: Immediately Invoked Function Expression, función que se ejecuta a sí misma,
// se ejecuta justo después de ser definida. En este caso, se utiliza para obtener el
// estado persistido en localStorage o usar el estado por defecto si no hay nada persistido.
const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

// Redux: podemos mutar el estado original, porque internamente Redux Toolkit utiliza Immer,
// que se encarga de crear un nuevo estado inmutable a partir de las mutaciones que hacemos
// en el estado original. Es decir, aunque parezca que estamos mutando el estado original,
// en realidad estamos creando un nuevo estado inmutable.
export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			// Generación de un ID único para cada usuario, usando la API de Web Crypto.
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
			//return [...state, { id, ...action.payload }]; <-- sin mutar el estado original,
			// creando un nuevo estado inmutable. Lo de arriba sustituye a esto!!
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
			}
		},
	},
});

// Lo que hace transformar el estado previo al nuevo dependiendo de la acción que se le indique.
// Reducer: recuperan el estado previo y con la acción, devuelven un nuevo estado.
export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
