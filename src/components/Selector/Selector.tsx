import { useState } from "react";
import styles from "./Selector.module.css";

interface SelectorProps {
  value: string;
  onChange: (currency: string) => void;
  currencies: { [key: string]: { name: string; symbol: string } };
}

const Selector: React.FC<SelectorProps> = ({ value, onChange, currencies }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (currency: string) => {
    onChange(currency);
    setIsOpen(false);
  };

  const getCurrencyName = (code: string) => {
    return currencies[code]?.name || code;
  };

  return (
    <div className={styles.selector}>
      <div className={styles.selectedOption} onClick={() => setIsOpen(!isOpen)}>
        <span>{getCurrencyName(value)}</span>
        <svg
          className={styles.arrow}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className={styles.options}>
          {Object.entries(currencies).map(([code, data]) => {
            return (
              <div
                key={code}
                className={`${styles.option} ${
                  code === value ? styles.selected : ""
                }`}
                onClick={() => handleSelect(code)}
              >
                {data?.name} ({data?.symbol})
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selector;
