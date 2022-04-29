import React, {useMemo} from 'react';
import {View, Colors, ViewProps} from 'react-native-ui-lib';
import {FontAwesome} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  viewProps?: ViewProps;
  onPress?: PureFunc;
};

const ICON_SIZE = 26;

export const Icon: React.FC<IconProps> = ({
  name,
  size = ICON_SIZE,
  color = Colors.textColor,
  viewProps,
  onPress,
}: IconProps) => {
  const Icon = useMemo(
    () => (
      <View {...viewProps}>
        <FontAwesome name={name} size={size} color={color} />
      </View>
    ),
    [viewProps, name, size, color],
  );

  return (
    <TouchableOpacity onPress={onPress} disabled={!!!onPress}>
      {Icon}
    </TouchableOpacity>
  );
};
