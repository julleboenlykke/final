import {Text, TextInput, useWindowDimensions, View, Pressable, KeyboardAvoidingView, Platform, StyleSheet, ScrollView} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Styles from "../../globalStyles/Styles";
import {useContext, useState} from "react";
import firebase from "firebase/compat";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {formatDayOrMonth} from "../helperFunctions";
import {AppContext} from "../AppContext";

// Sign up funktion
function SignUp({navigation}) {
// Holder på data for den bruger der logger ind (f.eks. username)
    const [globalUser, setGlobalUser] = useContext(AppContext)

    // Sørger for at indholdet på login siden tilpasses den pågældende skærm
    // Herved ser det ens ud uanset hvor stor ens mobil skærm er
    const height = useWindowDimensions().height

    // Variablerne der bruges til at oprette sig
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [interests, setInterests] = useState("");
    const [password, setPassword] = useState("");

    // Tabel til at vælge fødselsdag
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // Styring af navigationen mellem de forskellige sider
    const navController = (navigation, route) =>{
        navigation.navigate(route)
    }

    // Fremvisning af tabellen til at vælge fødselsdag
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // Skjuler tabellen til at vælge fødselsdag
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // Returnerer variablerne til at sign up
    const createUser = () => {
        return {birtDate: day, birthMonth: month, birthYear: year, firstname: firstname, lastname: lastname, username: email, interests: interests }
    }


    // Sætter start dato i fødselsdagstabellen til i dag
    const handleConfirm = (date) => {
        setDay(date.getDate())
        setMonth((date.getMonth())+1)
        setYear(date.getFullYear())
        hideDatePicker();
    };

    // Bruger forsøger at oprette sig ved at firebase opbevarer dataen i dens database
    // Brugeroprettelsen eksekveres ved at indtaste fornavn, efternavn, fødselsdag, email og et password
    const handleSubmit = async() => {
        const user = createUser()
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            firebase
                .database()
                .ref('/users/')
                .push(user).then(r => {
                setGlobalUser({
                    id: r.getKey(),
                    birtDate: day,
                    birthMonth: month,
                    birthYear: year,
                    firstname: firstname,
                    lastname: lastname,
                    username: email,
                    interests: interests,
                })
            })

        } catch (error) {
            // Kan firebase ikke oprette brugeren i databasen, så gives der en error message
            console.log(`Error: ${error.message}`);
        }
    }

    // Sign up sidens design/layout
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView style={Styles.scroll}>
            {/* Styling af overskriften på login siden*/}
        <View style={{...Styles.authContainer, minHeight: height, borderWidth: 1, textAlign: 'center' }}>
            <Text style={Styles.header}> Welcome to WeSocial</Text>
            {/* Skaber inputfelt til at indtaste fornavn */}
            <View style={Styles.subContainer}>
                <TextInput
                    value={firstname}
                    onChangeText={(firstname) => setFirstname( firstname )}
                    placeholder={'Firstname'}
                    style={Styles.inputV2}
                />
                {/* Skaber inputfelt til at indtaste efternavn */}
                <TextInput
                    value={lastname}
                    onChangeText={(lastname) => setLastname( lastname )}
                    placeholder={'Lastname'}
                    style={Styles.inputV2}
                />
                {/* Skaber tabel til at vælge fødselsdag */}
                <Pressable style={Styles.btnCalender} title="Pick Birthdate" onPress={showDatePicker}>
                    <AntDesign name="calendar" size={24} color="#4E3D42" />
                    <Text style={{fontSize: 17, marginLeft: 2}} >Date Of Birth</Text>
                </Pressable>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <Text style={{alignSelf: 'stretch', marginBottom: 20, borderBottomWidth: 1}} > {day === "" || month === "" || year === "" ? "Date not chosen" : formatDayOrMonth(day)  +"-" + formatDayOrMonth(month) + "-" + year }</Text>
                {/*Skaber inputfelt til at indtaste interesser*/}
                <TextInput
                    value={interests}
                    onChangeText={(interests) => setInterests( interests )}
                    placeholder={'Interests'}
                    style={Styles.inputV2}
                />
                {/* Skaber inputfelt til at indtaste email */}
                <TextInput
                    value={email}
                    onChangeText={(username) => setEmail( username )}
                    placeholder={'E-Mail'}
                    style={Styles.inputV2}
                />
                {/* Skaber inputfelt til at indtaste password */}
                <TextInput
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    placeholder={'Create password'}
                    secureTextEntry={true}
                    style={Styles.inputV2}
                />
                {/* Knap til at sign up */}
                <Pressable
                    title={'Sign Up'}
                    style={Styles.btnAuth}
                    onPress={() => handleSubmit()}
                >
                    <Text style={{color: 'white'}} >Sign Up</Text>
                </Pressable>

                {/* Back to login knap der navigerer brugeren tilbage til login siden */}
                <Pressable
                    title={'Back to Login'}
                    style={{...Styles.btnAuth, backgroundColor: 'white', borderWidth: 0.1, borderColor: '#4E3D42', marginTop: '4%'}}
                    onPress={() => navController(navigation, 'Login') }
                >
                    <Text>Back To Login</Text>
                </Pressable>
            </View>
        </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export default SignUp

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#E3DBDB'
    },
});