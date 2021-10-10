import {useLinkProps} from "@react-navigation/native";
import React, {FC, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {CognitoHostedUIIdentityProvider} from "@aws-amplify/auth/lib/types";

import {
  Input,
  Button,
  HeadingCurve,
  AuthError,
  RoundButton,
} from "../components";
import ColorPalette from "../constants/ColorPalette";
import Images from "../assets/images";

import {Auth} from "aws-amplify";

const App: FC = ({route, navigation}: any) => {
  // const [email, setEmail] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const Login = async () => {
    if (email && password) {
      Auth.signIn(email!, password!)
        .then(user => console.log(user))
        .catch(err => {
          if (err.name == "UserNotConfirmedException") {
            navigation.navigate("confirm_code", {username: email});
          } else {
            setErrorMessage(err.message);
          }
        });
    }
  };

  const FederatedLogin = async () => {
    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
      .then(user => console.log("NewUser", user))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <HeadingCurve text="Login" />
      <View style={styles.formContainer}>
        <View style={styles.logo}>
          <RoundButton icon={Images.logo} onPress={() => console.log("logo")} />
        </View>
        <AuthError errMessage={errorMessage} />
        <Input
          label="E-mail"
          placeholder="E-mail"
          onChangeText={text => setEmail(text)}
        />

        <Input
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <View style={styles.forgot}>
          <Text style={styles.intextButton}>Forgot</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("reset_password")}>
            <Text style={styles.span}> Password </Text>
          </TouchableOpacity>
        </View>

        <Button title="Login" onPress={Login} />

        <View style={styles.alternatives}>
          <RoundButton
            icon={Images.login.googleIcon}
            onPress={FederatedLogin}
          />
          <RoundButton
            icon={Images.login.facebookIcon}
            onPress={() => console.log("pressed")}
          />
          <RoundButton
            icon={Images.login.appleIcon}
            onPress={() => console.log("pressed")}
          />
        </View>

        <View style={styles.changePage}>
          <Text style={styles.intextButton}> Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.span}>Signup </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    marginBottom: 5,
  },
  forgot: {
    flexDirection: "row",
    marginTop: 5,
  },
  alternatives: {
    width: 150,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  changePage: {
    marginTop: 50,
    flexDirection: "row",
    alignSelf: "center",
  },
  intextButton: {
    color: ColorPalette.fontGrey,
    fontSize: 15,
  },
  span: {
    color: ColorPalette.fontLightBlue,
    fontWeight: "bold",
    fontSize: 15,
  },
});
