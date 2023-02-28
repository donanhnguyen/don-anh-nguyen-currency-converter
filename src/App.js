import './App.css';
import CurrencyRowFrom from './CurrencyRowFrom';
import CurrencyRowTo from './CurrencyRowTo';
import { useState, useEffect } from 'react';

function App() {

 

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [currencySymbols, setCurrencySymbols] = useState();
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [outPut, setOutput] = useState(0)


  const API_KEY = "WNiS9hiaDj828hcgupjd14r0Xees78WR";
  var myHeaders = new Headers();
  myHeaders.append("apikey", API_KEY);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  useEffect(() => {

      // get rate options for dropdowns
    fetch("https://api.apilayer.com/exchangerates_data/latest?&base=USD", requestOptions)
      .then(res => res.json())
      .then(data => {
        const baseCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(baseCurrency)
      })


      // get symbols
    // fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    //   .then(response => response.json())
    //   .then(result => {
    //     setCurrencySymbols(result.symbols)
    //   })
  
  }, [])


  // call the convert function whenever user changes the currency
  useEffect(() => {
    convert();
  }, [fromCurrency, toCurrency])
  
  function changeFromCurrency (e) {
    setFromCurrency(e.target.value)
  }

  function changeToCurrency (e) {
    setToCurrency(e.target.value)
  }

  function handleChangeTheFromAmount (e) {
    setAmount(e.target.value);
  }

  // convert function using API call
  function convert () {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setOutput(data.result);
        })
    }
  }

  // swap the currencies
  function swap () {
    var temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  return (
    <div className="App">
      <header className="App-header">

        <h1>Currency Converter</h1>

        <h1>from</h1>
        <CurrencyRowFrom 
          amount={amount} 
          onChangeCurrency={changeFromCurrency} 
          selectedCurrency={fromCurrency} 
          currencyOptions={currencyOptions} 
          currencySymbols={currencySymbols}
          onChangeAmount={handleChangeTheFromAmount}
          />
          
        <div>=</div>

        <h1>to</h1>
        <CurrencyRowTo 
          onChangeCurrency={changeToCurrency} 
          selectedCurrency={toCurrency} 
          currencyOptions={currencyOptions} 
          currencySymbols={currencySymbols}
          />

      {/* output */}

          <div>
            <button onClick={convert}>Convert</button>
            <h1>{amount} {fromCurrency} = {outPut.toFixed(2)} {toCurrency}</h1>
          </div>

      {/* swap button */}

          <div>
            <button onClick={swap}>Swap</button>
          </div>


      </header>
    </div>
  );
}

export default App;
