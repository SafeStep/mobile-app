import {useLinkProps} from "@react-navigation/native";
import React, {FC, useState, useRef, useEffect} from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import Images from "../assets/images";
import {ScrollView} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";
import {Header} from "../components";
import Navigation from "../navigation/first_index";
import {PhysicalLocation} from "../types";
import {UserGeolocationService} from "../logic/UserGeolocationService";
import {Point} from "../logic/GeographicLogic";

import * as config from "../configuration.json";
import ColorPalette from "../constants/ColorPalette";

const MAPBOX_KEY = config.mapbox_key;
const METER_TO_MILE = 0.000621371192;
const axios = require("axios");

const styles = StyleSheet.create({
  inputBox: {
    flex:5,
    marginVertical: 20,
    padding: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: ColorPalette.white,
    borderWidth: 0.5,
  },
  searchContainer: {
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  backButton: {
    marginLeft: 15,
    flex: 1,
  },
  backArrow: {
    fontSize: 50,
    paddingTop: 0,
    tintColor: ColorPalette.black,
  },
  resultsContainer: {
    width: "90%",
    height: 500,
    alignSelf: "center",
    borderTopWidth: 1,
    borderColor: ColorPalette.fontGrey,
  },

  result: {
    flex:1,
    borderRadius: 5,
    borderColor: ColorPalette.fontGrey,
    borderBottomWidth: 1,
    height: 60,
    padding: 15,
    flexDirection: "column",
    justifyContent: "center",
  },
  resultItems:{
    flexDirection: "row",
  },
  resultDistance: {
    padding: 5,
    flex:1,
    borderRightWidth: 1,
    borderRightColor: ColorPalette.fontGrey,

  },
  resultDistanceText: {
    fontWeight: "100",
    fontSize: 13,
  },
  resultTitle: {
    flex: 5,
  },
  resultTitleText:{
    fontWeight: "bold",
    fontSize: 15,
    padding: 5,
  }
});

interface locationResultInterface extends PhysicalLocation {
  navigation: any;
  inputId: string;
  clickCallback: Function;
}

const LocationResult = ({
  navigation,
  title,
  lat,
  long,
  inputId,
  clickCallback,
}: locationResultInterface) => {
  let distance;
  const userLocation = UserGeolocationService.instance.getCachedLocation();
  if (userLocation != null) {
    // if the users location is null dont generate
    distance =
      new Point(long, lat).distanceTo(
        new Point(userLocation!.long, userLocation!.lat),
      ) * METER_TO_MILE;
    distance = Math.round(distance * 10) / 10; // round to 1dp
  }
  return (
    <TouchableOpacity
      style={styles.resultItems}
      onPress={() => {
        navigation.navigate("map", {
          inputId: inputId,
          location: {title: title, lat: lat, long: long},
        });
        clickCallback(inputId, {title: title, lat: lat, long: long});
      }}>
      <View style={styles.resultDistance}>
        {distance ? <Text style={styles.resultDistanceText}>{distance + " mi"}</Text> : null}

      </View>
      <View style={styles.resultTitle}>
       <Text style={styles.resultTitleText}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
};

const App: FC = ({route, navigation}: any) => {
  const [inputId, setInputId] = useState(route.params.inputId);
  const [results, setResults] = useState([] as PhysicalLocation[]);
  const [typingTimeout, setTypingTimeout] = useState(null as any);

  const textInputRef = useRef(null as any); // store a reference to the text input

  const handleTypingTimeout = (inputValue: string) => {
    if (typingTimeout) {
      // if its not null
      clearTimeout(typingTimeout); // reset the timeout
    }
    const searchDelay = 200;

    setTypingTimeout(
      setTimeout(
        inputValue => {
          searchLocations(inputValue);
        },
        searchDelay,
        inputValue,
      ),
    );
  };

  const searchLocations = (inputValue: string) => {
    // run the mapbox api
    let currentLocation = UserGeolocationService.instance.getCachedLocation();
    if (!currentLocation) {
      alert("Cant get your location right now!");
    }
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?proximity=${
          currentLocation!.long
        },${
          currentLocation!.lat
        }&autocomplete=true&fuzzyMatch=true&access_token=${MAPBOX_KEY}`,
      )
      .then(function (response: any) {
        let results = [] as PhysicalLocation[];

        response.data.features.forEach((location: any) => {
          // for each response
          results.push({
            title: location.place_name,
            long: location.center[0],
            lat: location.center[1],
          });
        });

        setResults(results); // update the search results
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: ColorPalette.white}}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.navigate("map");
          }}>
          <Image style={styles.backArrow} source={Images.backIcon} />
        </TouchableOpacity>
        <TextInput
          ref={textInputRef}
          style={styles.inputBox}
          placeholder={"Search"}
          onChangeText={queryString => handleTypingTimeout(queryString)}
        />
      </View>
      <KeyboardAvoidingView style={{}}>
        <ScrollView style={styles.resultsContainer}>
          {results.map(location => (
            <View style={styles.result} key={location.title}>
              <LocationResult
                clickCallback={route.params.updateCallback}
                inputId={inputId}
                title={location.title}
                lat={location.lat}
                long={location.long}
                navigation={navigation}
              />
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default App;
