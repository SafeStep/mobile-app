import React, {FC, useState, useEffect, useCallback} from "react";
import {Dimensions, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {EC} from "../types";
import Auth from "@aws-amplify/auth";

import {ContactsList} from "../components";

import * as config from "../configuration.json";
import ColorPalette from "../constants/ColorPalette";
const {height, width} = Dimensions.get("screen");

const API_URL = config.api_url;

const App: FC = ({navigation}: any) => {
  const [loading, updateLoading] = useState(true);
  const [loadedContacts, setLoadedContacts] = useState([] as EC[]);

  const removeContact = useCallback(
    contactToDelete => {
      console.log(contactToDelete);
      const contactIndex = loadedContacts.findIndex(
        contact => contact.ECID === contactToDelete.ECID,
      ); // find the index of the user
      if (contactIndex > -1) {
        // if the user is in the array
        const loadedContactsWithoutUser = [...loadedContacts]; // clone the array
        loadedContactsWithoutUser.splice(contactIndex, 1); // remove the contact from the array
        setLoadedContacts(loadedContactsWithoutUser); // update the loaded contacts (saves a call to the server)
      }
    },
    [loadedContacts], // recache this function whenever loadedContacts changes
  );

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(currentlyLoggedInUser =>
        fetch(
          API_URL +
            "/1.0/responsibilities?greenid=" +
            currentlyLoggedInUser.attributes.sub,
          {method: "GET"},
        ),
      ) // TODO some authentication will be required here
      .then(response => response.json()) // parse the data into js object (is sync action)
      .then(data => setLoadedContacts(data))
      .catch(error => console.log("failed to load contacts" + error))
      .finally(() => updateLoading(false)); // loading has finished
    //setTimeout(() => {updateLoading(false)}, 1000)  // update loading as loading has completed after a second for testing
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: ColorPalette.white, height: height}}>
      {loading ? (
        <ActivityIndicator size="large" color={ColorPalette.mainBlue} />
      ) : (
        <ContactsList
          contacts={loadedContacts}
          removeContactCallback={removeContact}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
