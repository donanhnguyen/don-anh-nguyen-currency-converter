import React from 'react'

export default function CurrencyRowFrom (props) {

  const {currencyOptions, currencySymbols, selectedCurrency, onChangeCurrency, amount, onChangeAmount} = props;


   
  return (
    <div>
        <input type='number' value={amount} onChange={onChangeAmount}></input>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
              {currencyOptions.map((option, index) => {
                return <option key={option + index} value={option}>{option}</option>
              })}
            </select>
    </div>
  )
}
