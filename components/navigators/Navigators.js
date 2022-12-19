import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../authentication/Login";
import Profile from "../ProfileViews/Profile";
import Events from "../ProfileViews/Events/Events";
import Create from "../ProfileViews/Events/Create";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native"
import Details from "../ProfileViews/Events/Details";
import HomeScreen from "../ProfileViews/HomeScreen"
import Chat from "../ProfileViews/Chat"
import SignUp from "../authentication/SignUp";

// Her bliver StackNavigator og BottomTabNavigator initialiseret
const StackAuthentication = createStackNavigator();
const Tab = createBottomTabNavigator();


// I StackNavigator er der oprettet to sider til navigering mellem hinanden: Login og Signup
function AuthStack() {
    return (
        <StackAuthentication.Navigator screenOptions={{headerShown: null}}>
            <StackAuthentication.Screen name="Login" component={Login} />
            <StackAuthentication.Screen name="SignUp" component={SignUp} />
        </StackAuthentication.Navigator>
    );
}

// I StackNavigator er der oprettet tre sider til navigering mellem hinanden: Event, Event Details og Create
const Stack = createStackNavigator();
const StackNavigation = () => {
    return (
        <Stack.Navigator style={styles.root} options={{headerShown:null}}>
            <Stack.Screen name={'Event'} component={Events} options={{headerShown:null}}/>
            <Stack.Screen name={'Event Details'} component={Details} options={{headerShown:null}}/>
            <Stack.Screen name={'Create'} component={Create} options={{headerShown:null}}/>
        </Stack.Navigator>
    );
}

// Endnu en StackNavigator der navigerer mellem : HomeScreen og Event Details
const HomeStack = () => {
    return (
        <Stack.Navigator style={styles.root} options={{headerShown:null}}>
            <Stack.Screen name={'HomeScreen'} component={HomeScreen} options={{headerShown:null}}/>
            <Stack.Screen name={'Event Details home'} component={Details} options={{headerShown:null}}/>
        </Stack.Navigator>
    );
}

// Den navigationsbar der ses i bunden af Appen, uanset hvilken side brugeren befinder sig på
function AppTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Tab.Screen name={"Home"} component={HomeStack} options={{
                tabBarIcon: () => (<Ionicons name="home" size={20} color={'#4E3D42'}/>), headerShown: null}}/>
            <Tab.Screen name="Events" component={StackNavigation} options={{
                tabBarIcon: () => (<Ionicons name="calendar" size={20} color={'#4E3D42'}/>), headerShown: null}}/>
            <Tab.Screen name={"Chat"} component={Chat} options={{
                tabBarIcon: () => (<Ionicons name="chatbubbles" size={20} color={'#4E3D42'}/>), headerShown: null}}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: () => (<Ionicons name="person" size={20} color={'#4E3D42'}/>), headerShown: null}}/>
        </Tab.Navigator>
    );
}

// Eksporterer komponenterne, der anvendes
export {AuthStack, AppTab, StackNavigation, HomeStack}

// Styling
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