import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
import { useState } from 'react';

const users = [
    {
        userName:'midudev',
        name: 'Miguel Ángel Durrr',
        inicialIsFollowing: true
    },
    {
        userName:'patreon/kikobeats',
        name: 'Patreon King',
        inicialIsFollowing: false
    }
]

export function App (){
    // Pasar funciones
    //const formatUserName = (userName) => `@${userName}`
    // Pasar elementos
    //const formattedUserName = (<span>@miusename</span>)
    // const [isFollowing, setIsFollowing] = useState(false) <-- MALA PRÁCTICA.
    // console.log("Render de la App con isFollowing:", isFollowing)
    return (
        <section className='App'>
            {/* Pasar funciones
            <TwitterFollowCard formatUserName={formatUserName} userName="midudev" name="Miguel Ángel Durrr" isFollowing={true} />
            <TwitterFollowCard formatUserName={formatUserName} userName="patreon/kikobeats" name="Patreon King" isFollowing={false} />
                Pasar elementos
            <TwitterFollowCard formattedUserName={formattedUserName} userName="midudev" name="Miguel Ángel Durrr" isFollowing={true} />
            <TwitterFollowCard formattedUserName={formattedUserName} userName="patreon/kikobeats" name="Patreon King" isFollowing={false} />
             */}
            {/* Usamos isFollowing={false} para inicializar el estado el estado, buena práctica llamarlo inicialIsFollowing
                Utilizar una propiedad para inicializar el estado!!
            */}
            {/*<TwitterFollowCard userName="midudev" name="Miguel Ángel Durrr" inicialIsFollowing={isFollowing}/> --> MALA PRáCTICA*/}

            {/* CODIGO FINAL BUENO (SIN RECORRER ARRAY)
            <TwitterFollowCard userName="midudev" name="Miguel Ángel Durrr" inicialIsFollowing/>
            <TwitterFollowCard userName="patreon/kikobeats" name="Patreon King" inicialIsFollowing={false}/>*/}

            {/* Al cambiar el estado no cambia el botón del hijo, por que el estado solo se inicializa 1 vez!!!
                OJO:: -> Error común. (Mala práctica)

            <button onClick={()=>setIsFollowing(!isFollowing)}>
                Cambiar estado de la App
            </button>
            */}
            {
                // Sacar las propiedades de usuario y pasarlas a variables.
                users.map(({userName, name, inicialIsFollowing}) => (
                        <TwitterFollowCard
                            userName={userName}
                            name={name}
                            inicialIsFollowing={inicialIsFollowing}
                            key={userName} >
                            {/* No utilizar index ni Math.random -> Mala prácticas.
                                Para key mejor id de base de datos si no un dato que sea
                                único, que no posea otro usuario.
                                Si pasaramos el children como parámetro lo pondríamos así:
                                {name}
                            */}
                        </TwitterFollowCard>
                    )
                )
            }
        </section>
    )
}