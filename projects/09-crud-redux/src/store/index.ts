import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, { rollbackUser } from "./users/slice";

// Middleware: es un código que se ejecuta entre que se lanza una acción y el momento
// en el que el reducer recibe esa acción.
const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previousState = store.getState() as RootState;
		next(action);

		if (type === "users/deleteUserById") {
			// <- eliminado un usuario
			const userIdToRemove = payload;
			const userToRemove = previousState.users.find(
				(user) => user.id === userIdToRemove,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
				method: "DELETE",
			})
				.then((res) => {
					// if (res.ok) {
					// 	toast.success(`Usuario ${payload} eliminado correctamente`)
					// }
					throw new Error("Error al eliminar el usuario");
				})
				.catch((err) => {
					toast.error(`Error deleting user ${userIdToRemove}`);
					// Rollback: volver a añadir el usuario eliminado al estado,
					// para que el usuario no note que ha habido un error.
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log(err);
					console.log("error");
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

// INTENTAR TIPAR LO MENOS POSIBLE, exportar un tipo, de la función store.getState()
// el tipo que devuelve sea el RootState. ReturnType obtiene el tipo que retorna la función
// store.getState().
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
