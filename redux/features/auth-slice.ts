import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {

    value: AuthState;

}

type AuthState = {

    token: string,
    usrUid: string,
    isActivated: boolean,
    isCertified: boolean,
    proUid: string, 
    // plan: string,
}

const initialState = {

    value : {

        token: "",
        usrUid: "",
        isActivated: false,
        isCertified: false,
        proUid: "", 
        // plan: "free",
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
                    usrUid: action.payload.usrUid,
                    isActivated : action.payload.isActivated,
                    isCertified: action.payload.isCertified,
                    proUid: state.value.proUid
                }
            }
        },
        
        activate:(state) => {
            state.value.isActivated = true
        },

        chooseProfil:(state, action: PayloadAction<any>) => {
            state.value.proUid = action.payload.proUid
        },

    }

})

export const { logIn, logOut, activate, chooseProfil } = auth.actions;
export default auth.reducer;