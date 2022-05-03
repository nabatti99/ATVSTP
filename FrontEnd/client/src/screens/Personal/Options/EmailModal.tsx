import {Icon} from '@app/components/icon';
import React from 'react';
import {Modal, Colors, Text, View, Typography, Card} from 'react-native-ui-lib';

type EmailModalProps = {
  isVisible?: boolean;
  onCancel?: PureFunc;
  onDone?: PureFunc;
};

export const EmailModal: React.FC<EmailModalProps> = ({isVisible = true, onCancel, onDone}) => {
  return (
    <Modal
      visible={isVisible}
      overlayBackgroundColor={Colors.gray500 + 'A0'}
      onBackgroundPress={() => console.log(1231234)}
    >
      <View flex bottom>
        <Card paddingH-24>
          <Modal.TopBar
            title="Thiết lập Email"
            onCancel={onCancel}
            onDone={onDone}
            doneLabel="Xong"
            titleStyle={Typography.h2}
          />
          <View row centerV>
            <Icon name="mail" size={24} color={Colors.gray700} />
            <Text h2 gray700>
              Thiết lập Email
            </Text>
          </View>
        </Card>
      </View>
    </Modal>
  );
};
