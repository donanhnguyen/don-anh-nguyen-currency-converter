import logo from './logo.svg';
import './App.css';
import CurrencyRow from './CurrencyRow';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const BASE_URL = "https://api.exchangeratesapi.io/v1/latest";
  
  const API_KEY = "AQ8q8j3ihr4OWpQ6Bj9CXrF14AaV9SdY";

  var myHeaders = new Headers();
  myHeaders.append("apikey", API_KEY);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  useEffect(() => {

    fetch("https://api.apilayer.com/exchangerates_data/latest?&base=USD", requestOptions)
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
