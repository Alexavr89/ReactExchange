import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from "../services/axios/axiosinstance.js";

const eurUah = createAsyncThunk(
    "rates/Euruah", async () => {
        const response = await API.get("EUR&symbols=UAH");
        return response.data.rates;
    }
)

const usdUah = createAsyncThunk(
    "rates/Usduah", async () => {
        const response = await API.get("USD&symbols=UAH");
        return response.data.rates;
    }
)

export const slice = createSlice({
    name:'rate',
    initialState:{
        eur:{
            data:null,
            isLoading:false
        },
        usd:{
            data:null,
            isLoading:false
        }
    },
    reducers:{
        EurUah: eurUah,
        UsdUah: usdUah,
    },
    extraReducers:(builder) => {
        builder
        .addCase(eurUah.pending, (state)=>{
            state.eur.isLoading = true;
        })
        .addCase(eurUah.fulfilled, (state, action)=>{
            state.eur.isLoading = false;
            state.eur.data = action.payload;
        })
        builder
        .addCase(usdUah.pending, (state)=>{
            state.usd.isLoading = true;
        })
        .addCase(usdUah.fulfilled, (state, action)=>{
            state.usd.isLoading = false;
            state.usd.data = action.payload;
        });
    }
})

export const {EurUah, UsdUah} = slice.actions
export default slice.reducer