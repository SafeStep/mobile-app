import Styles from "@mapbox/mapbox-sdk/services/styles";
import React, {FC, useState} from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native";
import {Button, Input} from "../components";
import AddResponsibilityQueue from "../logic/AddResponsibilityQueue";
import {ValidationError} from "../components";

import ColorPalette from "../constants/ColorPalette";
const {height, width} = Dimensions.get("screen");

const App: FC = ({navigation, route}: any) => {
  enum FormInputs {
    Name,
    Email,
  }

  const [ecEmail, setEcEmail] = useState<string>("");
  const [ecName, setEcName] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<
    Map<FormInputs, string>
  >(new Map());

  const validateInputs = (): boolean => {
    let newValidationErrors = validationErrors
    
    setValidationErrors(newValidationErrors)

    return false
  };

  const createUser = async () => {
    const valid = validateInputs();

    if (valid) AddResponsibilityQueue.add(ecEmail, ecName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Contact Name"
          placeholder="Name"
          onChangeText={setEcName}
        />
        {validationErrors.get(FormInputs.Name) != undefined ? (
          <ValidationError
            errMessage={validationErrors.get(FormInputs.Name) as string}
          />
        ) : null}
        <Input
          label="Contact Email"
          placeholder="Email"
          onChangeText={setEcEmail}
        />
        {validationErrors.get(FormInputs.Email) != undefined ? (
          <ValidationError
            errMessage={validationErrors.get(FormInputs.Email) as string}
          />
        ) : null}
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
