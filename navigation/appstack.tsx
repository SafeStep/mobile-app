import React, {FC} from "react";
import {Image, StyleSheet} from "react-native";
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
import Images from "../assets/images"
import Styles from "@mapbox/mapbox-sdk/services/styles";
import ColorPalette from "../constants/ColorPalette";
const {Navigator, Screen} = createStackNavigator();

const AppStack: FC = () => {
  // console.log([props]);

  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="location_perm_check" component={LocationPermCheckScreen} />
      
      <Screen name="map" component={MapScreen} />
      <Screen name="on_route" component={OnRouteScreen} />
      <Screen name="location_search" component={LocationSearchScreen} />

      <Screen name="contacts" component={Contacts} options={contactsOptions} /> 
      <Screen name="add_contact" component={AddContactScreen} options={addContactsOptions}
      />
    </Navigator>
  );
};

const contactsOptions = ({route, navigation}: any) => ({
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
});

const addContactsOptions = ({route, navigation}: any) => ({
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
  title: "Add Contact",
});

export default AppStack;

const styles = StyleSheet.create({
  add: {
    height: 25,
    width: 25,
    marginHorizontal: 30,
  }
})