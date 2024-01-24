
'use client'

import { useState, useEffect } from 'react';
import CreditCard from '../components/CreditCard/CreditCard';
import useAppContext from '@/hooks/useAppContext';

export default function Home() {

  const { newCardAdded } = useAppContext();
  const [validList, setValidList] = useState([]);

  useEffect(() => {
    if (window) {
      const cardString = sessionStorage.getItem('valid_card_numbers');
      const cardsArray = cardString.split(',');
      setValidList(cardsArray);
    }
  }, [newCardAdded])


  const listItems = validList.map((item) => {
    return (
      <li key={item}>{ item }</li>
    )
  })

  return (
    <div className='flex flex-row-reverse items-center justify-center w-full h-full'>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="h-[300px] w-[90%]">
          <h3 className="text-[24px] my-2 p-2 border-black border-b-[1px]">Validated Cards list</h3>
          <ol className="list-decimal pl-8">
            {listItems}
          </ol>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <CreditCard />
      </div>
    </div>
  );
}
