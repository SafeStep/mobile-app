import Styles from "@mapbox/mapbox-sdk/services/styles";
import React, {FC, useState} from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native";
import {Input} from "../components";
import ColorPalette from "../constants/ColorPalette";
const {height, width} = Dimensions.get("screen");

const App: FC = ({navigation, route}: any) => {
  const [ecEmail, changeECEmail] = useState("");
  const [ecName, changeECName] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          label="EC Email"
          placeholder="Email"
          onChangeText={text => changeEcEmail(text)}
        />
        <Input
          label="EC Name"
          placeholder="Name"
          onChangeText={text => changeECName(text)}
        />
      </View>

      <Text style={styles.info}>
        {
          "This user will be sent an SMS message when you have gone 'off course' in a journey.\
          They will receive an invitation to become one of your emergency contacts via email."
        }
      </Text>
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
