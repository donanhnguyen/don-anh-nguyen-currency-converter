import logo from './logo.svg';
import './App.css';
import CurrencyRow from './CurrencyRow';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const BASE_URL = "https://api.exchangeratesapi.io/v1/latest";
  
  const API_KEY = "AQ8q8j3ihr4OWpQ6Bj9CXrF14AaV9SdY";

  function params() {
    return new URLSearchParams({
      access_key: "WNiS9hiaDj828hcgupjd14r0Xees78WR",
      base: "USD",
      
    })
  }

  useEffect(() => {

    // Axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json`)
    //   .then((res) => {
    //     console.log(res);
    //   })

    fetch(`${BASE_URL}?${params()}`)
      .then(res => res.json())
      .then(data => console.log(data))

  }, [])

  return (
    <div className="App">
      <header className="App-header">

        <h1>Currency Converter, by Don Anh Nguyen</h1>

        <CurrencyRow />
        <div>=</div>
        <CurrencyRow />

      </header>
    </div>
  );
}

export default App;
