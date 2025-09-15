import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'

const store = configureStore({
//as state.auth.status the file tries 
// to read JSON object as thats why auth: authSlice is necessary.
// {
//   "auth": {
//     "status": false,
//     "userData": null
//   }
// }
    reducer: {
        auth: authSlice,
    }
});

export default store;