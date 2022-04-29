import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View, Text, MarginModifiers} from 'react-native-ui-lib';

type ButtonProps = MarginModifiers & {
  label?: string;
  onPress?: PureFunc;
};

export const BButton: React.FC<ButtonProps> = ({label, onPress, ...modifiers}: ButtonProps) => {
  return (
    <View {...modifiers}>
      <TouchableOpacity onPress={onPress}>
        <View center bg-primary padding-s4 br40>
          <Text text65M whitish>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
