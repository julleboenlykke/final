import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList,} from "react-native"
import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useEffect, useState} from "react";
import firebase from "firebase/compat";


// Styling af HomeScreen
const HomeScreen = ({navigation}) => {

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

    // Vi viser ingenting hvis der ikke er data
    if (!events) {
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>Recommended</Text>
                </View>
            </SafeAreaView>
        )
    }

    const handleSelectEvent = id => {
        /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
        const event = Object.entries(events).find( event => event[0] === id /*id*/)
        navigation.navigate('Event Details', { event });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
    const eventArray = Object.values(events);
    const eventKeys = Object.keys(events);

    return (
        <ScrollView style={{backgroundColor: '#E3DBDB'}}>
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>Recommended</Text>
                    <FlatList horizontal
                              data={eventArray}
                        // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
                              keyExtractor={(item, index) => eventKeys[index]}
                              renderItem={({ item, index }) => {
                                  return(
                                      <TouchableOpacity style={styles.label} onPress={() => handleSelectEvent(eventKeys[index])}>
                                          <Image style={styles.event} source={require("../../assets/event.jpg")}/>
                                          <Text style={{fontWeight: "bold", fontSize: 20}}>{item.Name}</Text>
                                          <Text> {item.Location}, {item.Time}</Text>
                                          <Text style={{textAlign: "right"}}>Se mere</Text>
                                      </TouchableOpacity>
                                  )
                              }}
                    />
                    <Text style={styles.title}>Popular Events</Text>
                    <FlatList horizontal
                              data={eventArray}
                        // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
                              keyExtractor={(item, index) => eventKeys[index]}
                              renderItem={({ item, index }) => {
                                  return(
                                      <TouchableOpacity style={styles.label} onPress={() => handleSelectEvent(eventKeys[index])}>
                                          <Image style={styles.event} source={require("../../assets/event.jpg")}/>
                                          <Text style={{fontWeight: "bold", fontSize: 20}}>{item.Name}</Text>
                                          <Text> {item.Location}, {item.Time}</Text>
                                          <Text style={{textAlign: "right"}}>Se mere</Text>
                                      </TouchableOpacity>
                                  )
                              }}
                    />
                    <Text style={styles.title}>Near you</Text>
                    <FlatList horizontal
                              data={eventArray}
                        // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
                              keyExtractor={(item, index) => eventKeys[index]}
                              renderItem={({ item, index }) => {
                                  return(
                                      <TouchableOpacity style={styles.label} onPress={() => handleSelectEvent(eventKeys[index])}>
                                          <Image style={styles.event} source={require("../../assets/event.jpg")}/>
                                          <Text style={{fontWeight: "bold", fontSize: 20}}>{item.Name}</Text>
                                          <Text> {item.Location}, {item.Time}</Text>
                                          <Text style={{textAlign: "right"}}>Se mere</Text>
                                      </TouchableOpacity>
                                  )
                              }}
                    />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const Tab = createBottomTabNavigator();
export default HomeScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        padding: 5,
        justifyContent:'center',
        backgroundColor: '#E3DBDB',
        marginLeft: 10
    },
    label: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 5,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'left',
        color: '#4E3D42',
        paddingTop: 25,
        paddingBottom: 30,
        margin: 10,
    },
    event: {
        height: 200,
        width: 250,
        resizeMode: "stretch",
        backgroundColor: '#E3DBDB'
    },
});



/*import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, FlatList} from "react-native"
import * as React from "react";



const navController = (navigation, route) => {
    navigation.navigate(route)
}

//HomeScrren komponenten oprettes i et scrollview som indholder text, billeder og en TouchableOpacity som fungerer som en knap og navigerer til FullEventPage
function HomeScreen ({navigation}) {
    return (
        <ScrollView style={styles.root}>
            <View>
                <Text style={{
                    fontSize: 70,
                    fontWeight: 'bold',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#A07FD8',
                    paddingTop: 55,
                    paddingBottom: 30}}>
                    MeetMe
                </Text>
            </View>
        </ScrollView>
    )
}

//Lokal styling
const styles = StyleSheet.create({
    root: {
        paddingLeft: 10,
        paddingRight:10,
        backgroundColor: "#FFFFFF",
    },
    text: {
        textAlign: 'left',
        paddingBottom: 15,
        paddingTop: 25,
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 12,
    },
    event: {
        height: 150,
        width: 350,
        resizeMode: "stretch",
    },
});

export default HomeScreen*/