import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [amountDue, setAmountDue] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [activeInput, setActiveInput] = useState('amountDue');
  const [change, setChange] = useState(null);
  const [twenties, setTwenties] = useState(0);
  const [tens, setTens] = useState(0);
  const [fives, setFives] = useState(0);
  const [ones, setOnes] = useState(0);
  const [quarters, setQuarters] = useState(0);
  const [dimes, setDimes] = useState(0);
  const [nickels, setNickels] = useState(0);
  const [pennies, setPennies] = useState(0);
  const receivedInputRef = useRef(null);
  const dueInputRef = useRef(null);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState([]);

function handleNumberClick(number) {
  if (activeInput === 'amountDue') {
    const newAmount = amountDue + number;
    if (isValidMoney(newAmount)) {
      setAmountDue(newAmount);
    
      if (/\.\d{2}$/.test(newAmount)) {
        setActiveInput('amountReceived');
        receivedInputRef.current.focus();
      }
    }  
  } else {
    const newAmount = amountReceived + number;
    if (isValidMoney(newAmount)) {
      setAmountReceived(newAmount);
    }
  }
}
function handleClear() {
    setAmountDue('');
    setAmountReceived('');
    setChange(null);
    setError('');
    setTwenties(0);
    setTens(0);
    setFives(0);
    setOnes(0);
    setPennies(0);
    setNickels(0);
    setDimes(0);
    setQuarters(0);
    setActiveInput('amountDue');
    dueInputRef.current.focus();
}
function handleDecimal() {
  if (activeInput === 'amountDue') {
    if (!amountDue.includes('.')) {
      setAmountDue(amountDue + '.');
    }
  } else {
    if (!amountReceived.includes('.')) {
      setAmountReceived(amountReceived + '.');
    }
  }
}
function handleCalculate() {
  if (amountDue.trim() === '' || amountReceived.trim() === '') {
    setError('Please enter both amounts before calculating.');
    return;
  }

  setError('');

  const dueInCents = Math.round(Number(amountDue) * 100);
  const receivedInCents = Math.round(Number(amountReceived) * 100);

  const changeInCents = receivedInCents - dueInCents;

  setChange(changeInCents / 100);
  const newTransaction = {
    due: dueInCents / 100,
    received: receivedInCents / 100,
    change: changeInCents / 100
  };

  setTransactions((previousTransactions) => [
    ...previousTransactions,
    newTransaction
    ].slice(-10));

  const numberOfTwenties = Math.floor(Math.max(0, changeInCents) / 2000);
  setTwenties(numberOfTwenties);
  const remainingAfterTwenties = Math.max(0, changeInCents) % 2000;

  const numberOfTens = Math.floor(remainingAfterTwenties / 1000);
  setTens(numberOfTens);
  const remainingAfterTens = remainingAfterTwenties % 1000;

  const numberOfFives = Math.floor(remainingAfterTens / 500);
  setFives(numberOfFives);
  const remainingAfterFives = remainingAfterTens % 500;

  const numberOfOnes = Math.floor(remainingAfterFives / 100);
  setOnes(numberOfOnes);
  const remainingAfterOnes = remainingAfterFives % 100;

  const numberOfQuarters = Math.floor(remainingAfterOnes / 25);
  setQuarters(numberOfQuarters);
  const remainingAfterQuarters = remainingAfterOnes % 25;

  const numberOfDimes = Math.floor(remainingAfterQuarters / 10);
  setDimes(numberOfDimes);
  const remainingAfterDimes = remainingAfterQuarters % 10;

  const numberOfNickels = Math.floor(remainingAfterDimes / 5);
  setNickels(numberOfNickels);
  const remainingAfterNickels = remainingAfterDimes % 5;

  const numberOfPennies = Math.floor(remainingAfterNickels / 1);
  setPennies(numberOfPennies);
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    handleCalculate();
  }
}

function isValidMoney(value) {
  return /^\d*\.?\d{0,2}$/.test(value);
}

