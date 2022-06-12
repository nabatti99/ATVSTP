import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { MarginModifiers, ViewProps, Colors } from "react-native-ui-lib";
import { Icon } from "./Icon";

type ButtonProps = MarginModifiers & {
  navigation: NativeStackNavigationProp<ParamListBase>;
  color?: string;
  size?: number;
  viewProps?: ViewProps;
};

export const BackButton: React.FC<ButtonProps> = ({
  navigation,
  color = Colors.textColor,
  size = 24,
  viewProps,
}: ButtonProps) => {
  const handleClicked = () => {
    console.log("Back");
    navigation.pop();
  };

  return (
    <Icon name="leftcircleo" size={size} color={color} isButton onPress={handleClicked} viewProps={viewProps} />
  );
};
