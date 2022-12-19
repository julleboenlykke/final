import Modal from "react-native-modal";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import Styles from "../../../globalStyles/Styles";
import React from "react";

// Funktion til at skifte password på Profile siden
function CredentialsComponent (props) {

    // Pop-up vindue der dukker op til at skifte password, når brugeren klikker "Change password"
    return <Modal style={{minHeight: props.minHeight, justifyContent: "center"}}
                  isVisible={props.visible}>
        <View style={{
            ...Styles.modalContent,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40%"
        }}>
            {/* Øverst i pop-up vinduet står der "Change credentials" */}
            <Text style={{fontSize: 20}}> Change Credentials </Text>

            {/* Viser brugerens username/email */}
            <TextInput
                value={props.globalUser.username}
                placeholder={props.globalUser.username}
                style={{...Styles.input, ...stylesLocal.modalTextInputLocal}}
                editable={false}
            />

            {/* Tekstfelt til at skrive det gamle password ved opdatering */}
            <TextInput
                value={props.value}
                placeholder={"Old Password"}
                secureTextEntry={true}
                onChangeText={props.onChangeText}
                style={{...Styles.input, ...stylesLocal.modalTextInputLocal}}
            />

            {/* Tekstfelt til at skrive det nye password ved opdatering */}
            <TextInput
                value={props.value1}
                placeholder={"New Password"}
                secureTextEntry={true}
                onChangeText={props.onChangeText1}
                style={{...Styles.input, ...stylesLocal.modalTextInputLocal}}
            />

            {/* Knap til at cancel opdatering af password, hvis nu man fortryder */}
            <View style={stylesLocal.btnContainerLocal}>
                <Pressable
                    title={"Cancel"}
                    style={{...Styles.btnAuth, height: 50, width: "45%"}}
                    onPress={props.onPress}
                >
                    <Text style={{color: "white"}}>Cancel</Text>
                </Pressable>

                {/* Knap til at få password opdateret, når det nye og gamle er indtastet i de respektive felter */}
                <Pressable
                    title={"Update"}
                    style={{...Styles.btnAuth, height: 50, width: "45%"}}
                    onPress={props.onPress1}
                >
                    <Text style={{color: "white"}}>Confirm</Text>
                </Pressable>
            </View>
        </View>
    </Modal>;
}

export default CredentialsComponent;

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
        borderBottomColor: 'black',
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

