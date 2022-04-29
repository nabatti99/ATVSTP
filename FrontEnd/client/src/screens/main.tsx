import React, {useCallback, useEffect} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react';

import {useServices} from '../services';
import {useStores} from '../stores';

export const Main: React.FC = observer(({}) => {
  const {nav, translate, api} = useServices();
  const {counter, ui} = useStores();

  const start = useCallback(async () => {
    try {
      await api.counter.get();
    } catch (e) {
      Alert.alert('Error', 'There was a problem fetching data :(');
    }
  }, [api.counter]);

  useEffect(() => {
    start();
  }, []);

  return (
    <View flex bg-background>
      <Text h1 textColor>
        Home
      </Text>
      <ActivityIndicator />
    </View>
  );
});
