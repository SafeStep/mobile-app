"use strict";
import {StyleSheet} from "react-native";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "40%",
    backgroundColor: "#eee",
  },
  forgot: {
    flexDirection: "row",
    marginTop: 5,
  },
  stretch: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 10,
  },
  altText: {
    marginTop: 10,
    marginBottom: 0,
    fontSize: 15,
    color: "#605B5B",
  },
  alternatives: {
    // flex: 1,
    flexDirection: "row",
  },
  altMethods: {
    width: "25%",
    height: 60,
    marginVertical: 10,

    marginLeft: 5,
    marginRight: 5,

    // backgroundColor: 'red',
    // flex: 1,
    // flexDirection: 'row',

    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {width: 1, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  changePage: {
    flexDirection: "row",
    marginVertical: 10,
  },
  intextButton: {
    color: "#605B5B",
    fontSize: 15,
  },
  span: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
});
