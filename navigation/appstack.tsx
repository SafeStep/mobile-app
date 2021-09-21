<<<<<<< HEAD
import React, {FC} from "react";
import {Button, Text} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import {
  MapScreen,
  Contacts,
  LocationSearchScreen,
  LocationPermCheckScreen,
  OnRouteScreen,
} from "../screens/index";
import {TouchableOpacity} from "react-native-gesture-handler";
import AddContactScreen from "../screens/AddContactScreen";
=======
import React, {FC} from 'react'
import { View, Text, Image, StyleSheet} from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack'
import { MapScreen, Contacts, LocationSearchScreen, 
         LocationPermCheckScreen, OnRouteScreen,
        Profile, Settings } from '../screens/index';

import AddContactScreen from '../screens/AddContactScreen';
<<<<<<< HEAD
>>>>>>> f5efc89 (rebase)

=======
import Images from '../assets/images/index'
import ColorPalette from '../constants/ColorPalette';
import { ConsoleLogger } from '@aws-amplify/core';
>>>>>>> c5afbe4 (Added Bottom tabs)
const {Navigator, Screen} = createStackNavigator();
const Tab = createBottomTabNavigator();
const test = () => {
    return (
        <View>
            <Text> Test </Text>
        </View>
    )
}

const Home = () => {
    return  <Tab.Navigator 
                initialRouteName="Map"
                screenOptions={
                {
                    headerShown: false,
                    tabBarInactiveBackgroundColor: ColorPalette.white,
                    tabBarStyle: [
                        {
                            "display": "flex"
                        },
                        null
                    ]
                }}
            >
                <Tab.Screen name="Map" component={MapStuff} options={
                    ({ route }) => ({ 
                        tabBarShowLabel: false,
                        headerStyle: styles.headerStyle,
                        headerTitleStyle: styles.headerTitleStyle,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: focused ? ColorPalette.mainBlue : ColorPalette.fontGrey,
                                }}
                                source={Images.nav.map}

                            />
                        ),
                    })
                }/>
                <Tab.Screen name="Contact" component={ContactStuff} options={ 
                    ({ route }) => ({ 
                        tabBarShowLabel: false,
                        headerStyle: styles.headerStyle,
                        headerTitleStyle: styles.headerTitleStyle,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: focused ? ColorPalette.mainBlue : ColorPalette.fontGrey,
                                }}
                                source={Images.nav.contacts}
                            />
                        ),
                    })
                } />
                <Tab.Screen name="Profile" component={Profile} options={ 
                    ({ route }) => ({ 
                        tabBarShowLabel: false,
                        headerStyle: styles.headerStyle,
                        headerTitleStyle: styles.headerTitleStyle,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: focused ? ColorPalette.mainBlue : ColorPalette.fontGrey,
                                }}
                                source={Images.nav.profile}
                            />
                        ),
                    })
                }/>
                <Tab.Screen name="Settings" component={Settings} options={ 
                    ({ route }) => ({ 
                        tabBarShowLabel: false,
                        headerStyle: styles.headerStyle,
                        headerTitleStyle: styles.headerTitleStyle,
                        tabBarIcon: ({ focused}) => (
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: focused ? ColorPalette.mainBlue : ColorPalette.fontGrey,
                                }}
                                source={Images.nav.settings}
                            />
                        ),
                    })
                }/>
            </Tab.Navigator>
}

const MapStuff = () => {
    return  <Navigator screenOptions={{headerShown: false}}>
        <Screen name="location_perm_check" component={LocationPermCheckScreen} />
        <Screen name='map' component={MapScreen} />
        <Screen name="on_route" component={OnRouteScreen}/>
        <Screen name="location_search" component={LocationSearchScreen} />
    </Navigator>

}

const ContactStuff = () => {
    return  <Navigator screenOptions={{headerShown: false}}>
        <Screen name='contacts' component={Contacts} options={contactsOptions} />

        <Screen name="add_contact" component={AddContactScreen} options={{ headerShown: true, title: 'New Emergency Contact'}} />

    </Navigator>

}


<<<<<<< HEAD
const AppStack: FC = () => {
  // console.log([props]);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="location_perm_check" component={LocationPermCheckScreen} />
      <Screen name="map" component={MapScreen} />
      <Screen name="on_route" component={OnRouteScreen} />
      <Screen name="contacts" component={Contacts} options={contactsOptions} />
      <Screen name="location_search" component={LocationSearchScreen} />
      <Screen
        name="add_contact"
        component={AddContactScreen}
        options={{headerShown: true, title: "New Emergency Contact"}}
      />
    </Navigator>
  );
};
=======
const AppStack : FC = () => {
    // console.log([props]);
    return (

		<Home />
        // <Navigator screenOptions={{headerShown: false}}>
        //     <Screen name="home" component={Home} />
        //     {/* <Screen name="location_perm_check" component={LocationPermCheckScreen} />
        //     <Screen name='map' component={MapScreen} />
        //     <Screen name="on_route" component={OnRouteScreen}/>
        //     <Screen name="location_search" component={LocationSearchScreen} /> */}
        //     {/* <Screen name='contacts' component={Contacts} options={contactsOptions} />

        //     <Screen name="add_contact" component={AddContactScreen} options={{ headerShown: true, title: 'New Emergency Contact'}} />
        //  */}
        // </Navigator>

    )
}
>>>>>>> f5efc89 (rebase)

const contactsOptions = ({route, navigation}: any) => ({
  headerShown: true,
  title: "Emergency Contacts",
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("add_contact")}>
      <Text>{"New"}</Text>
    </TouchableOpacity>
  ),
});

export default AppStack;
<<<<<<< HEAD
=======

const styles = StyleSheet.create({
	// tinyLogo: {
	// 	height: 25,
	// 	width: 25,

	// 	// backgroundColor: '#21BF73'
	// },
	headerStyle: {
		backgroundColor: '#FD5E53',
		
	},
	headerTitleStyle: {
		color: '#eee',
	}
});
>>>>>>> f5efc89 (rebase)
