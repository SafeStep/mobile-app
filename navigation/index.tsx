import React, {FC, useState, useEffect} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import {Input, Button, HeadingCurve, RoundButton} from "../components";
import ColorPalette from "../constants/ColorPalette";
import Images from "../assets/images";

import {NavigationContainer} from "@react-navigation/native";
import AppStack from "./appstack";
import AuthStack from "./authstack";

import Amplify, {Auth, Hub} from "aws-amplify";
import awsconfig from "../aws-exports";
// import awsconfig from '../aws_config';

import Test from './test'

Amplify.configure(awsconfig);

const MainNav: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [signedIn, setSignedIn] = useState<boolean>(false);

  Hub.listen("auth", data => {
    switch (data.payload.event) {
      case "signIn":
        console.log("user signed in");
        setSignedIn(true);
        break;
      case "signUp":
        console.log("user signed up");
        break;
      case "signOut":
        console.log("user signed out");
        setSignedIn(false);
        break;
      case "signIn_failure":
        console.log("user sign in failed");
        break;
      case "configured":
        console.log("the Auth module is configured");
    }
  });

  const notAuth = (err: string) => {
    console.log("Not signed in", err);
    setLoading(false);
  };

  useEffect(() => {
    const currentUser = async () => {
      await Auth.currentAuthenticatedUser()
        .then(() => setSignedIn(true))
        .catch(err => notAuth(err))
        .finally(() => setLoading(false));
    };

    currentUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <HeadingCurve text="SafeSteps" />
        <View style={styles.loading}>
          <View style={styles.logo}>
            <RoundButton
              icon={Images.logo}
              onPress={() => {
                return;
              }}
            />
          </View>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        {signedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }
};

export default MainNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    backgroundColor: ColorPalette.mainBlue,
  },
  loading: {
    marginVertical: 10,
    flexDirection: "column",
  },
  logo: {
    marginTop: 125,
    marginBottom: 150,
  },
});
