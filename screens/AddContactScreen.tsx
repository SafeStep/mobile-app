import React, { FC, useState } from "react";
import {
  View,
  TextInput,
  Text
} from "react-native";

const App : FC = ( { navigation } : any ) => {

    const [ecName, changeECName] = useState("");


    return (
        <View>
          <Text>{"Emergency Contacts Email"}</Text>
          <TextInput
          keyboardType="email-address"
          style={{backgroundColor: "green"}}>
          </TextInput>
          <Text>{"Emergency Contact First Name"}</Text>
          <TextInput
          style={{backgroundColor: "green"}}>
          </TextInput>
        </View>
    );
};

export default App;