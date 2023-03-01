import React from 'react'

export default function CurrencyRowTo (props) {

  const {currencyOptions, currencySymbols, selectedCurrency, onChangeCurrency,} = props;


   
  return (
    <div>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
              {currencyOptions.map((option, index) => {
                return <option key={option + index} value={option}>{option} {`${currencySymbols[option]}`}</option>
              })}
            </select>
    </div>
  )
}
