import React, {FC} from "react";
import {Text, Image, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {
  MapScreen,
  Contacts,
  LocationSearchScreen,
  LocationPermCheckScreen,
  OnRouteScreen,
  Profile,
  Settings,
} from "../screens/index";
import AddContactScreen from "../screens/AddContactScreen";
import Images from "../assets/images"
import ColorPalette from "../constants/ColorPalette";
const {Navigator, Screen} = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
        tabBarInactiveBackgroundColor: ColorPalette.white,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={() => ({
          tabBarShowLabel: false,
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarIcon: ({focused} : any) => (
            <Image
              style={{
                height: 25,
                width: 25,
                tintColor: focused
                  ? ColorPalette.mainBlue
                  : ColorPalette.fontGrey,
              }}
              source={Images.nav.map}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Contact"
        component={Contacts}
        options={({navigation} : any) => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: ColorPalette.white,
            height: 100,
          },
          headerTitleAlign: "center",
          headerTintColor: ColorPalette.mainBlue,
          headerTitleStyle: {
            fontWeight: 'bold',
            marginHorizontal: 20,
            fontSize: 25,
          },
          title: "Contacts",
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("add_contact")}>
              <Image style={styles.add} source={Images.addContact} />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarIcon: ({focused} : any) => (
            <Image
              style={{
                height: 25,
                width: 25,
                tintColor: focused
                  ? ColorPalette.mainBlue
                  : ColorPalette.fontGrey,
              }}
              source={Images.nav.contacts}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={() => ({
          tabBarShowLabel: false,
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarIcon: ({focused} : any) => (
            <Image
              style={{
                height: 25,
                width: 25,
                tintColor: focused
                  ? ColorPalette.mainBlue
                  : ColorPalette.fontGrey,
              }}
              source={Images.nav.profile}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          tabBarShowLabel: false,
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          tabBarIcon: ({focused} : any) => (
            <Image
              style={{
                height: 25,
                width: 25,
                tintColor: focused
                  ? ColorPalette.mainBlue
                  : ColorPalette.fontGrey,
              }}
              source={Images.nav.settings}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const AppStack: FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="location_perm_check" component={LocationPermCheckScreen} />
      <Screen name="map" component={Home} />
      <Screen name="on_route" component={OnRouteScreen} />
      <Screen name="location_search" component={LocationSearchScreen} />

      {/* <Screen name="contacts" component={Contacts} options={contactsOptions} />  */}
      <Screen name="add_contact" component={AddContactScreen} options={
        { 
          headerShown: true,
          headerStyle: {
            backgroundColor: ColorPalette.white,
            height: 100,
          },
          headerTitleAlign: "center",
          headerTintColor: ColorPalette.mainBlue,
          headerTitleStyle: {
            fontWeight: 'bold',
            marginHorizontal: 20,
            fontSize: 25,
          },
          title: "Add Contact"
        }
      }
      />
    </Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#FD5E53",
  },
  headerTitleStyle: {
    color: "#eee",
  },
  add: {
    height: 25,
    width: 25,
    marginHorizontal: 30,
  }
});

