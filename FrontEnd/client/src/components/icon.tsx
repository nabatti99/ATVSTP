import React, {useMemo} from 'react';
import {View, Colors, ViewProps} from 'react-native-ui-lib';
import {AntDesign} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  isButton?: boolean;
  viewProps?: ViewProps;
  onPress?: PureFunc;
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
    [viewProps, name, size, color],
  );

  return isButton ? (
    <TouchableOpacity onPress={onPress} disabled={!!!onPress} activeOpacity={0.65}>
      {Icon}
    </TouchableOpacity>
  ) : (
    Icon
  );
};
