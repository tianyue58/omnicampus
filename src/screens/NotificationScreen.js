import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components";

import firebase from "firebase";
require("firebase/firestore");

import Text from "../components/Text";

export default function Notification(props) {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };
  return (
    <View>
      <Main>
        <TextInput1
          placeholder="Search your topic here..."
          onChangeText={(search) => fetchUsers(search)}
        />

        <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Profile", { uid: item.id })
              }
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </Main>
    </View>
  );
}

const TextInput1 = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 32px;
  text-align: center;
`;

const Main = styled.View`
  margin-top: 40px;
`;
