import React, { useState, useEffect } from "react";
import styles from "./Exchange.module.css";
import Selector from "../Selector/Selector";
import SwapButton from "../SwapButton/SwapButton";

interface Exchange {
  defaultAmount?: number;
  defaultFromCurrency?: string;
  defaultToCurrency?: string;
}

const CurrencyConverter: React.FC<Exchange> = ({
  defaultAmount = 1.0,
  defaultFromCurrency = "USD",
  defaultToCurrency = "EUR",
}) => {
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [fromCurrency, setFromCurrency] = useState<string>(defaultFromCurrency);
  const [toCurrency, setToCurrency] = useState<string>(defaultToCurrency);
  const [exchangeRate, setExchangeRate] = useState<number>(1.0627478);
  const [currencies, setCurrencies] = useState<{
    [key: string]: { name: string; symbol: string };
  }>({});
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch("https://api.vatcomply.com/currencies");
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.vatcomply.com/rates?base=${fromCurrency}`
        );
        const data = await response.json();

        if (data && data.rates && data.rates[toCurrency]) {
          setExchangeRate(data.rates[toCurrency]);
          setDate(data.date);
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Currency exchange</h1>
      </div>
      <div className={styles.subHeader}>
        <h2>
          {amount} {fromCurrency} to {toCurrency} - Convert{" "}
          {fromCurrency === "EUR" ? "Euros" : fromCurrency} to{" "}
          {toCurrency === "USD" ? "US Dollars" : toCurrency}
        </h2>
      </div>
      <div className={styles.converterCard}>
        <div className={styles.converterContainer}>
          <div className={styles.converterForm}>
            <div className={styles.formGroup}>
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className={styles.input}
                placeholder="Enter amount"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="fromCurrency">From</label>
              <Selector
                value={fromCurrency}
                onChange={setFromCurrency}
                currencies={currencies}
              />
            </div>

            <SwapButton onClick={handleSwapCurrencies} />

            <div className={styles.formGroup}>
              <label htmlFor="toCurrency">To</label>
              <Selector
                value={toCurrency}
                onChange={setToCurrency}
                currencies={currencies}
              />
            </div>
          </div>

          <div className={styles.resultSection}>
            <div className={styles.conversionResult}>
              <div className={styles.conversionRate}>
                {amount} {fromCurrency} = {(amount * exchangeRate).toFixed(7)}{" "}
                {toCurrency}
              </div>
              <div className={styles.conversionInverse}>
                1 {fromCurrency} = {exchangeRate.toFixed(7)} {toCurrency}
              </div>
            </div>

            <div className={styles.infoBox}>
              <p>
                We use the mid-market rate for our Converter. This is for
                informational purposes only. You won&apos;t receive this rate
                when sending money.
              </p>
            </div>

            {date && (
              <p className={styles.updateInfo}>
                {fromCurrency} to {toCurrency} conversion — Last updated {date},
                19:17 UTC
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
