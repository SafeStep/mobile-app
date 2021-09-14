import React, {FC, useState} from "react";
import {View, TextInput, Text} from "react-native";

const App: FC = ({navigation, route}: any) => {
  const [ecName, changeECName] = useState("");

  return (
    <View>
      <Text>{"Emergency Contacts Email"}</Text>
      <TextInput
        keyboardType="email-address"
        style={{backgroundColor: "green"}}></TextInput>
      <Text>{"Emergency Contact First Name"}</Text>
      <TextInput style={{backgroundColor: "green"}}></TextInput>
      <Text>
        {
          "This user will be sent an SMS message when you have gone 'off course' in a journey.\
They will receive an invitation to become one of your emergency contacts via email."
        }
      </Text>
    </View>
  );
};

export default App;
