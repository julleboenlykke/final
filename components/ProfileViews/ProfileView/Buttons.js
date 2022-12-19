import {Pressable, Text} from "react-native";
import Styles from "../../../globalStyles/Styles";
import React from "react";

// De tre knapper der vises i bunden af Profile siden
function Buttons (props) {
    return <>
        {/* Til at opdatere ens info */}
        <Pressable
            title={"Change profile"}
            style={Styles.btnAuth}
            onPress={props.onPress}
        >
            <Text style={{color: "white"}}>Change info</Text>
        </Pressable>

        {/* Til at opdatere ens password */}
        <Pressable
            title={"Change Password"}
            style={{...Styles.btnAuth, marginTop: 5}}
            onPress={props.onPress1}
        >
            <Text style={{color: "white"}}>Change Password</Text>
        </Pressable>

        {/* Til at logge ud */}
        <Pressable
            title={"Log out"}
            style={{...Styles.btnAuth, marginTop: 5}}
            onPress={props.onPress2}
        >
            <Text style={{color: "white"}}>Log out</Text>
        </Pressable>
    </>;
}
export default Buttons