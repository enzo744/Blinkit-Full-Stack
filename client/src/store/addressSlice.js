import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    addressList : []
}

const addressSlice = createSlice({
    name : "address",
    initialState : initialValue,
    reducers : {    // Qui definisci le "azioni" (o reducers) che il tuo slice gestirà.
        handleAddAddress : (state, action)=>{
            state.addressList = [...action.payload]
        },
    }
})

export const { handleAddAddress } = addressSlice.actions

export default addressSlice.reducer