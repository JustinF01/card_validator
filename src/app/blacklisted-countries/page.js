'use client'

import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import useAppContext from "@/hooks/useAppContext";
import Swal from 'sweetalert2';

export default function Page() {

  const { blacklist, dispatch } = useAppContext();
  const [newCountry, setNewCountry] = useState('');

  const listItems = blacklist.map((item, index) => {
    return (
      <li key={ Math.random() + index } className={'w-full p-5 border-[1px] border-black rounded-md m-1 flex items-center justify-between'}>
        <p>{ item.name }</p>
        <button value={item.name} onClick={() => handleDelete(item.name)}><span className="text-[maroon]"><FiTrash2 /></span></button>
      </li>
    )
  })

  const handleDelete = (name) => {
    const update = blacklist.filter((item) => item.name !== name);
    dispatch({type: 'editList', payload: update});
  }

  const handleAdd = (e) => {
    
    if (e.key === 'Enter') {
      e.preventDefault();
      const update = [...blacklist];
      const found = update.find((item) => item.name.toLowerCase() === e.target.value.toLowerCase());
      if (found) {
        // name is already there
        Swal.fire({
          title: 'Country is blacklisted',
          icon: 'info',
          text: 'This country is already added.'
        });

      } else {
        const added = [...update, { name: e.target.value }];
        dispatch({type: 'editList', payload: added});
        
      }
      setNewCountry('');
    }
    
  }


  return (
    <div className={`w-full h-full p-[1.6rem] bg-white/60 rounded-[33px] border-[2px] border-white shadow-lg shadow-black/20`}>
      <div className={'flex flex-col items-center justify-center'}>
        <h1 className={`text-[3rem]`}>Blacklisted Countries</h1>
        <div className="w-full max-w-[600px] h-full mx-auto p-4 flex flex-col items-center justify-center overflow-auto">
          <input type="text" value={ newCountry } onChange={(e) => setNewCountry(e.target.value)} onKeyDown={(e) => handleAdd(e)} className="w-full h-[50px] rounded-md my-2 p-2 border-[1px] border-black" placeholder="Enter country name and press enter" />
          
            { blacklist.length > 0 ? (
              <ul className={'w-full text-center'}>
                {listItems}
              </ul>
            ) : <p>There are no blacklisted countries.</p>}
          
        </div>
      </div>
    </div>
  );
}
