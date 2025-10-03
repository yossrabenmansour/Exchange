import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [amount, setAmount] = useState(1)
  const [convertFrom, setConvertFrom] = useState("EUR")
  const [convertTo, setConvertTo] = useState("USD")
  const [result, setResult] = useState("")
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const convert = async () => {
      setloading(true)
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`)

      const data = await res.json()

      setResult(data.rates[convertTo])
      setloading(false)
    }

    if (convertFrom === convertTo) {
      return setResult(amount)
    }

    convert();
  }
    , [amount, convertFrom, convertTo]
  );
  return (
    <div className="App">
      <input type="text"
        value={amount}
        disabled={loading}
        onChange={(e) => setAmount(e.target.value)} />
      <select value={convertFrom} onChange={(e) => setConvertFrom(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={convertTo} onChange={(e) => setConvertTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{result} {convertTo} </p>
    </div>
  );
}
