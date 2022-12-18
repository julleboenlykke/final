import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";
import Profile from "../ProfileViews/Profile";
import Events from "../ProfileViews/Events/Events";
import Create from "../ProfileViews/Events/Create";
import {NavigationContainer} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native"
import Details from "../ProfileViews/Events/Details";
import HomeScreen from "../ProfileViews/HomeScreen"
import Chat from "../ProfileViews/Chat"

//Instantiering af; to stacknavigator instanser og én bottomtabnavigator
const StackAuthentication = createStackNavigator();
const Tab = createBottomTabNavigator();


//Stack komponent til navigering mellem login og signup.
function AuthStack() {
    return (
        <StackAuthentication.Navigator screenOptions={{headerShown: null}}>
            <StackAuthentication.Screen name="Login" component={Login} />
            <StackAuthentication.Screen name="SignUp" component={SignUp} />
        </StackAuthentication.Navigator>
    );
}

//Stack komponent til navigering mellem maps og entrance siderne
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

// Bottom tab navigator til navigering mellem homepage og entrance-stack-siderne
function ProfileTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Tab.Screen name={"Home"} component={HomeScreen} options={{
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

//Eksport af komponenter, således disse kan anvendes
export {AuthStack, ProfileTab, StackNavigation}

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