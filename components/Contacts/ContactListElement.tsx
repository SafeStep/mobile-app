import {TouchableOpacity} from "react-native-gesture-handler";
import React, {FC, useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, Alert} from "react-native";
import {EC} from "../../types";
import ColorPalette from "../../constants/ColorPalette";
interface contactProps {
  contact: EC;
  removeContactCallback: CallableFunction;
}

export const ContactListElement: FC<contactProps> = (props): JSX.Element => {
  return (
    <View style={styles.contactCcontainer}>
      <View>
        <Text style={styles.name}>{props.contact.firstName}</Text>
      </View>
      <View style={styles.info}>
        <Text>{props.contact.email}</Text>
        <Text>{props.contact.phone}</Text>
      </View>
      <View style={styles.info}>
        {props.contact.responsibilities[0].status == "accepted" ? (
          <Text style={styles.accepted}>
            {props.contact.responsibilities[0].status}
          </Text>
        ) : (
          <Text style={styles.pending}>
            {props.contact.responsibilities[0].status}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => {
            showDeleteAlert(props.contact) // ask the user for confirmation
              .then(() => {
                props.removeContactCallback(props.contact);
              }) // remove the contact
              .catch(); // the user does not want to delete the contact
          }}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  ); // safe to use first responsibility because it should be the only responsibility (as shouldnt be able to see other responsibilities of EC)
};

const deleteEC = (ECID: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

const showDeleteAlert = (EC: EC): Promise<void> => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      `Are you sure you want to remove ${EC.firstName}?`,
      `This will remove ${EC.firstName} as an emergency contact for your account, and they will no longer be notified ` +
        `in the event of you leaving your generated route.`,
      [
        {
          text: "Yes",
          onPress: () => {
            try {
              deleteEC(EC.ECID); // dont wait for this to happen, let the request happen in the background
            } catch (err) {
              console.log(err); // dont throw exception, just log issue
            }
            resolve();
          },
        },
        {
          text: "No", // do nothing just close dialog
          onPress: () => {
            reject();
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          reject();
        },
      },
    );
  });
};
// return promise then resolve the promise if it is deleted so you know whether to delete the user or not from the local list

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
    backgroundColor: ColorPalette.mainBlue,
  },
  contactCcontainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: "column",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accepted: {
    width: 70,
    textAlign: "center",
    backgroundColor: ColorPalette.acceptedGreen,
    borderRadius: 5,
  },
  pending: {
    width: 70,
    textAlign: "center",
    backgroundColor: ColorPalette.pendingYellow,
    borderRadius: 5,
  },
  delete: {
    width: 70,
    textAlign: "center",
    backgroundColor: ColorPalette.deleteRed,
    borderRadius: 5,
  },
});
