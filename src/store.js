import {configureStore, createSlice} from "@reduxjs/toolkit";
import user from './store/userSlice';

let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
});

let items = createSlice({
    name : 'items',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ]
})

export default configureStore({
    reducer : {
        user : user.reducer,
        stock : stock.reducer,
        items : items.reducer
    }
})



