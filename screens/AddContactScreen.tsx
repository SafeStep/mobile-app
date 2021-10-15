import Styles from "@mapbox/mapbox-sdk/services/styles";
import React, {FC, useState} from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native";
import {Button, Input} from "../components";
import AddResponsibilityQueue from "../logic/AddResponsibilityQueue";

import ColorPalette from "../constants/ColorPalette";
const {height, width} = Dimensions.get("screen");

const App: FC = ({navigation, route}: any) => {
  const [ecEmail, setEcEmail] = useState("");
  const [ecName, setEcName] = useState("");

  const createUser = async () => {
    AddResponsibilityQueue.add(ecEmail, ecName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Contact Name"
          placeholder="Name"
          onChangeText={setEcName}
        />
        <Input
          label="Contact Email"
          placeholder="Email"
          onChangeText={setEcEmail}
        />
      </View>

      <Text style={styles.info}>
        {
          "This user will be sent an SMS message when you have gone 'off course' in a journey.\
          They will receive an invitation to become one of your emergency contacts via email."
        }
      </Text>
      <Button title="Create" onPress={createUser} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 20,
    alignItems: "center",
    backgroundColor: ColorPalette.white,
    height: height,
  },
  form: {
    height: 200,
    justifyContent: "space-around",
  },
  info: {
    width: width * 0.8,
    fontSize: 15,
    marginVertical: 10,
  },
});
