'use client'

import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import useAppContext from "@/hooks/useAppContext";
import Swal from 'sweetalert2'

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
    console.log('name of item to delete: ', name);
    const update = blacklist.filter((item) => item.name !== name);
    dispatch({type: 'editList', payload: update});
  }

  const handleAdd = (e) => {
    if (e.key === 'Enter') {
      const update = [...blacklist];
      if (update.find((item) => item.name === e.target.value)) {
        // name is already there
        Swal.fire({
          title: 'Name already exists!',
          text: `already exist in blacklist`,
          icon: 'error',
          confirmButtonText: 'OK'
        });

      } else {
        const added = [...update, { name: e.target.value }];
        dispatch({type: 'editList', payload: added});
      }
      setNewCountry('');
    }
    
  }


  return (
    <div className={`w-full h-full p-[1.6rem] bg-white/60 rounded-[33px] border-[2px] border-white shadow-lg shadow-black/20 overflow-scroll`}>
      <div className={'flex flex-col items-center justify-center'}>
        <h1 className={`text-[3rem]`}>Blacklisted Countries</h1>
        <div className="w-full max-w-[600px] mx-auto p-4 flex flex-col items-center justify-center">
          <input type="text" value={ newCountry } onChange={(e) => setNewCountry(e.target.value)} onKeyDown={(e) => handleAdd(e)} className="w-full h-[50px] rounded-md my-2 p-2 border-[1px] border-black" placeholder="Enter country and press enter" />
          <ul className={'w-full text-center'}>
            { listItems }
          </ul>
        </div>
      </div>
    </div>
  );
}
