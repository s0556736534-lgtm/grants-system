import { createSlice } from "@reduxjs/toolkit"
const state = {
    asksList: [
        //     {
        //    personal:{ tz: "327583100", firstName: "0", lastName: "0", dateOfBirth: "0", adress: "0", phoneNumber: "0", email: "0" },
        //   family:{ fatherName: "", motherName: "", numOfChildren: "", siblings19Plus: "" },
        //   course:{ course: "", paymentLearn: "", years: "" },
        //   bank:{ acountOwner: "", bankName: "", branchNum: "", accountNum: "" },
        //   id: "0",
        //   status: "pending"}
    ],

    count: 0,
    current: {
        personal: {},
        family: {},
        course: {},
        bank: {},
        id: "0",
        status: "pending"

    }
    
}
const requestSlice = createSlice({
    name: "requests",
    initialState: state,
    reducers: {
        update: (state, action) => {
            const { typeForm, data } = action.payload
            state.current[typeForm] = {
                ...state.current[typeForm], ...data
            }
        },
        add: (state, action) => {
            state.count++
            state.asksList.push(state.current)
            state.current = {
                personal: {},
                family: {},
                course: {},
                bank: {},
                id: state.count,
                status: "pending"
            }


        },
        allow: (state, action) => {
            // ⬅️ תיקון: בדיקה מפורשת של קיום ה-payload וה-id
            const idValue = action.payload._id;

            if (idValue !== null && idValue !== undefined) {
                // המרת הערך למחרוזת רק אם הוא קיים
                const l = state.asksList.find(x => String(x._id) === String(action.payload._id));
                // const l = state.asksList.find(x => x._id === action.payload._id.toString())
                // const idToFind = String(idValue);

                // const l = state.asksList.find(x => x._id === idToFind)
                if (l)
                    l.status = "allow"
            }
            else {
                console.error("Allow Dispatch Failed: ID is missing or null.", action.payload);
            }

            console.log('allow');

        },

        reject: (state, action) => {
            // ⬅️ תיקון: בדיקה מפורשת של קיום ה-payload וה-id
            const idValue = action.payload?._id;

            if (idValue !== null && idValue !== undefined) {
                // המרת הערך למחרוזת רק אם הוא קיים
                const l = state.asksList.find(x => String(x._id) === String(action.payload._id));
                // const l = state.asksList.find(x => x._id === action.payload._id.toString())
                // const idToFind = String(idValue);

                // const l = state.asksList.find(x => x._id === idToFind)
                if (l)
                    l.status = "reject"
            } else {
                console.error("Reject Dispatch Failed: ID is missing or null.", action.payload);
            }
        },
        setAsksList: (state, action) => {
        // action.payload יהיה המערך שמגיע מה-axios.get
        state.asksList = action.payload;
        },
        resetRequests: (state) => {
        state.asksList = [];
        state.current = { personal: {}, family: {}, course: {}, bank: {}, id: "0", status: "pending" };
    }
    }
})
export const selectNotAllowed = state => state.requests.asksList.filter(x => x.status !== "allow") || []
export const { add, allow, reject, update, setAsksList, resetRequests } = requestSlice.actions //, bank, course, family,personal
export default requestSlice.reducer