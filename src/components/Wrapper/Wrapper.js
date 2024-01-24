'use client'

import { useReducer } from "react";
import { AppContext } from "@/context/appContext";

const initialState = {
    blacklist: [
        { name: 'South Africa' },
        { name: 'Portugal' },
        { name: 'United States of America' }
    ],
    newCardAdded: '',
  };

const reducer = (state, action) => {
    switch(action.type) {
      case 'editList':
        return {...state, blacklist: action.payload}
      case 'addNewCard':
        return { ...state, newCardAdded: action.payload }
      default:
        return state;
    }
  }

const StateWrapper = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{...state, dispatch}} >
            { children }
        </AppContext.Provider>
    )
}

export default StateWrapper;