function handleDueChange(event) {
  const newAmount = event.target.value;
  if (isValidMoney(newAmount)) {
  setAmountDue(newAmount);

    if (/\.\d{2}$/.test(newAmount)) {
      setActiveInput('amountReceived');
      receivedInputRef.current.focus();
    }
  }
}
  return (
    <>
      <h1>Change Calculator</h1>
      <div className="register">
        <div className="register-top">
          <div className="register-controls">
        <div className="digital-display">
        <div>
          <label htmlFor="amountDue">How much is due?</label>
          <div className="money-input">
            <span>$</span>
            <input
             id="amountDue"
             type="text"
             inputMode="decimal"
             data-testid="amountDue"
             value={amountDue}
             onChange={handleDueChange}
             onKeyDown={handleKeyDown}
             onFocus={() => setActiveInput('amountDue')}
             ref={dueInputRef}
            />
          </div>
        </div>

        <div>
        <label htmlFor="amountReceived">How much was received?</label>
        <div className="money-input">
          <span>$</span>
          <input
            id="amountReceived"
            type="text"
            inputMode="decimal"
            data-testid="amountReceived"
            value={amountReceived}
            onChange={(event) => {const newAmount = event.target.value;
              if (isValidMoney(newAmount)) {
                setAmountReceived(newAmount);
              }
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setActiveInput('amountReceived')}
            ref={receivedInputRef}
          />
          </div>
        </div>
        </div> {/* Closes digital-display */}
        
        <div className="number-pad">
          <button type="button" onClick={() => handleNumberClick('7')}>7</button>
          <button type="button" onClick={() => handleNumberClick('8')}>8</button>
          <button type="button" onClick={() => handleNumberClick('9')}>9</button>
          <button type="button" onClick={() => handleNumberClick('0')}>0</button>
          <button type="button" onClick={handleDecimal}>.</button>

          <button type="button" onClick={() => handleNumberClick('4')}>4</button>
          <button type="button" onClick={() => handleNumberClick('5')}>5</button>
          <button type="button" onClick={() => handleNumberClick('6')}>6</button>
          <button
            className="clear-button"
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
           >
            CLEAR
          </button>

          <button type="button" onClick={() => handleNumberClick('1')}>1</button>
          <button type="button" onClick={() => handleNumberClick('2')}>2</button>
          <button type="button" onClick={() => handleNumberClick('3')}>3</button>
          <button
            className="calculate-button"
            type="button"
            data-testid="calculate"
            onClick={handleCalculate}
          >
            CALCULATE
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        </div> {/* Closes register-controls */}
        <div className="register-receipt">
          <div className={`change-receipt ${change < 0 ? 'money-owed' : ''}`}>
          <h2>
            {change < 0 ? 'Additional Money Owed' : 'Total Change Due'}
         </h2>

         <p>
           {change === null ? '$0.00' : `$${Math.abs(change).toFixed(2)}`}
         </p>

         {change !== null && (
           <span className="receipt-description">
             {change < 0
               ? `Additional money owed is $${Math.abs(change).toFixed(2)}`
               : `The total change due is $${change.toFixed(2)}`}
           </span>
              )}
              <div className="transaction-history">
             <h3>Transaction History</h3>

               {transactions.length === 0 ? (
                <p className="empty-history">No transactions yet</p>
                ) : (
                transactions.map((transaction, index) => (
              <div className="transaction" key={index}>
              <h4>Transaction #{index + 1}</h4>

               <p>Amount Due: ${transaction.due.toFixed(2)}</p>
               <p>Amount Received: ${transaction.received.toFixed(2)}</p>
  
                <p>
                 {transaction.change < 0 ? 'Still Owed:' : 'Change:'}
                 {' $'}
                 {Math.abs(transaction.change).toFixed(2)}
                </p>
              </div>
                ))
               )}
             </div>
             </div> {/* Closes change-receipt */}
           </div> {/* Closes register-receipt */}
           </div> {/* Closes register-top */}
       
        <div className="cash-drawer">
         <h2>Cash Drawer</h2>
           <div className="drawer-grid">
           <div className="denomination">
         <h3>Twenties</h3>
          <p data-testid="twenties">{twenties}</p>
        </div>

        <div className="denomination">
         <h3>Tens</h3>
          <p data-testid="tens">{tens}</p>
        </div>

        <div className="denomination">
         <h3>Fives</h3>
          <p data-testid="fives">{fives}</p>
        </div>

        <div className="denomination">
         <h3>Ones</h3>
          <p data-testid="ones">{ones}</p>
        </div>

        <div className="denomination">
         <h3>Quarters</h3>
          <p data-testid="quarters">{quarters}</p>
        </div>

        <div className="denomination">
         <h3>Dimes</h3>
          <p data-testid="dimes">{dimes}</p>
        </div>

        <div className="denomination">
         <h3>Nickels</h3>
          <p data-testid="nickels">{nickels}</p>
        </div>

        <div className="denomination">
         <h3>Pennies</h3>
          <p data-testid="pennies">{pennies}</p>
        </div> {/* Closes Pennies denomination */}
      </div> {/* Closes drawer-grid */}
    </div> {/* Closes cash-drawer */}
  </div> {/* Closes register */}
</>
  );
}

export default App;

