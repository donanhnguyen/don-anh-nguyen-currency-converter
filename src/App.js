import './App.css';
import CurrencyRow from './CurrencyRow';
import { useState, useEffect } from 'react';

function App() {

 

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [currencySymbols, setCurrencySymbols] = useState();
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountIsFromCurrency, setAmountIsFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountIsFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    fromAmount = amount / exchangeRate;
    toAmount = amount;
  }

  const API_KEY = "WNiS9hiaDj828hcgupjd14r0Xees78WR";
  var myHeaders = new Headers();
  myHeaders.append("apikey", API_KEY);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  useEffect(() => {

      // get rates
    fetch("https://api.apilayer.com/exchangerates_data/latest?&base=USD", requestOptions)
      .then(res => res.json())
      .then(data => {
        const baseCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(baseCurrency)
        setExchangeRate(data.rates[baseCurrency])
      })


      // get symbols
    fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
      .then(response => response.json())
      .then(result => {
        setCurrencySymbols(result.symbols)
      })
  
  }, [])
  
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
    }
  }, [fromCurrency, toCurrency])

  function changeFromCurrency (e) {
    setFromCurrency(e.target.value)
  }

  function changeToCurrency (e) {
    setToCurrency(e.target.value)
  }

  function handleChangeTheFromAmount (e) {
    setAmount(e.target.value);
    setAmountIsFromCurrency(true);
  }

  function handleChangeTheToAmount (e) {
    setAmount(e.target.value);
    setAmountIsFromCurrency(false);
  }


  return (
    <div className="App">
      <header className="App-header">

        <h1>Currency Converter, by Don Anh Nguyen</h1>

        <h1>from</h1>
        <CurrencyRow 
          amount={fromAmount} 
          onChangeCurrency={changeFromCurrency} 
          selectedCurrency={fromCurrency} 
          currencyOptions={currencyOptions} 
          currencySymbols={currencySymbols}
          onChangeAmount={handleChangeTheFromAmount}
          />
          

        <div>=</div>

        <h1>to</h1>
        <CurrencyRow 
          amount={toAmount} 
          onChangeCurrency={changeToCurrency} 
          selectedCurrency={toCurrency} 
          currencyOptions={currencyOptions} 
          currencySymbols={currencySymbols}
          onChangeAmount={handleChangeTheToAmount}
          />


      </header>
    </div>
  );
}

export default App;
