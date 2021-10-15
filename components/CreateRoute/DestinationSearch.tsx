import React from "react";
import {View, Button, Text, TouchableOpacity, StyleSheet} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import ColorPalette from "../../constants/ColorPalette";
import "react-native-get-random-values";
import {PhysicalLocation} from "../../types";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import {max_waypoints as MAX_WAYPOINTS} from "../../configuration.json";

interface destinationInputProps {
  id?: string;
  dragCallback?: any;
  updateCallback: Function;
  deleteCallback: Function;
  navigation: any;
  waypoint: WaypointWithAmount;
  index: number;
}
const letters = ["A", "B", "C", "D", "E"];

const DestinationInput = ({
  dragCallback,
  id,
  navigation,
  updateCallback,
  deleteCallback,
  waypoint,
  index,
}: destinationInputProps) => {
  console.log(waypoint);

  return (
    <View style={styles.destinationInputContainer}>
      {waypoint.amountOfWaypoints > 1 ? (
        <Text style={styles.destinationInputLabel}>{letters[index]}:</Text>
      ) : null}
      <View
        style={[
          waypoint.amountOfWaypoints > 1
            ? styles.destinationInputWrapperSmall
            : styles.destinationInputWrapperFull,
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("location_search", {
              inputId: id,
              updateCallback: updateCallback,
            });
          }}>
          <View style={styles.destinationInput}>
            <Text style={{width: "100%"}}>
              {waypoint.point ? waypoint.point.title : "Search"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {waypoint.amountOfWaypoints > 1 ? (
        <>
          <TouchableOpacity
            onLongPress={dragCallback}
            style={styles.dragWrapper}>
            <Text>☰</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteCallback(waypoint.id);
            }}
            style={styles.deleteWrapper}>
            <Text>✖</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

interface DestinationSearchProps {
  navigation: any;
  waypointUpdateCallback: Function;
  waypointDeleteCallback: Function;
  waypoints: Waypoint[];
}

interface WaypointWithAmount extends Waypoint {
  amountOfWaypoints: number;
}

export const DestinationSearch = ({
  navigation,
  waypointUpdateCallback,
  waypoints,
  waypointDeleteCallback,
}: DestinationSearchProps) => {
  const updateSingleValue = (inputId: string, newValue: PhysicalLocation) => {
    // update the value of a marker e.g. marker a is now tescos, not lidl
    console.log(inputId);
    let waypointCopy = [...waypoints];
    // loop through and find the object with the right key then add the changes
    for (let i = 0; i < waypointCopy.length; i++) {
      if (waypointCopy[i].id === inputId) {
        waypointCopy[i].point = newValue;
        waypointUpdateCallback(waypointCopy);
        return; // break the loop as the object has been found
      }
    }
  };

  const renderItem = ({
    item,
    index,
    drag,
    isActive,
  }: RenderItemParams<WaypointWithAmount>) => {
    return (
      <DestinationInput
        waypoint={item}
        index={index as number}
        updateCallback={updateSingleValue}
        deleteCallback={waypointDeleteCallback}
        id={item.id}
        dragCallback={drag}
        navigation={navigation}
      />
    );
  };

  const addDestination = () => {
    waypointUpdateCallback([...waypoints, {id: uuidv4(), point: null}]);
  };

  let waypointsWithAmounts = [] as WaypointWithAmount[]; // required to pass amount of way points to destination input
  waypoints.forEach(waypoint => {
    waypointsWithAmounts.push({
      ...waypoint,
      amountOfWaypoints: waypoints.length,
    });
  });

  return (
    // set preferable heights in second view
    <View>
      <View style={styles.dragBox}>
        <DraggableFlatList
          data={waypointsWithAmounts as WaypointWithAmount[]}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
          onDragEnd={({data}) => {
            console.log("THIS IS THE DATA", data);
            waypointUpdateCallback(data);
          }}
        />
      </View>
      <Button
        title={"Add"}
        color={ColorPalette.mainBlue}
        disabled={waypoints.length >= MAX_WAYPOINTS}
        onPress={addDestination}></Button>
    </View>
  );
};

export default DestinationSearch;

const styles = StyleSheet.create({
  dragBox: {
    flexDirection: "row",
    minHeight: 50,
    maxHeight: 150,
    paddingTop: 10,
  },
  destinationInputContainer: {
    width: "95%",
    height: 45,
    marginBottom: 10,
    marginLeft: "2.5%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  destinationInputWrapperSmall: {
    width: "75%",
  },
  destinationInputWrapperFull: {
    width: "95%",
  },
  destinationInput: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    paddingTop: 0,
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: ColorPalette.white,
  },
  destinationInputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
  },
  dragWrapper: {},
  deleteWrapper: {},
});
