import React, { useState, useRef, useEffect } from 'react';
import './style.css';

// Reference : https://ui.shadcn.com/docs/components/input-otp

export const OTP_DIGIT_COUNT = 6;

export default function App() {
  const [inputValuesArr, setInputValuesArr] = useState(
    new Array(OTP_DIGIT_COUNT).fill('')
  );
  const refArray = useRef([]);

  useEffect(() => {
    // focus on 1st input on load
    refArray.current?.[0].focus();
  }, []);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) return;

    //trim else space will be considered as value and focus will shift to next input box
    const newValue = value.trim();

    const newArray = [...inputValuesArr];
    newArray[index] = newValue.slice(-1);
    setInputValuesArr(newArray);

    // Shift focus on next input box only if value is entered(non null/definite number)
    newValue && refArray?.current?.[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    // With only e?.key === 'Backspace' => It will shift focus to previous index and then clear that previous index instead of current one.

    // So,focus on Previous input only if there is no value/current input is clear

    if (!e.target.value && e?.key === 'Backspace') {
      refArray?.current?.[index - 1]?.focus();
    }
  };

  return (
    <div className="otp-input-container">
      <h1>Input OTP</h1>
      {inputValuesArr?.map((ele, index) => {
        return (
          <input
            key={index}
            className="otp-input"
            type="text"
            value={inputValuesArr[index]}
            ref={(input) => (refArray.current[index] = input)}
            onChange={(e) => handleOnChange(e?.target?.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
