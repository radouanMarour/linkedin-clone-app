import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { auth } from './firebase';
import { clearUser, setError, setUser } from "./redux/slices/authSlice";

export const signUp = (name, email, password) => async (dispatch) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        await updateProfile(user, {
            uid: user.uid,
            displayName: name,
            email: user.email
        })

        const userInfo = {
            uid: user.uid,
            name: user.displayName,
            email: user.email
        }
        console.log(userInfo);
        dispatch(setUser(userInfo));
    } catch (err) {
        dispatch(setError(err.message));
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        const userInfo = {
            uid: user.uid,
            name: user.displayName,
            email: user.email
        }
        dispatch(setUser(userInfo));
    } catch (err) {
        dispatch(setError(err.message));
    }
}

export const logout = () => async (dispatch) => {
    try {
        await signOut(auth);
        dispatch(clearUser());
    } catch (err) {
        dispatch(setError(err.message));
    }
}