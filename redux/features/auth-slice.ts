import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {

    value: AuthState;

}

type AuthState = {

    token: string,
    userUid: string,
    isActivated: boolean,
    isCertified: boolean,

}

const initialState = {

    value : {

        token: "",
        userUid: "",
        isActivated: false,
        isCertified: false,

    } as AuthState,

} as InitialState;

export const auth = createSlice({

    name : "auth",
    initialState,

    reducers: {

        logOut: () => {

            return initialState;
        },

        logIn: (state, action: PayloadAction<AuthState>) => {

            return {
                value : {
                    token: action.payload.token,
                    userUid: action.payload.userUid,
                    isActivated : action.payload.isActivated,
                    isCertified: action.payload.isCertified,
                }
            }
        },

        activate:(state) => {
            state.value.isActivated = true
        }
    }

})

export const { logIn, logOut, activate } = auth.actions;
export default auth.reducer;