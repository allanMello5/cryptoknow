import ExchangeRate from "./ExchangeRate";
import { useState } from "react";
import axios  from "axios";

const CurrencyConverter = () => {
  const currencies =['BTC','ETH','USDC', 'XRP','LTC', 'ADA']
  const[chosenPrimaryCurrency , setChosenPrimaryCurrency]=useState('BTC')
  const[chosenSecondaryCurrency , setChosenSecondaryCurrency]=useState('BTC')
  const[amount, setamount ]=useState(0)
  
  
  const[exchangedData , setExchangedData]= useState({
    primaryCurrency :'BTC',
    secondaryCurrency:'BTC',
    exchangeRate: 0
  })


 const[result, setResult]=useState(0)
 console.log(chosenPrimaryCurrency)
//API ENDPOINT
  const convert = ()=>{

 const options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
  headers: {
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
  }
};

axios.request(options).then((response)=> {
	console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
 // setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
  setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']*amount);
  
  //setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
 // setSecondaryCurrencyExchanged(chosenSecondaryCurrency)
  setExchangedData({
    primaryCurrency :chosenPrimaryCurrency,
    secondaryCurrency:chosenSecondaryCurrency,
    exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
  })

}).catch((error)=> {
	console.error(error);
 
}); 
console.log(exchangedData)
  }
 
 
    return (
      <div className="currency-converter">
       <h2>Currency  Converter</h2>
       <div className="table"> 
        <table  className="input-box">
         <tbody>
          <tr>
            <td>Primary Currency</td>
            <td>
              <input 
             
              type='number' 
              name="currency-amount-1"
              value={amount}
              onChange={(e)=>setamount(e.target.value)}
              />
            </td>
            <td>
              <select value={chosenPrimaryCurrency}
              name="currency-option-1"
              className="currency-options"
              onChange={(e)=>setChosenPrimaryCurrency(e.target.value)}
              >
                {currencies.map((currency , _index )=>(<option key={_index}>{currency}</option>))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Secondary Currency</td>
            <td>
              <input 
              type='number' 
              name="currency-amount-2"
              value={result}
              // input just show the result so is disable
              disabled={true}
              />
            </td>
            <td>
              <select 
              value={chosenSecondaryCurrency}
              name="currency-option-2"
              className="currency-options-2"
              onChange={(e)=>setChosenSecondaryCurrency(e.target.value)}
              >
              
               {currencies.map((currency , _index )=>(<option key={_index}>{currency}</option>))}
              </select>
            </td>
          </tr>
          <button id="convert-button" onClick={convert}>Convert</button>
        </tbody>
        </table>
       </div>
     
        <ExchangeRate 
        exchangedData = {exchangedData} 
   
        /> 
      </div>
    );
  }
  
  export default CurrencyConverter;