'use client'

import { useState, useEffect } from 'react';
import CreditCardInput from 'react-credit-card-input';
import Select from 'react-select';
import countries from '../../utils/countries.json';

const CreditCard = () => {

    const [cardNumber, setCardNumber] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [CVCNumber, setCVCNumber] = useState(null);
    const [country, setCountry] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');

    const countriesList = JSON.parse(JSON.stringify(countries));
    const formattedCountries = countriesList.map((country) => ({ label: country.name, value: country.code }));

    const handleErrors = (e) => {
      if (e) {
        const { error: message, inputName } = e;
      } else {
        console.log('now store in session');
      }

    }

    useEffect(() => {
      console.log('selectedCountry: ', selectedCountry.label);
    }, [selectedCountry])
    
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
            onError={(error) => handleErrors(error)}
          />
          <div className={`bg-[#f2dedd] rounded-md w-[80px] h-[80px]`}></div>
        </div>
        <div className={`absolute w-full max-w-[79%] left-0 bottom-[65px] flex items-center pl-[16px]`}>
          <div className={`w-[60px] h-[38px] bg-[#f2dedd] rounded-md mr-auto`}></div>
          <Select 
            options={formattedCountries}
            styles={{
              control: (styles) => ({
                ...styles,
                width: '260px',
              })
            }}
            onChange={setSelectedCountry}
          />
        </div>
      </div>
    )
}

export default CreditCard;