import { createSlice } from '@reduxjs/toolkit';
import { clearData, getData, setData } from '../../locatStorage';

const initialState = getData();

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
            setData(state);
        },
        setError: (state, action) => {
            state.user = null;
            state.error = action.payload
            setData(state);
        },
        clearUser: (state, action) => {
            state.user = null;
            state.error = null;
            setData(state)
        },
    }
})

export const { setUser, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;