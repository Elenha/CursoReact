import './App.css'
import { useCatImage } from "./hooks/useCatImage";
import { useCatFact } from "./hooks/useCatFact";
import { Otro } from './component/Otro';

//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=red&json=true`

export function App() {

    const { fact, refreshFact } = useCatFact()
    const { imageUrl } = useCatImage({ fact })

    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            {/* Siempre piden que añadamos un botón para refrescar */}
            <button onClick={handleClick}>Obtener nuevo hecho</button>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={imageUrl} alt={`Imagen extraida usando las primeras 3 palabras de ${fact}`} />}

                {/*<Otro />*/}
            </section>
        </main>
    );
}