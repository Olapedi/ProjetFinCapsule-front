import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {

    value: AuthState;

}

type AuthState = {

    isAuth: boolean,
    email: string,
    useUid: string,
    isActivated: boolean,

}

const initialState = {

    value : {

        isAuth: false,
        email: "",
        useUid: "",
        isActivated: false,

    } as AuthState,

} as InitialState;

export const auth = createSlice({

    name : "auth",
    initialState,

    reducers: {

        logOut: () => {

            return initialState;
        },

        logIn: (state, action: PayloadAction<string>) => {

            return {
                
                value : {

                    isAuth: true,
                    email: action.payload,
                    useUid: "ohwfhkdjshfdskfjdshldskgjdsog",
                    isActivated : false,

                }

            }

        }

    }

})

export const { logIn, logOut } = auth.actions;
export default auth.reducer;