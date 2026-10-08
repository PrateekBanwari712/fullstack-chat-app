import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utlities/axiosinstance.js";

export const sendMessageThunk = createAsyncThunk(
    "messages/send",
    async ({ recieverId, message }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/message/send/${recieverId}`, {
                message
            });

            return response.data;
        } catch (error) {
            console.error(error)
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    });

export const getMessageThunk = createAsyncThunk(
    "messages/getmessages",
    async ({ recieverId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/message/getmessages/${recieverId}`);

            return response.data;
        } catch (error) {
            console.error(error)
            const errorOutput = error?.response?.data?.errMessage;
            // toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    });

