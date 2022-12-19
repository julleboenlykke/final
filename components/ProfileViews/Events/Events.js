import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Image} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

// Navigere til Events siden
const navController = (navigation, route) => {
    navigation.navigate(route)
}

const Events = ({navigation}) => {
    // Finder events der er gemt i firebase
    const [events,setEvents] = useState()

    useEffect(() => {
        if(!events) {
            firebase
                .database()
                .ref('/Event')
                .on('value', snapshot => {
                    setEvents(snapshot.val())
                });
        }
    },[]);

    // Hvis der er ingen events, vises der en tom side
    if (!events) {
        return(
            <ScrollView style={{backgroundColor: '#E3DBDB'}}>
                <SafeAreaView style={styles.container}>
                    <View>
                        {/* Titel på Events siden */}
                        <Text style={styles.title}>Events</Text>
                        {/* Create knap der ligner et plus */}
                        {/* Trykkes der på den, navigeres brugeren til en side hvor de kan oprette events */}
                        <TouchableOpacity onPress={() => navController(navigation, "Create")} >
                            <Ionicons name="add-circle-outline" style={{left: 300, top: 2, fontSize:45}} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }

    // Funktion til når man vil se detaljer om et specifikt event
    const handleSelectEvent = id => {
        // Trykker på et event og der søges efter det event med det matchende id
        const event = Object.entries(events).find( event => event[0] === id /*id*/)
        navigation.navigate('Event Details', { event });
    };

    // Tager værdierne fra event objects og bruger dem som array til vores flatlist
    const eventArray = Object.values(events);
    const eventKeys = Object.keys(events);

    return (
        <View style={{backgroundColor: '#E3DBDB', paddingBottom: 110}}>
            {/* Titel på Events siden */}
            <Text style={styles.title}>Events</Text>
            {/* Create knap der ligner et plus */}
            <TouchableOpacity onPress={() => navController(navigation, "Create")} >
                <Ionicons name="add-circle-outline" style={{left: 300, top: -5, fontSize:45, color:'#4E3D42'}} />
            </TouchableOpacity>
        <ScrollView style={{backgroundColor: '#E3DBDB'}}>
            <SafeAreaView style={styles.container}>
                <View>
                    <FlatList
                        data={eventArray}
                        // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
                        keyExtractor={(item, index) => eventKeys[index]}
                        renderItem={({ item, index }) => {
                            return(
                                <TouchableOpacity style={styles.label} onPress={() => handleSelectEvent(eventKeys[index])}>
                                    <Image style={styles.event} source={require("../../../assets/event.jpg")}/>
                                    <Text style={{fontWeight: "bold", fontSize: 20}}>{item.Name}</Text>
                                    <Text> {item.Location}, {item.Day}/{item.Month}/{item.Year}, {item.Time}</Text>
                                    <Text style={{textAlign: "right"}}>Se mere</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
        </View>
    );
}

export default Events;

//Styling
const styles = StyleSheet.create({
    container: {
        margin: 20,
        justifyContent:'center',
        backgroundColor: '#E3DBDB',
    },
    label: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 10,
        paddingVertical: "30%",
        paddingHorizontal: "5%",
        justifyContent:'center',

    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'left',
        color: '#4E3D42',
        marginTop: 55,
        marginLeft: 30,
        marginBottom: -45,
    },
    event: {
        height: '300%',
        width: '99%',
        resizeMode: "stretch",
    },
});