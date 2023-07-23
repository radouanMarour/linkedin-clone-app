import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from './firebase';
import { clearUser, setError, setUser } from "./redux/slices/authSlice";

export const signUp = (name, email, password) => async (dispatch) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        await updateProfile(user, {
            uid: user.uid,
            displayName: name,
            email: user.email,
            photoUrl: ""
        })

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            fName: name,
            email: user.email,
            headline: "",
            about: "",
            photoUrl: "",
            followers: []
        });

    } catch (err) {
        dispatch(setError(err.message));
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const userInfo = userSnap.data();

        const userData = {
            uid: userInfo.uid,
            name: userInfo.fName,
            email: userInfo.email,
            headline: userInfo.headline,
            about: userInfo.about,
            photoUrl: userInfo.photoUrl
        }
        dispatch(setUser(userData));
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