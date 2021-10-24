import React, {FC, useState, useEffect, useCallback} from "react";
import {Dimensions, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {EC} from "../types";
import Auth from "@aws-amplify/auth";

import {ContactsList} from "../components";
import GetEcsLambda from "../logic/GetEcsLambda";

import ColorPalette from "../constants/ColorPalette";

const {height, width} = Dimensions.get("screen");

const App: FC = ({navigation}: any) => {
  const [loading, updateLoading] = useState(true);
  const [loadedContacts, setLoadedContacts] = useState([] as EC[]);

  const removeContact = useCallback(
    contactToDelete => {
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

  const getContacts = async () => {
    try {
      const rawResponse = await GetEcsLambda.invoke();
      const jsonResponse = JSON.parse(rawResponse!.Payload as string);

      if (rawResponse!.StatusCode == 200) {
        setLoadedContacts(jsonResponse.data);
      } else {
        alert("Failed to load emergency contacts");
      }
    } catch {
      console.log("Failed to load contacts");
    } finally {
      updateLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      updateLoading(true);
      getContacts();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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
