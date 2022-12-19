import {Text, View, TextInput, TouchableOpacity, useWindowDimensions, Alert} from "react-native";
import Styles from "../../globalStyles/Styles";
import {useContext, useState} from "react";
import firebase from "firebase/compat";
import {AppContext} from "../AppContext";


// Login funktion
function Login({navigation}) {

    // Holder på data for den bruger der logger ind (f.eks. username)
    const [globalUser, setGlobalUser] = useContext(AppContext)

    // Sørger for at indholdet på login siden tilpasses den pågældende skærm
    // Herved ser det ens ud uanset hvor stor ens mobil skærm er
    const height = useWindowDimensions().height

    // Variablerne username og password bruges til at logge ind med
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Styring af navigationen mellem de forskellige sider
    const navController = (navigation, route) =>{
        navigation.navigate(route)
    }

    // Brugeren forsøger at logge ind med username (email) og password, og firebase tjekker, om brugerens data findes
    // Firebase tjekker dette ved at lave et kald til realtime database
    // Hvis brugeren bliver fundet i databasen, så hentes brugerens resterende oplysninger også (fødselsdag, fornavn og efternavn)
    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(username, password);
            firebase
                .database()
                .ref('/users')
                .on('value', snapshot => {
                    if (snapshot.val()) {
                        const userAndKeys = Object.entries(snapshot.val())
                        const user = userAndKeys.find(item => (item[1].username).toUpperCase() === username.toUpperCase())
                        setGlobalUser({
                            id: user[0],
                            birtDate: user[1].birtDate,
                            birthMonth: user[1].birthMonth,
                            birthYear: user[1].birthYear,
                            firstname: user[1].firstname,
                            lastname: user[1].lastname,
                            username: user[1].username,
                            countries: Object.keys(user[1]).includes('countries') ? user[1].countries : []
                        })
                    }

                });
        } catch (error) {
            // Kan firebase ikke finde brugeren i databasen, så gives der en error message
            Alert.alert(`Error: ${error.message}`);
        }
    }

    // Login sidens design/layout
    return (
        // Styling af overskriften på login siden
        <View style={{...Styles.authContainer, minHeight: height}}>
            <Text style={Styles.header}> Welcome to WeSocial</Text>
            <Text>{'\n'}</Text>
            {/* Skaber inputfelt til at indtaste username */}
            <View style={Styles.subContainer} >
                <TextInput
                    value={username}
                    onChangeText={(username) => setUsername( username)}
                    placeholder={'Email'}
                    style={Styles.input}
                />
                {/* Skaber inputfelt til at taste password */}
                <TextInput
                    value={password}
                    onChangeText={(password) => setPassword( password )}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={Styles.input}
                />
                <Text>{'\n'}</Text>
                {/* Knap til at sign in */}
                <TouchableOpacity
                    title={'Login'}
                    style={Styles.btnAuth}
                    onPress={() => handleSubmit()}
                >
                    <Text style={{color: 'white'}}>Sign In</Text>
                </TouchableOpacity>
                {/* Tekst */}
                <Text style={{marginTop: '5%', fontSize:'15'}}>Not a User?</Text>

                {/* Sign up knap der navigerer til en side, hvor nye brugere kan oprette sig */}
                <TouchableOpacity
                    title={'Sign up here'}
                    style={{...Styles.btnAuth, backgroundColor: 'white', borderWidth: 0.1, borderColor: '#4E3D42'}}
                    onPress={() => navController(navigation, 'SignUp') }
                >
                    <Text>Sign Up here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default Login
