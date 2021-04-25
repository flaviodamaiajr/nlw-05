import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
// import { Container } from './styles';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

export const CardPrimary = ({ data, ...rest }: PlantProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} height={70} width={70} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "45%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.heading,
    marginVertical: 16,
  },
});