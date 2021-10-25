import React, {FC, useState} from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native";
import {Button, Input} from "../components";
import AddResponsibilityQueue from "../logic/AddResponsibilityQueue";
import {ValidationError} from "../components";

import {
  ec_email_regex as EC_EMAIL_REGEX,
  invalid_ec_email_msg as INVALID_EC_EMAIL_MSG,
  invalid_ec_name_msg as INVALID_EC_NAME_MSG,
} from "../configuration.json"; // this should be modified to use dependancy injection

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
    let newValidationErrors = new Map(validationErrors);
    let valid = true;

    if (ecName.replaceAll(" ", "").length == 0) {
      valid = false;
      newValidationErrors.set(FormInputs.Name, INVALID_EC_NAME_MSG);
    } else {
      newValidationErrors.delete(FormInputs.Name);
    }

    if (!ecEmail.match(EC_EMAIL_REGEX)) {
      valid = false;
      newValidationErrors.set(FormInputs.Email, INVALID_EC_EMAIL_MSG);
    } else {
      newValidationErrors.delete(FormInputs.Email);
    }

    setValidationErrors(newValidationErrors);
    return valid;
  };

  const createUser = () => {
    const valid = validateInputs();
    if (valid) {
      AddResponsibilityQueue.add(ecEmail, ecName);
      alert("Contact Created");
      setEcEmail(""); // reset values
      setEcName("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Input
          label="Contact Name"
          placeholder="Name"
          onChangeText={text => {
            setEcName(text);
            if (validationErrors.get(FormInputs.Name)) validateInputs(); // if the name was invalid check after every keystroke to remove the message
          }}
          value={ecName}
        />
        {validationErrors.get(FormInputs.Name) != undefined ? (
          <ValidationError
            errMessage={validationErrors.get(FormInputs.Name) as string}
          />
        ) : null}
        <Input
          label="Contact Email"
          placeholder="Email"
          onChangeText={text => {
            setEcEmail(text);
            if (validationErrors.get(FormInputs.Email)) validateInputs();
          }}
          value={ecEmail}
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
