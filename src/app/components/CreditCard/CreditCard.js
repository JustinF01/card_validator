'use client'

import { useState, useEffect } from 'react';
import CreditCardInput from 'react-credit-card-input';

const CreditCard = () => {

    const [cardNumber, setCardNumber] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [CVCNumber, setCVCNumber] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (cardNumber) console.log('cardNumber: ', cardNumber);
        console.log('expiryDate: ', expiryDate);
        console.log('CVCNumber: ', CVCNumber);
        console.log('country: ', country);
    }, [cardNumber, CVCNumber, expiryDate, country])
  
    return (
        <div className={`w-[100%] max-w-[550px] bg-gradient-to-r from-[#ffaa35] to-[#ffc536] rounded-[33px] h-[340px] relative shadow-lg shadow-black/20`}>
        <div className={`absolute left-0 top-14 bg-[#39283b] h-[60px] w-full`}></div>
        <div className={`absolute w-full left-0 top-[170px] flex justify-between px-4`}>
          <CreditCardInput 
            cardNumberInputProps={{
              value: cardNumber,
              onChange: (e) => setCardNumber(e.target.value),
            }}
            cardExpiryInputProps={{
              value: expiryDate,
              onChange: (e) => setExpiryDate(e.target.value),
            }}
            cardCVCInputProps={{
              value: CVCNumber,
              onChange: (e) => setCVCNumber(e.target.value),
            }}
          />
          <div className={`bg-[#f2dedd] rounded-md w-[60px] h-[60px]`}></div>
        </div>
        <div className={`absolute w-full left-0 bottom-[50px] flex`}>
          <div className={`w-[120px] h-[30px] bg-[#f2dedd] rounded-md mx-4`}></div>
          <div className={`w-[120px] h-[30px] bg-[#f2dedd] rounded-md mx-2`}></div>
        </div>
      </div>
    )
}

export default CreditCard;