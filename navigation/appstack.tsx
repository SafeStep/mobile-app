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
import { Button, Text, Image, StyleSheet} from "react-native"
import { TouchableOpacity } from 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack'
import { MapScreen, Contacts, LocationSearchScreen, 
         LocationPermCheckScreen, OnRouteScreen,
        Profile, Settings } from '../screens/index';

import AddContactScreen from '../screens/AddContactScreen';
>>>>>>> f5efc89 (rebase)

const {Navigator, Screen} = createStackNavigator();
const Tab = createBottomTabNavigator();


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
        
		<Navigator>
				<Tab.Navigator 
                    initialRouteName="Notice"
                    screenOptions={{
                        "tabBarActiveBackgroundColor": "#FD5E53",
                        "tabBarInactiveBackgroundColor": "#21BF73",
                        "tabBarStyle": [
                            {
                                "display": "flex"
                            },
                            null
                        ]
                    }}
                >
                    <Tab.Screen name="Notice" component={MapScreen} options={
                        ({ route }) => ({ 
                            tabBarShowLabel: false,
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('./assets/images/notice_icon.png')}
                                />
                            ),
                        })
                    }/>
                    <Tab.Screen name="Timetable" component={Contacts} options={ 
                        ({ route }) => ({ 
                            tabBarShowLabel: false,
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('./assets/images/timetable.png')}
                                />
                            ),
                        })
                    } />
                    <Tab.Screen name="Homework" component={Profile} options={ 
                        ({ route }) => ({ 
                            tabBarShowLabel: false,
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('./assets/images/homework.png')}
                                />
                            ),
                        })
                    }/>
                    <Tab.Screen name="Profile" component={Settings} options={ 
                        ({ route }) => ({ 
                            tabBarShowLabel: false,
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle,
                            tabBarIcon: ({ color, size }) => (
                                <Image
                                    style={styles.tinyLogo}
                                    source={require('./assets/images/profile.png')}
                                />
                            ),
                        })
                    }/>
                </Tab.Navigator>
			
		</Navigator>

        // <Navigator screenOptions={{headerShown: false}}>


        //     <Screen name="location_perm_check" component={LocationPermCheckScreen} />
        //     <Screen name='map' component={MapScreen} />
        //     <Screen name="on_route" component={OnRouteScreen}/>
        //     <Screen name='contacts' component={Contacts} options={contactsOptions} />
        //     <Screen name="location_search" component={LocationSearchScreen} />
        //     <Screen name="add_contact" component={AddContactScreen} options={{ headerShown: true, title: 'New Emergency Contact'}} />
        
            
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
	tinyLogo: {
		height: 25,
		width: 25,

		// backgroundColor: '#21BF73'
	},
	headerStyle: {
		backgroundColor: '#FD5E53',
		
	},
	headerTitleStyle: {
		color: '#eee',
	}
});
>>>>>>> f5efc89 (rebase)
