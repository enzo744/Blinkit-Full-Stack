import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    order : []
}

export const orderSlice = createSlice({
    name : 'order',
    initialState : initialValue,
    reducers : {    // si definiscono le azioni (reducers) state e action.
    // state è lo stato attuale dell'ordine.
    // action è l'oggetto che contiene le informazioni che vogliamo usare per modificare lo stato, come il payload. 
        setOrder : (state, action) => {
            state.order = [...action.payload]   // crea una nuova copia 
            // dell'array e lo assegna alla variabile state.order
        }
    }
})

export const { setOrder } = orderSlice.actions

export default orderSlice.reducer