import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import Animated, {withSpring, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

import {TouchableOpacity} from 'react-native-gesture-handler';

type Reanimated2Props = {
  stID?: string;
};

export const Reanimated2: React.FC<Reanimated2Props> = ({stID}: Reanimated2Props) => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value * 250 - 100}],
  }));

  const moveObject = () => {
    offset.value = withSpring(Math.random());
  };

  return (
    <View padding-s1>
      <Animated.View style={[animatedStyles]}>
        <View center padding-s1>
          <TouchableOpacity onPress={moveObject}>
            <View center bg-primary padding-s8 br40>
              <Text text65M whitish>
                TouchableOpacity
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
