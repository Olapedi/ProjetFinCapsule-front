import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {

    value: AuthState;

}

type AuthState = {

    token: string,
    usrUid: string,
    proUid: string, 
    isActivated: boolean,
    isCertified: boolean,
    displayName: string,
    proPicture: string,
    email: string,
}

const initialState = {

    value : {

        token: "",
        usrUid: "",
        isActivated: false,
        isCertified: false,
        proUid: "",
        displayName: "",
        proPicture: "",
        email: "",
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
                    proUid: action.payload.proUid,
                    displayName: action.payload.displayName,
                    proPicture: action.payload.proPicture,
                    email: action.payload.email,
                }
            }
        },
        
        activate:(state) => {
            state.value.isActivated = true
        },

        chooseProfil:(state, action: PayloadAction<any>) => {
            state.value.proUid = action.payload.proUid
            state.value.displayName = action.payload.displayName
        },

    }

})

export const { logIn, logOut, activate, chooseProfil } = auth.actions;
export default auth.reducer;