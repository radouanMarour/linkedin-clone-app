import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.user = null;
            state.error = action.payload
        },
        clearUser: (state, action) => {
            state.user = null;
            state.error = null;
        }
    }
})

export const { setUser, setError, clearUser } = authSlice.actions;
export default authSlice.reducer;