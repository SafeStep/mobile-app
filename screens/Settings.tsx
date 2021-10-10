import React, {FC} from "react";
import {View, Text, StyleSheet} from "react-native";
import {TempHome} from ".";
import ColorPalette from "../constants/ColorPalette";

const App: FC = () => {
  return (
    <View style={styles.container}>
      <TempHome />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorPalette.white,
  },
});
