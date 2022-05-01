import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react';

type PickersState = {
  appearance: boolean;
  language: boolean;

  show: <T extends PickersStateKey>(what: T) => void;
  hide: <T extends PickersStateKey>(what: T) => void;
};
type PickersStateKey = keyof Omit<PickersState, 'show' | 'hide'>;

export const Personal: React.FC = observer(() => {
  return (
    <View flex bg-bgColor>
      <Text h1>Setting</Text>
    </View>
  );
});
