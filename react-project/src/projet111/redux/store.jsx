import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './userSlice'
import requestReducer from "./requestSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        requests: requestReducer
    }
})
export default store
