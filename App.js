import {AuthStack, AppTab} from "./components/navigators/Navigators";
import {NavigationContainer} from "@react-navigation/native";
import firebase from "firebase/compat";
import React, { useEffect, useState} from "react";
import {StateProvider} from "./components/AppContext";

// Her er Appens Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYyGvmmFWDHyL0DnWuXhC1_Gx25EXv41M",
  authDomain: "eksamen-c7a2c.firebaseapp.com",
  databaseURL: "https://eksamen-c7a2c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eksamen-c7a2c",
  storageBucket: "eksamen-c7a2c.appspot.com",
  messagingSenderId: "580927712033",
  appId: "1:580927712033:web:dfc9e66a62f7fdcd9c2c60"
};




export default function App() {
  //Her oprettes bruger state variblen
  //const {globalUser, setGlobalUser } = useContext(AppContext);
  const [user, setUser] = useState({ loggedIn: false });

  // Her bliver Firebase initialiseret
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Monitorerer om brugeren er logget ind eller ej
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true, user: user});
      } else {
        callback({loggedIn: false});
      }
    });
  }

  // Aktiverer onAuthStateChange, som er en listener, for at monitorere om brugeren er online eller ej
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  // Her er den side brugeren bliver mødt med, når de åbner appen,
  // De kan logge ind på Login siden eller navigere til Sign up siden og oprette sig
  const ValidateUser = () => {
    return (
        <NavigationContainer>
          <AuthStack/>
        </NavigationContainer>
    );
  }
  const Home = () => {
    return (
        <NavigationContainer><AppTab/></NavigationContainer>
    );
  }
  return (user.loggedIn ? <StateProvider><Home/></StateProvider> :<StateProvider><ValidateUser/></StateProvider>) ;

}
