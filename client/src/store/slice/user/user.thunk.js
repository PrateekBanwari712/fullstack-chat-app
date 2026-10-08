import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utlities/axiosinstance.js";

export const loginUserThunk = createAsyncThunk(
    "users/login",
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/login", {
                username,
                password
            });

            // console.log(response.data)
            toast.success('welcome ' + username);
            return response.data;
        } catch (error) {
            console.error(error)
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }

    });
export const registerUserThunk = createAsyncThunk(
    "users/register",
    async ({ fullName, username, password, gender }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/register", {
                fullName,
                username,
                password,
                gender,
            });
            // console.log(fullName, username, password, gender)
            // console.log(response.data)
            toast.success("account created successfully");
            return response.data;
        } catch (error) {
            console.error(error)
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }

    });
export const logoutUserThunk = createAsyncThunk(
    "users/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/logout", {
            });
            // console.log(response.data)
            toast.success("logout successfully");
            return response.data;
        } catch (error) {
            console.error(error)
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }

    });
export const getUserProfileThunk = createAsyncThunk(
    "users/getprofile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/getprofile", {
            });
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error)
            const errorOutput = error?.response?.data?.errMessage;
            // toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }

    });
export const getOtherUserThunk = createAsyncThunk(
    "users/getOtherUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/getOtherUsers", {
            });
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error)
            const errorOutput = error?.response?.data?.errMessage;
            // toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }

    });

