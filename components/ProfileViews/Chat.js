import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList} from "react-native"
import * as React from "react";

// Chat funktion som pt. kun viser en overskrift på siden
function Chat ({}) {
    return (
        <ScrollView style={styles.root}>
            <View style={{paddingBottom: 30}}>
                <Text style={styles.title}>
                    Chat
                </Text>
                <Text>Dette har ikke været muligt at etabelere i denne omgang, men billederne viser ideen og tankerne bag funktionen{'\n'}{'\n'}</Text>
                <Image style={styles.event} source={require("../../assets/Chat1.png")}/>
                <Text>{'\n'}</Text>
                <Image style={styles.event} source={require("../../assets/Chat2.png")}/>
            </View>
        </ScrollView>
    )
}

// Styling
const styles = StyleSheet.create({
    root: {
        paddingLeft: 10,
        paddingRight:10,
        backgroundColor: "#E3DBDB",
    },
    text: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 12,
    },
    event: {
        height: 600,
        width: 350,
        resizeMode: "stretch",
    },
    title:{
        fontSize: 70,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#4E3D42',
        paddingTop: 55,
        paddingBottom: 30
    }
});

export default Chat