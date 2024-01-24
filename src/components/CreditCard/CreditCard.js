'use client'

import { useState, useEffect, useCallback } from 'react';
import CreditCardInput from 'react-credit-card-input';
import Select from 'react-select';
import countries from '../../utils/countries.json';
import Swal from 'sweetalert2';
import useAppContext from '@/hooks/useAppContext';

const valid = require("card-validator");

const CreditCard = () => {

    const [cardNumber, setCardNumber] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [CVCNumber, setCVCNumber] = useState(null);
    const [country, setCountry] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
    const { blacklist, dispatch } = useAppContext();

    const countriesList = JSON.parse(JSON.stringify(countries));
    const formattedCountries = countriesList.map((country) => ({ label: country.name, value: country.code }));

    const validateNumber = useCallback(() => {
      if (selectedCountry === '') {
        Swal.fire({
          title: 'Please select a country',
          icon: 'info',
          text: 'There is no country selected.',
        });
        return;
      }

      const blacklisted = blacklist.find((item) => item.name === selectedCountry.label);
      const isBlacklisted = blacklisted !== undefined;

      if (isBlacklisted) {
        Swal.fire({
          title: 'Blacklisted Country',
          icon: 'Error',
          text: 'This country is blacklisted.',
        });
        setCardNumber('');
        setCVCNumber('');
        setExpiryDate('');
        return;
      }
 
      const numberValidation = valid.number(cardNumber);
      if (numberValidation.isValid) {
        // save to session storage
        const validCards = sessionStorage.getItem('valid_card_numbers');
        let validCardsArray = [];
        if (validCards) {
          validCardsArray = validCards.split(',');
        }

        const found = validCardsArray.find((card) => card === cardNumber);
        if ( !found ) {
          // number does not exist
          validCardsArray.push(cardNumber);
          const mint = validCardsArray.join();
          sessionStorage.setItem('valid_card_numbers', mint);
          dispatch({type: 'addNewCard'});
          Swal.fire({
            text: 'Valid Card Saved',
            icon: 'success',
            text: 'Card Number captured successfully',
          });
          
        } else {
          Swal.fire({
            text: 'Card Already Saved',
            icon: 'info',
            text: 'Card Number has already been captured.',
          });
        }
        

      } else {
        Swal.fire({
          text: 'Card Not Valid',
          icon: 'error',
          text: 'Card Number is not valid.',
        });
      }
      setCardNumber('');
      setCVCNumber('');
      setExpiryDate('');
      
    }, [blacklist, cardNumber, dispatch, selectedCountry]);

    const handleErrors = (e) => {
      const { error: message, inputName } = e;
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: `${message}`,
      });
    }

    const handleCountryAddition = (e) => {
      setSelectedCountry(e);
      validateNumber();
    }
    
    useEffect(() => {
        if (CVCNumber?.length === 3) {
          validateNumber();
        }
    }, [CVCNumber, validateNumber, selectedCountry])

    useEffect(() => {
      // set session cookie
      if (window) {
        sessionStorage.setItem('valid_card_numbers', '');
      }
    }, [])
  
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
            dangerTextStyle={{display: 'none'}}
          />
          <div className={`bg-[#f2dedd] rounded-md w-[80px] h-[80px]`}></div>
        </div>
        <div className={`absolute w-full max-w-[78.5%] left-0 bottom-[90px] flex items-center pl-[16px]`}>
          <div className={`w-[60px] h-[38px] bg-[#f2dedd] rounded-md mr-auto`}></div>
          <Select 
            options={formattedCountries}
            defaultValue={selectedCountry}
            styles={{
              control: (styles) => ({
                ...styles,
                width: '260px',
              })
            }}
            onChange={handleCountryAddition}
            placeholder="Select a country"
          />
        </div>
      </div>
    )
}

export default CreditCard;