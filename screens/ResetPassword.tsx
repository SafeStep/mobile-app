import {useLinkProps} from "@react-navigation/native";
import React, {FC, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  Input,
  Button,
  HeadingCurve,
  RoundButton,
  AuthError,
} from "../components";
import Images from "../assets/images";
import ColorPalette from "../constants/ColorPalette";
import {Auth} from "aws-amplify";

//const styles = require('./styles');

const App: FC = ({navigation}: any) => {
  const [errorMessage, setErrorMsg] = useState<string>("");

  const [email, setEmail] = useState<string | null>(null);

  const sendConfirmationCode = async () => {
    await Auth.forgotPassword(email as string)
      .then(data =>
        navigation.navigate("reset_password_confirm", {email: email}),
      )
      .catch(err => setErrorMsg(err.message));
  };

  return (
    <View style={styles.container}>
      <HeadingCurve
        backButton={true}
        onPress={() => navigation.navigate("login")}
        text="Forgot Password"
      />
      <View style={styles.formContainer}>
        <View style={styles.logo}>
          <RoundButton
            icon={Images.logo}
            onPress={() => {
              return;
            }}
          />
        </View>
        <AuthError errMessage={errorMessage} />

        <Input
          label="Email"
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />

        <Button title="Send Code" onPress={sendConfirmationCode} />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    backgroundColor: ColorPalette.mainBlue,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    backgroundColor: ColorPalette.white,
  },
  logo: {
    marginTop: 30,
    marginBottom: 70,
  },
});
