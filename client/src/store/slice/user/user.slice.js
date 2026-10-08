import { createSlice } from '@reduxjs/toolkit'
import { getOtherUserThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk } from './user.thunk.js';

const initialState = {
    isAuthenticated: false,
    screenLoading: true,
    userProfile: null,
    otherUsers: null,
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
    buttonLoading: false,
    
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedUser : (state, action) =>{
            localStorage.setItem("selectedUser", JSON.stringify(action.payload))
            state.selectedUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Register user
        builder.addCase(registerUserThunk.pending, (state, action) => {
            state.buttonLoading = true;
        });
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {
            state.buttonLoading = false;
            state.userProfile = action.payload?.responseData?.user;
            state.isAuthenticated = true;
        });
        builder.addCase(registerUserThunk.rejected, (state, action) => {
            console.log("rejected");
        });

        // Login user
        builder.addCase(loginUserThunk.pending, (state, action) => {
            // console.log("pending");
            state.buttonLoading = true;
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            // console.log("fulfilled");
            state.buttonLoading = false;
            state.userProfile = action.payload?.responseData?.user;
            state.isAuthenticated = true;
        });
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            console.log("rejected");
        });

        // Logout user
        builder.addCase(logoutUserThunk.pending, (state, action) => {
            state.screenLoading = true;
        });
        builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.screenLoading = false;
            state.userProfile = null;
            state.selectedUser = null;
            state.buttonLoading = null;
            localStorage.clear();
        });
        builder.addCase(logoutUserThunk.rejected, (state, action) => {
            state.screenLoading = false;
        });

        // Get user profile
        builder.addCase(getUserProfileThunk.pending, (state, action) => {
            
        });
        builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
            state.userProfile = null;
            state.isAuthenticated = true;
            state.screenLoading = false
            state.userProfile = action.payload?.responseData;
        });
        builder.addCase(getUserProfileThunk.rejected, (state, action) => {
            state.screenLoading = false
        });

        // Get other Users
        builder.addCase(getOtherUserThunk.pending, (state, action) => {
            
        });
        builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
            state.screenLoading = false
            state.otherUsers = action?.payload?.responseData;
            // console.log(action.payload);
        });
        builder.addCase(getOtherUserThunk.rejected, (state, action) => {
            state.screenLoading = false
        });
    },
})

// Action creators are generated for each case reducer function
export const {  setSelectedUser } = userSlice.actions;

export default userSlice.reducer;