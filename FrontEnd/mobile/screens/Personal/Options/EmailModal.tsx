import React from "react";
import { Modal, Colors, Text, View, Typography, Card, Button } from "react-native-ui-lib";
import { TextField } from "react-native-ui-lib/src/incubator";

import { Icon } from "../../../components/Icon";
import { PersonalStackScreenProps } from "../../../navigation/types";

export function EmailModal({ navigation }: PersonalStackScreenProps<"EmailModal">) {
  return (
    <View flex bottom>
      <Card
        paddingH-24
        paddingB-24
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Modal.TopBar
          title="Thiết lập Email"
          onCancel={() => navigation.pop()}
          onDone={() => navigation.pop()}
          doneLabel={null}
          titleStyle={Typography.h2}
        />
        <View row centerV>
          <View flex>
            <TextField
              placeholder="Email của bạn"
              floatingPlaceholder
              validate={["email"]}
              validationMessage={["Email không hợp lệ"]}
            />
          </View>
          <Icon name="mail" size={32} color={Colors.gray700} />
        </View>
        <Button
          label="Hoàn thành"
          size={Button.sizes.medium}
          backgroundColor={Colors.green500}
          labelStyle={Typography.regular}
          marginT-8
        />
      </Card>
    </View>
  );
}
