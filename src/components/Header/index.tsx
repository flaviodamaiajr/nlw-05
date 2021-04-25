import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import colors from "../../styles/colors";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import userImage from "../../assets/eu.jpeg";
import fonts from "../../styles/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Header() {
  const [username, setUsername] = useState<string>("");

  async function getUsername() {
    const user = await AsyncStorage.getItem("@plantmanager:user");
    setUsername(user || "");
  }

  useEffect(() => {
    getUsername();
  }, [username]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{username}</Text>
      </View>
      <Image source={userImage} style={styles.profile}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 36,
  },
  profile: {
    width: 70,
    height: 70,
    borderRadius: 80,
  },
});
