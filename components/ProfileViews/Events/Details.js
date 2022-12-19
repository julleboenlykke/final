import {View, Text, Platform, StyleSheet, Button, Alert, ScrollView, Image, TouchableOpacity,} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import React, { Component } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";

// Funktion der benyttes til at ændre status af event
const Details = ({route,navigation, props}) => {
    const [event,setEvent] = useState({});
    const [value, setValue] = useState("Tilmeld event");

    // Funktion der kører, i det øjeblik siden bliver indlæst
    useEffect(() => {
        setEvent(route.params.event[1]);

        return () => {
            setEvent({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditCar skærmen og sender bilen videre med
        const event = route.params.event
        navigation.navigate('Edit Event', { event });
    };

    // Tilmelding af event
    const tilmeld = () => {

        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Du er tilmeldt event' );
            setValue("Du er tilmeldt event");
        }
    };

    // Afmeld tilmelding af event
    const afmeld = () => {

        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Du er afmeldt event' );
            setValue("Du er afmeldt event");
        }
    };


    // Spørger brugeren om de er sikker på, at de vil slette et event
    const confirmDelete = () => {

        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the event?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };


    // Sletter et event
    const  handleDelete = () => {
        const id = route.params.event[0];
        try {
            firebase
                .database()
                // Bruger eventets id til at slette det
                .ref(`/Event/${id}`)
                .remove();
            // Går tilbage når eventet er slettet
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!event) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={{backgroundColor: "#E3DBDB", paddingBottom: "15%"}}>
            {/* Knap til at gå tilbage */}
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Ionicons name="arrow-back" style={{top: 20, fontSize:45, margin: 10, color:'#4E3D42'}} />
            </TouchableOpacity>
            <Text style={styles.title}>Details</Text>
            <ScrollView style={styles.root}>
                {/* Billedet der ses på alle events */}
                <View style={styles.container}>
                    <Image style={styles.event} source={require("../../../assets/event.jpg")}/>
                    {
                        Object.entries(event).map((item,index)=>{
                            return(
                                <View style={styles.row} key={index}>
                                    {/* Event titler */}
                                    <Text style={styles.label}>{item[0]} </Text>
                                    {/* Værdiernes navne */}
                                    <Text style={styles.value}>{item[1]}</Text>
                                </View>
                            )
                        })
                    }
                    {/* Knapper med der giver mulighed for at slette et event mm */}
                    <Text onPress={value} style={{fontSize: 25, paddingTop: 5}}> Status: {value} </Text>
                    <Button title="Edit" onPress={ () => handleEdit()} />
                    <Button title="Delete" onPress={() => confirmDelete()} />
                    <Button title="Tilmeld event" onPress={() => tilmeld()} />
                    <Button title="Afmeld event" onPress={() => afmeld()} />
                </View>
            </ScrollView>
        </View>
    );
}

export default Details;

//Styling
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingBottom: 500,
        paddingTop: 150,
    },
    row: {
        flexDirection: 'row',
        height: "9%",
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100,
        height: "300%",
    },
    value: {
        width: 180,
        height: "300%",
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
    root: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#E3DBDB",
    },
    event: {
        height: 200,
        width: '100%',
        resizeMode: "stretch",
    },
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#4E3D42',
        paddingTop: 5,
    }
});