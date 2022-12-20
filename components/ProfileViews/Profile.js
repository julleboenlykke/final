import {View, Text, StyleSheet, Alert, useWindowDimensions, ActivityIndicator, ScrollView} from "react-native";
import Styles from "../../globalStyles/Styles";
import {AppContext} from "../AppContext";
import React, {useContext, useState} from "react";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import firebase from "firebase/compat";
import ModalProfile from "./ProfileView/ModalProfile";
import CredentialsComponent from "./ProfileView/Credentials";
import DetailsComponent from "./ProfileView/DetailsProfile";
import Buttons from "./ProfileView/Buttons";

// Funktion til Profile siden
function ProfileScreen() {
    // Alle variable der indgår på siden
    const height = useWindowDimensions().height
    const [isVisibleModalProfile, setProfileModalVisibility] = useState(false)
    const [isVisibleModalCredentials, setCredentialsModalVisibility] = useState(false)
    const [globalUser, setGlobalUser] = useContext(AppContext)
    const [password, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newFirstname, setNewFirstname] = useState("")
    const [newLastname, setNewLastname] = useState("");
    const [newInterests, setNewInterets] = useState("")
    const [year, setNewYear] = useState(null)
    const [day, setNewDay] = useState(null)
    const [month, setNewMonth] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false)

    // Bruges til at håndtere bekræftelsen af den dato der er valgt i fødselsdagstabellen
    const handleConfirm = (date) => {
        setNewDay(date.getDate())
        setNewMonth((date.getMonth())+1)
        setNewYear(date.getFullYear())
        setShowDatePicker(false)
    };

    // Herfra opdateres globalUser objektet
    const updateGlobalUser = () => {
        setGlobalUser({
            id: globalUser.id,
            birtDate: day ? day: globalUser.birtDate,
            birthMonth: month ? month: globalUser.birthMonth,
            birthYear: year ? year: globalUser.birthYear,
            firstname: newFirstname ? newFirstname : globalUser.firstname,
            lastname: newLastname ? newLastname : globalUser.lastname,
            username: globalUser.username,
            interests: newInterests ? newInterests : globalUser.interests,
            countries:globalUser.countries.length > 0 ? globalUser.countries : []
        })
    }

    // Bruges når brugeren har opdateret dens info, ved at nulstille input felterne
    // Nulstiller værdierne for nedenstående variable; nogen sættes til null og resten til en tom string
    const cleanFields = () => {
        setNewPassword("")
        setNewFirstname("")
        setNewLastname("")
        setNewInterets("")
        setNewDay(null)
        setNewMonth(null)
        setNewYear(null)
        setOldPassword("")
    }

    // Opdaterer password for en bruger ved først at verificere det gamle password med reauthenticateWithCredential
    // Herefter kaldes updatePassword metoden, som opdaterer til det nye password, der er angivet i password variablen
    // Hvis det lykkedes gives besked om det, hvis ikke, gives en error message
    const updateCredentials = () => {
        try {
            const user = firebase.auth().currentUser
            const credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                oldPassword
            );
            user.reauthenticateWithCredential(credential).then((val)  => {
                val.user.updatePassword(password).then((r)=>
                    setCredentialsModalVisibility(false))
                Alert.alert("success")
            })

        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

    }

    // Bruges til at opdatere brugerens info i firebase databasen ved at lave et userDetails object
    // userDetails indeholder den opdaterede bruger info
    // Værdierne i userDetails objektet er baseret på værdierne i dee tilsvarende variabler, hvis de har en sand værdi
    // Ellers bruges de tilsvarende værddier fra globalUser objektet
    const updateUser = () => {
        const userDetails = {
            birtDate: day ? day: globalUser.birtDate,
            birthMonth: month ? month: globalUser.birthMonth,
            birthYear: year ? year: globalUser.birthYear,
            firstname: newFirstname ? newFirstname : globalUser.firstname,
            lastname: newLastname ? newLastname : globalUser.lastname,
            interests: newInterests ? newInterests : globalUser.interests,
            username: globalUser.username,
            countries:globalUser.countries.length > 0 ? globalUser.countries : []
        }
        try {
            firebase
                .database()
                .ref(`/users/${globalUser.id}`)
                .update(userDetails);
            updateGlobalUser()
            setProfileModalVisibility(false)
            Alert.alert("Update was succesfull ")
            cleanFields()

        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    // Bruges til at logge en bruger
    // Først nulstilles globalUser til dets oprindelige tilstand med setGlobalUser funktionen
    // Så kaldes signOut metoden fra firebase til at logge brugeren ud
    const handleLogOut = async () => {
        setGlobalUser({ id: null, birtDate: null, birthMonth: null, birthYear: null, firstname: null, lastname: null, username: null, interests: null,countries: []});
        await firebase.auth().signOut()
    };

    // Tjekker om username egenskabet for globalUser er true
    if (globalUser.username != null) {
        // Hvis true, så return nedenstående
        return (
            <ScrollView style={{...Styles.scroll}}>
                {/* Overskrift på siden */}
                <View style={{...Styles.container}}>
                    <Text style={{...Styles.title, marginBottom: 0, marginTop: 100}}>Profile Page!</Text>
                    <View style={{margin: 10}}>
                        {/* Profilbillede ikon */}
                        <View style={Styles.circle}><MaterialIcons
                            name="face"
                            size={50} color='#4E3D42'/></View>
                    </View>
                    {/* Håndterer log ud funktionen */}
                    <DetailsComponent globalUser={globalUser}/>
                    <Buttons onPress={() => setProfileModalVisibility(true)}
                             onPress1={() => setCredentialsModalVisibility(true)}
                             onPress2={() => handleLogOut()}/>

                    {/* Pop-up vindue til at opatere brugerens password */}
                    <ModalProfile minHeight={height}
                                  visible={isVisibleModalProfile}
                                  value={newFirstname}
                                  globalUser={globalUser}
                                  onChangeText={(firstname) => setNewFirstname(firstname)}
                                  value1={newLastname}
                                  onChangeText1={(lastname) => setNewLastname(lastname)}
                                  value2={newInterests}
                                  onChangeText2={(interests) => setNewInterets(interests)}
                                  prop7={() => setShowDatePicker(true)}
                                  day={day}
                                  month={month}
                                  year={year}
                                  visible1={showDatePicker}
                                  onConfirm={handleConfirm}
                                  onCancel={() => setShowDatePicker(false)}
                                  onPress={() => setProfileModalVisibility(false)}
                                  onPress1={() => updateUser()}/>


                    {/* Pop-up vindue til opdatere bruger info */}
                    <CredentialsComponent minHeight={height}
                                          visible={isVisibleModalCredentials}
                                          globalUser={globalUser}
                                          value={oldPassword}
                                          onChangeText={(oldPassword) => setOldPassword(oldPassword)}
                                          value1={password}
                                          onChangeText1={(newPass) => setNewPassword(newPass)}
                                          onPress={() => setCredentialsModalVisibility(false)}
                                          onPress1={() => updateCredentials()}/>


                </View>
            </ScrollView>
        );
    } else return <View style={Styles.container} ><ActivityIndicator size="large" color="#E3DBDB" /><Text>Loading...</Text></View>
}

export default ProfileScreen

//Styling
const stylesLocal = StyleSheet.create({
    btnLocalDateTime: {
        width: 200,
        justifyContent: 'flex-start',
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:1,
        alignSelf: 'center',
        padding: 10,
        paddingLeft: 0,
        paddingBottom: 2
    },
    modalTextInputLocal: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#E3DBDB',
        height: 40
    },
    btnContainerLocal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '30%',
    }
})
