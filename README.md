# WeSocial

## Beskrivelse
WeSocial er en social-begivenhed-app hvor hvor man kan møde nye mennesker med samme interesser som en selv. 
Man kan deltagere på allerede eksisterende begivenheder, indenfor den kategori man helt vil, 
eller selv oprette en begivenhed med den interesse der interesser en mest. 
Så tøv ikke med at dykke ned i WeSocial universet, det vil kun give en flere bekendtskaber som har samme interesser som en selv.

Appen er stadig under udvikling og er tidlig i processen og flere funktioner er derfor stadig ikke fuldt udviklet. 
Appen gør brug af Firebase Realtime Database og Authentication 

## Dependencies
```
{
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "^13.0.0",
    "@firebase/app-compat": "^0.2.0",
    "@react-navigation/bottom-tabs": "^6.5.2",
    "@react-navigation/native": "^6.1.1",
    "@react-navigation/native-stack": "^6.9.7",
    "@react-navigation/stack": "^6.3.10",
    "expo": "~47.0.8",
    "expo-status-bar": "~1.4.2",
    "firebase": "^9.15.0",
    "react": "18.1.0",
    "react-native": "0.70.5",
    "react-native-dropdown-select-list": "^2.0.4",
    "react-native-material-dropdown": "^0.11.1",
    "react-native-modal": "^13.0.1",
    "react-native-modal-datetime-picker": "^14.0.0",
    "react-native-vector-icons": "^9.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9"
  },
  "private": true
}
```

## Hvordan køres appen
For at teste appen:
1. Download koden fra GitHub
2. Åben appen i ... og sikrer dig at du er i den rigtige mappe i terminalen
3. Kør npm install
4. Kør npm start 

Appen er kun udviklet til vises som app på en telefon, derfor virker det ikke er køre den i web-view

## Kilder
Til udvikling af appen, har vi draget inspiration fra opgaverne i øvelsestimerne og templaten. 
Templaten er en udvidelse af de opgaver vi har fået stillet i timerne, hvor funktionerne er blevet sammensat. 

Vi har også brugt kode fra vores egne godkendelsesopgaver.

## Short Video Demo:
https://youtu.be/9H3_mPNsP80

## Billeder er appen
<img src='/assets/AppPictures/Login.PNG' width='400'height='790'>
<img src='/assets/AppPictures/SignUp.PNG' width='400' height='790'>
<img src='/assets/AppPictures/HomeScreen.PNG' width='400' height='790'>
<img src='/assets/AppPictures/Events.PNG' width='400' height='790'>  
<img src='/assets/AppPictures/Create.PNG' width='400' height='790'>
<img src='/assets/AppPictures/Details1.PNG' width='400' height='790'>
<img src='/assets/AppPictures/Details2.PNG' width='400' height='790'>
<img src='/assets/AppPictures/Chat.PNG' width='400' height='790'>
<img src='/assets/AppPictures/Profile.PNG' width='400' height='790'>

## App Struktur

1. App.js
    - components
        - authentication
            - Login.js
            - Signup.js
        - navigators
            - Navigators.js
        - ProfileViews
            - Events
              - Create.js
              - Details.js
              - Events.js
            - ProfileView
              - Buttons.js
              - Credentials.js
              - DetailsProfile.js
              - ModalProfile.js
            - Chat.js
            - HomeScreen.js
            - Profile.js
        - AppContext.js
        - helperFunctions.js
    - globalStyles
        - Styles.js
