import React, { useState } from "react";
import "./style/index.css";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../services/axios/axiosinstance.js";
import {useDispatch} from 'react-redux';

export default function Convert() {
  let currencies = ["UAH", "USD", "EUR"];
  let [from, setFrom] = useState("");
  let [to, setTo] = useState("");
  const dispatch = useDispatch();
  const [valueFrom, setValueFrom] = useState("UAH");
  const [valueTo, setValueTo] = useState("UAH");
  const toRate = createAsyncThunk("rates/fetchToRate", async () => {
    const response = await API.get({ valueFrom } + "&symbols=" + { valueTo });
    return response.data.rates;
  });
  const fromRate = createAsyncThunk("rates/fetchFromRate", async () => {
    const response = await API.get({ valueFrom } + "&symbols=" + { valueTo });
    return response.data.rates;
  });
  
  return (
    <div className="exchange">
      <div>
        <input value={from} onChange={()=>{dispatch(setTo(to * fromRate))}}/>
        <select
          value={valueFrom}
          onChange={(e) => {dispatch(setValueFrom(e.target.value))}}>
          {currencies.map((currency, key) => (
            <option value={currency} key={key}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input value={to} onChange={() => {dispatch(setFrom(from * toRate))}} />
        <select
          value={valueTo}
          onChange={(e) => {dispatch(setValueTo(e.target.value))}}>
          {currencies.map((currency, key) => (
            <option value={currency} key={key}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
