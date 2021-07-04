import React, { useState, useRef, FC} from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";


const styles = require('./styles');
const App : FC = ( { navigation } : any ) => {
    
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);
    return (
      <>
        <View style={styles.container}>
          <SafeAreaView style={styles.wrapper}>
            {showMessage && (
              <View style={styles.message}>
                <Text>Value : {value}</Text>
                <Text>Formatted Value : {formattedValue}</Text>
                <Text>Valid : {valid ? "true" : "false"}</Text>
              </View>
            )}
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="GB"
              layout="first"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const checkValid = phoneInput.current?.isValidNumber(value);
                setShowMessage(true);
                setValid(checkValid ? checkValid : false);
              }}
            >
              <Text>Check</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </>
    );
};

export default App;