import React, { useState } from "react";
import { connect } from "react-redux";
import { Icon } from "@ui-kitten/components";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { Container } from "./../commons";
import { BLOOD_TYPES } from "./../utils/dummy";
import { selectUserID } from "./../store/auth";
import { CardCover } from "./HomeScreen/CardCover";
import { selectPostLists } from "./../store/posts";
import { SelectGroup, Field, TCustomText } from "./../components";
import { getSearchLocationList, getSearchBloodList } from "./../utils";

const mapStateToProps = (state) => ({
  posts: selectPostLists(state),
  userID: selectUserID(state),
});

export const FindScreen = connect(mapStateToProps)(
  ({ posts, navigation, userID }) => {
    const [status, setStatus] = useState(false);
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");

    const reset = () => {
      setStatus(false);
      setBloodType("");
      setList([]);
    };

    return (
      <Container>
        <Field
          value={search}
          placeholder="search_by_location"
          accessoryRight={() => (
            <Icon
              name="md-search"
              pack="ion"
              style={styles.icon}
              onPress={() => {
                setList(getSearchLocationList(posts, search));
                setStatus(true);
              }}
            />
          )}
          onChangeText={(val) => setSearch(val)}
        />
        <SelectGroup
          options={BLOOD_TYPES}
          initial="search_by_blood_type"
          onChangeOption={(val) => {
            setList(getSearchBloodList(posts, val));
            setStatus(true);
          }}
        />
        {status && (
          <View style={styles.list}>
            <TouchableOpacity onPress={reset}>
              <TCustomText style={styles.reset}>reset</TCustomText>
            </TouchableOpacity>
            {list.map((item) => (
              <CardCover
                key={item.id.toString()}
                item={item}
                navigation={navigation}
                userID={userID}
              />
            ))}
          </View>
        )}
      </Container>
    );
  }
);

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    marginBottom: 100,
    zIndex: -2,
    alignItems: "center",
  },
  icon: {
    height: 20,
    color: "#8f9bb3",
    marginRight: 10,
  },
  reset: {
    marginBottom: 15,
    color: "#ff6767",
  },
});
