import {useServices} from '@app/services';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, MarginModifiers, ViewProps, Colors} from 'react-native-ui-lib';
import {Icon} from './icon';

type ButtonProps = MarginModifiers & {
  color?: string;
  size?: number;
  viewProps?: ViewProps;
};

export const BackButton: React.FC<ButtonProps> = ({
  color = Colors.textColor,
  size = 24,
  viewProps,
}: ButtonProps) => {
  const {nav} = useServices();

  const handleClicked = () => {
    console.log('Back');
    nav.pop();
  };

  return (
    <Icon
      name="leftcircleo"
      size={size}
      color={color}
      isButton
      onPress={handleClicked}
      viewProps={viewProps}
    />
  );
};
