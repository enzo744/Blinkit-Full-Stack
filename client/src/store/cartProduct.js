import { createSlice } from "@reduxjs/toolkit";
/*  1. Importazione di createSlice
Qui stai importando createSlice dalla libreria @reduxjs/toolkit. Redux Toolkit è 
un set di strumenti ufficiale di Redux che semplifica e ottimizza l'uso di Redux, 
rendendo il codice più semplice e riducendo la quantità di codice boilerplate. 
La funzione createSlice viene usata per creare in modo più semplice "slice" di stato, 
che sono in pratica sezioni del tuo stato globale, come nel caso del carrello (cart).
*/
const initialState = {
    cart : []
}
/* 2. Stato iniziale (initialState)
Qui viene definito lo stato iniziale del "slice" del carrello (cart). 
All'inizio, il carrello è vuoto, rappresentato da un array vuoto ([]). 
Questo stato viene passato alla funzione createSlice per inizializzare il "slice". */

const cartSlice = createSlice({
    name : "cartItem",
    initialState : initialState,
    reducers : {
        handleAddItemCart : (state, action) => {
            state.cart = [...action.payload]
        },
    }
})

/* 3. Creazione dello Slice (cartSlice)
Questa parte è dove viene effettivamente creato lo slice del carrello.

name: "cartItem" è il nome di questo slice di stato. Questo nome viene utilizzato 
internamente da Redux per identificare lo slice.

initialState: Qui stai passando lo stato iniziale che hai definito precedentemente. 
initialState è l'oggetto che contiene il carrello vuoto all'inizio.

reducers: Qui definisci le "azioni" (o reducers) che il tuo slice gestirà. 
Ogni azione è una funzione che modifica lo stato in base all'input che riceve 
(il payload). In questo caso, c'è una sola azione:

handleAddItemCart: Questa funzione viene utilizzata per aggiungere un nuovo elemento al carrello. 
La funzione accetta due parametri:
state: è lo stato attuale del carrello.
action: è l'oggetto che contiene le informazioni che vogliamo usare per modificare lo stato, come il payload.
In questa funzione, viene preso il payload dall'azione (presumibilmente un array con gli articoli da aggiungere) 
e viene usato per aggiornare il carrello. Noterai che state.cart = [...action.payload] 
crea una nuova copia dell'array action.payload per aggiornare lo stato. 
Questo è un modo per mantenere l'immutabilità dello stato in Redux 
(anche se Redux Toolkit fornisce una "mutabilità" sicura grazie alla libreria immer).
*/
export const { handleAddItemCart } = cartSlice.actions

export default cartSlice.reducer

/* 4. Esportazione delle azioni e del reducer  
export const { handleAddItemCart }: Questa riga estrae e esporta l'azione handleAddItemCart 
in modo che possa essere utilizzata in altre parti dell'app. 
Quando vuoi dispatchare questa azione (ad esempio, 
per aggiungere un elemento al carrello), userai questa funzione.

export default cartSlice.reducer: Qui viene esportato il "reducer" dello slice del carrello, 
che rappresenta una funzione che Redux utilizza per aggiornare lo stato in base alle azioni. 
Questo è il reducer che dovrai passare alla creazione dello store di Redux.

Riassunto:
Stai creando uno slice dello stato (in questo caso, un carrello) con createSlice.
Lo stato iniziale contiene un carrello vuoto (cart: []).
Hai definito una reducer function (handleAddItemCart) che aggiorna lo stato del carrello con il 
payload che riceve (aggiungendo o aggiornando gli elementi nel carrello).
Esporti sia l'azione (handleAddItemCart) per poterla usare in altri componenti, 
sia il reducer per poterlo usare nello store di Redux.
Questo è un esempio di come Redux Toolkit semplifica l'uso di Redux. 
La configurazione di Redux è molto più snella e meno verbosa rispetto al passato, grazie all'uso di createSlice.
*/