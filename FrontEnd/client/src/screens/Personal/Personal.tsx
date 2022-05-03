import React, {Fragment} from 'react';
import {View, Text, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {observer, useLocalObservable} from 'mobx-react';
import {Icon} from '@app/components/icon';
import {useServices} from '@app/services';
import {EmailModal} from './Options/EmailModal';

type ModalsState = {
  email: boolean;

  show: <T extends ModalsStateKey>(what: T) => void;
  hide: <T extends ModalsStateKey>(what: T) => void;
};
type ModalsStateKey = keyof Omit<ModalsState, 'show' | 'hide'>;

export const Personal: React.FC = observer(() => {
  const {nav} = useServices();

  const modals: ModalsState = useLocalObservable(() => ({
    email: false,

    show<T extends ModalsStateKey>(what: T) {
      modals[what] = true;
    },
    hide<T extends ModalsStateKey>(what: T) {
      modals[what] = false;
    },
  }));

  return (
    <Fragment>
      <View flex bg-background>
        <View marginH-24 marginT-16>
          <Text h1 gray500>
            Cá nhân
          </Text>
        </View>

        <TouchableOpacity
          row
          paddingH-24
          paddingV-8
          marginT-8
          activeOpacity={0.65}
          onPress={() => modals.show('email')}
        >
          <Icon name="mail" size={32} color={Colors.gray500} />
          <Text h2 gray500 marginL-16>
            Chưa thiết lập
          </Text>
        </TouchableOpacity>
      </View>

      <EmailModal
        isVisible={modals.email}
        onDone={() => modals.hide('email')}
        onCancel={() => modals.hide('email')}
      />
    </Fragment>
  );
});
