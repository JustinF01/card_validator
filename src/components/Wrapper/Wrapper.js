'use client'

import { useReducer } from "react";
import { AppContext } from "@/context/appContext";

const initialState = {
    blacklist: [
        { name: 'South Africa' },
        { name: 'Afganistan' },
    ],
  };

const reducer = (state, action) => {
    switch(action.type) {
      case 'editList':
        return {...state, blacklist: action.payload}
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