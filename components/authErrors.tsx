import React, {FC} from "react";
import {Dimensions, Text, View, StyleSheet} from "react-native";

const {height, width} = Dimensions.get("screen");

interface Props {
  errMessage: string;
}

const AuthError: FC<Props> = ({errMessage}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {errMessage} </Text>
    </View>
  );
};

export default AuthError;

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    flexDirection: "column",
  },
  title: {
    color: "red",
    fontSize: 20,
    alignSelf: "center",
    paddingTop: 10,
    textAlign: "center",
  },
});
