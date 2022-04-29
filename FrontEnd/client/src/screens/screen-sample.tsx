import React from 'react';
import {Text, View} from 'react-native-ui-lib';
import {observer} from 'mobx-react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {ScreenProps} from '.';
import {useServices} from '../services';

type Props = NativeStackScreenProps<ScreenProps, 'Example'>;

export const Example: React.FC<Props> = observer(({}) => {
  const {nav, translate} = useServices();

  return (
    <View flex bg-bgColor>
      <Text h1>Sample Screen</Text>
    </View>
  );
});
