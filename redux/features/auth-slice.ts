import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {

    value: AuthState;

}

type AuthState = {

    token: string,
    usrUid: string,
    isActivated: boolean,
    isCertified: boolean,
    
    // plan: string,
    // currentProfile: string, => profileuid
    // avatar: string,
}

const initialState = {

    value : {

        token: "",
        usrUid: "",
        isActivated: false,
        isCertified: false,
        // currentProfile: "",
        // avatar: "",
    } as AuthState,

} as InitialState;

export const auth = createSlice({

    name : "auth",
    initialState,

    reducers: {

        logOut: () => {

            return initialState;
        },

        logIn: (state, action: PayloadAction<any>) => {

            return {
                value : {
                    token: action.payload.token,
                    usrUid: action.payload.userUid,
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