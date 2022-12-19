import React,  { useState, createContext } from 'react';

// Laver et nyt context object
const AppContext = createContext();

// useState definerer variablen globalUser og funktionen setGlobalUser
// globalUser initialiseres som et objekt med nedenstående properties, som enten er sat til null eller et tomt array
const StateProvider = (props) => {
    const [globalUser, setGlobalUser] = useState({ id: null, birtDate: null, birthMonth: null, birthYear: null, firstname: null, lastname: null, username: null, countries: []});
    return (
        <AppContext.Provider value={[globalUser, setGlobalUser]}>{props.children}</AppContext.Provider>
    )
}
export {AppContext, StateProvider}

