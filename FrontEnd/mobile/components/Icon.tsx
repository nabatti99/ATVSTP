import React, { useMemo } from "react";
import { View, Colors, ViewProps, TouchableOpacity } from "react-native-ui-lib";
import { AntDesign } from "@expo/vector-icons";

type IconProps = {
  name: React.ComponentProps<typeof AntDesign>["name"];
  size?: number;
  color?: string;
  isButton?: boolean;
  viewProps?: ViewProps;
  onPress?: () => void;
};

const ICON_SIZE = 26;

export const Icon: React.FC<IconProps> = ({
  name,
  size = ICON_SIZE,
  color = Colors.textColor,
  isButton = false,
  viewProps,
  onPress,
}: IconProps) => {
  const Icon = useMemo(
    () => (
      <View {...viewProps}>
        <AntDesign name={name} size={size} color={color} />
      </View>
    ),
    [viewProps, name, size, color]
  );

  return isButton ? (
    <TouchableOpacity onPress={onPress} disabled={!!!onPress} activeOpacity={0.65}>
      {Icon}
    </TouchableOpacity>
  ) : (
    Icon
  );
};
