import { createSlice } from '@reduxjs/toolkit'
import { getMessageThunk, sendMessageThunk } from './message.thunk.js';

const initialState = {
    messages: [],
    buttonLoading: false,
    screenLoading: false,

}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setNewMessage: (state, action) => {
            //naye aadmi se chat karne par error ayega is ka fix
            const oldMessages = state.messages ?? [];

            //message push kar rahe hai 
            state.messages = [...oldMessages, action.payload];
        },
    },
    extraReducers: (builder) => {
        // send message
        builder.addCase(sendMessageThunk.pending, (state, action) => {
            state.buttonLoading = true;
        });
        builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
            // state.buttonLoading = false;
            const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload?.responseData];
      state.buttonLoading = false;
        });
        builder.addCase(sendMessageThunk.rejected, (state, action) => {
            // console.log("rejected");
        });
    
        //get message
        builder.addCase(getMessageThunk.pending, (state, action) => {
            state.screenLoading = true;
        });
        builder.addCase(getMessageThunk.fulfilled, (state, action) => {
          state.messages = action.payload?.responseData?.messages;
      state.buttonLoading = false;
        });
        builder.addCase(getMessageThunk.rejected, (state, action) => {
            // console.log("rejected");
        });

    },
})

// Action creators are generated for each case reducer function
export const {setNewMessage} = messageSlice.actions;

export default messageSlice.reducer;

