import { useState } from "react";

export function TwitterFollowCard ({userName, name, inicialIsFollowing}) {
    // Si ponemos userName = `@{userName}` estamos modificando la propiedad
    // el parámetro que nos pasan, ESO NO SE DEBE HACER, ni los arrays
    // haciendo por ejemplo numbers.push(4), si el array numbers = {1,2,3}
    // NO MUTAR LOS PARÁMETROS DE ENTRADA --> OJO DEBEN SER INMUTABLES
    // Sin embargo esto si es correcto
    // const nombreUsuario = `@{userName}`

    // Meter el estado, variable si estamos o no siguiendo al usuario, estado inicial = false
    //const state = useState(false);
    // Valor de la primera  posición state es valor del estado
    //const isFollowing = state[0]
    // Valor de la primera  posición state es función que nos permite actualizar estado
    //const setIsFollowing = state[1]

    // Modo compacto para hacer lo del estado de arriba
    const[isFollowing, setIsFollowing] = useState(inicialIsFollowing);

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    // Cambiar texto del botón
    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    // Cambiar estilo del botón
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button';

    // Renderizar
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-avatar' alt="Avatar de Neflix" src={`https://unavatar.io/${userName}`} />
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    {/* (para función, atributo a pasar se llama formatUserName)
                    <span className='tw-followCard-infoUserName'>{formatUserName(userName)}</span>
                        (para elemento, atributo a pasar se llama formatUserName)
                    <span className='tw-followCard-infoUserName'>{formattedUserName}</span>
                    */}
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}