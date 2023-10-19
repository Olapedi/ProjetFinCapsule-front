import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
 value: {
   email: string | null;
   name : string | null;

 };
};

const initialState: UserState = {
 value: { 
    email: null,
    name : null
},
};

export const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
   updateEmail: (state: UserState, action: PayloadAction<string>) => {
     state.value.email = action.payload;
   },
 },
});

export const { updateEmail } = userSlice.actions;
export default userSlice.reducer;