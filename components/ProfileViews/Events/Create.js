import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, ScrollView, SafeAreaView, Platform, KeyboardAvoidingView, TouchableOpacity, Pressable} from 'react-native';
import firebase from 'firebase/compat';
import {useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Styles from "../../../globalStyles/Styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';
import {formatDayOrMonth} from "../../helperFunctions";

// Funktion der benyttes til at create et event i Appen
// Når et event skal creates, skal der indtastes navn, lokation, tidspunkt, dato, kategori, antal deltagere og beskrivelse
const Create = ({navigation,route}) => {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [time, setTime] = useState("");
    const [eventName, setEventName] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [participants, setParticipants] = useState("");
    const [description, setDescription] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//Navigation controller
    const navController = (navigation, route) =>{
        navigation.navigate(route)
    }

    // Fremvisning af tabellen til at vælge dato
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // Skjuler fremvisning af tabellen til at vælge dato
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // Returnerer variablerne til at oprette et event
    const createEvent = () => {
        return {day: 'Day', month: 'Month', year: 'Year', eventName: 'Name of event', location: 'Location', participants: 'Participants', description: 'Description', time: 'Time'}
    }


    // Sætter start dato i datotabellen til i dag
    const handleConfirm = (date) => {
        setDay(date.getDate())
        setMonth((date.getMonth())+1)
        setYear(date.getFullYear())
        hideDatePicker();
    };

    //Brugeren forsøger at create et event ved at firebase opbevarer events data
    //Oprettelsen eksekveres ved at indtaste navn, tidspunkt, dato, lokation, deltagere, beskrivelse og kategori
    const handleEvent = async() => {
        const event = createEvent()
        try {
            firebase
                .database()
                .ref('/Event/')
                .push( {
                    Name: eventName,
                    Day: day,
                    Month: month,
                    Year: year,
                    Location: location,
                    Participants: participants,
                    Description: description,
                    Category: category,
                    Time: time,
                })
            Alert.alert(`Saved`);
        } catch (error) {
            //kan firebase ikke oprette eventet så gives der en fejlbesked
            console.log(`Error: ${error.message}`);
        }
    }

    //Create sidens design/layout
    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {/* Knap til at gå tilbage */}
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Ionicons name="arrow-back" style={{top: 20, fontSize:45, margin: 10, color:'#4E3D42'}} />
            </TouchableOpacity>
            <ScrollView style={Styles.scroll}>
                <View>
                    <Text style={styles.title}>Create</Text>
                    <SafeAreaView style={styles.container1}>
                        <ScrollView style={{...Styles.scroll, paddingLeft: 90}}>
                            {/*Skaber indputfelt til at indtaste events navn*/}
                            <TextInput
                                value={eventName}
                                onChangeText={(eventName) => setEventName( eventName )}
                                placeholder={'Name of Event'}
                                style={Styles.inputV2}
                            />
                            {/*Skaber indputfelt til at indtaste lokation*/}
                            <TextInput
                                value={location}
                                onChangeText={(location) => setLocation( location )}
                                placeholder={'Location'}
                                style={Styles.inputV2}
                            />
                            {/*Knap til datotabellen*/}
                            <Pressable style={Styles.btnCalender} title="Pick date" onPress={showDatePicker}>
                                <AntDesign name="calendar" size={24} color="#4E3D42" />
                                <Text style={{fontSize: 17, marginLeft: 2}} >Date Of event</Text>
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                            {/*Skaber indputfelt til at indtaste tidspunkt*/}
                            <Text style={{alignSelf: 'stretch', marginBottom: 20, borderBottomWidth: 1}} > {day === "" || month === "" || year === "" ? "Date not chosen" : formatDayOrMonth(day)  +"-" + formatDayOrMonth(month) + "-" + year }</Text>
                            <TextInput
                                value={time}
                                onChangeText={(time) => setTime( time )}
                                placeholder={'Time'}
                                style={Styles.inputV2}
                            />
                            {/*Skaber indputfelt til at indtaste antal deltagere*/}
                            <TextInput
                                value={participants}
                                onChangeText={(participants) => setParticipants(participants)}
                                placeholder={'Number of participants'}
                                style={Styles.inputV2}
                            />
                            {/*Skaber indputfelt til at indtaste en beskrivelse af eventet*/}
                            <TextInput
                                value={description}
                                onChangeText={(description) => setDescription(description)}
                                placeholder={'Description'}
                                style={Styles.inputV2}
                            />
                            {/*Skaber indputfelt til at indtaste kategori*/}
                            <TextInput
                                value={category}
                                onChangeText={(category) => setCategory( category )}
                                placeholder={'Category'}
                                style={Styles.inputV2}
                            />
                            {/*Knap til at oprette eventet*/}
                            <Pressable
                                title={'Create'}
                                style={Styles.btnAuth}
                                onPress={() => handleEvent()}
                            >
                                <Text style={{color: 'white'}} >Create Event</Text>
                            </Pressable>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default Create;

//Styling
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#E3DBDB'
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E3DBDB'
    },
    row: {
        flexDirection: 'row',
        height: 35,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 110,
        height: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
    title:{
        fontSize: 70,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#4E3D42',
        paddingTop: 10,
        paddingBottom: 30
    }
});