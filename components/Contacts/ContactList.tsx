import React, {FC} from "react";
import {FlatList} from "react-native";
import {EC} from "../../types";
import {ContactListElement} from "./ContactListElement";

interface allContactProps {
  contacts: EC[];
  removeContactCallback: CallableFunction;
}

export const ContactsList: FC<allContactProps> = (props): JSX.Element => {
  // list of contacts
  return (
    <FlatList
      data={props.contacts}
      renderItem={({item}) => (
        <ContactListElement
          contact={item}
          removeContactCallback={props.removeContactCallback}
        />
      )}
      keyExtractor={item => item.ECID}
    />
  );
};

export default ContactsList;
