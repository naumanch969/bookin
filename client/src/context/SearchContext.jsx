import { createContext, useReducer, useState } from "react"

const INITIAL_STATE = {
    city: null,
    dates: [],
    options: {
        adult: null,
        children: null,
        room: null
    }
}

export const SearchContext = createContext(INITIAL_STATE)


const SearchReducer = (state, action) => {
    switch (action.type) {
        case 'NEW_SEARCH':
            return action.payload
            break;
        case 'RESET_SEARCH':
            return INITIAL_STATE
            break;

        default:
            return state
            break;
    }
}

export const SearchContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

    return (
        <SearchContext.Provider
            value={{
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}