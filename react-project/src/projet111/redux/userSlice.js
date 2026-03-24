import { createSlice } from "@reduxjs/toolkit"
import swal from 'sweetalert'

const state = {
    current: null,
    users: [
        // { tz: "123456", firstName: "manager", lastName: "a", password: "111", isManager: true },
        // { tz: "12", firstName: "aa", lastName: "z", password: "222", isManager: false },
        // { tz: "456", firstName: "", lastName: "", password: "333", isManager: false },
        // { tz: "444", firstName: "p", lastName: "", password: "444", isManager: false },
        // { tz: "555", firstName: "", lastName: "", password: "555", isManager: false },
        // { tz: "0", firstName: "0", lastName: "dsf", password: "0", isManager: false }

    ]
}
const usersSlice = createSlice({
    name: "users",
    initialState: state,
    reducers: {
        // פעולה שקורית אחרי התחברות מוצלחת או זיהוי אוטומטי
        setCurrent: (state, action) => {
            state.current = action.payload;
        },

        // פעולה לרישום משתמש חדש (אם תרצי להשתמש בה אחרי ה-Register)
        registerUser: (state, action) => {
            state.current = action.payload;
            swal(`שלום ${action.payload.firstName}`, 'נרשמת בהצלחה למערכת', 'success');
        },

        // פעולה ליציאה מהמערכת
        logout: (state) => {
            state.current = null;
        }

    }
})
console.log(state.users);

// export const { add } = usesrsSlice.actions
export const { setCurrent, registerUser, logout } = usersSlice.actions;
export default usersSlice.reducer;
