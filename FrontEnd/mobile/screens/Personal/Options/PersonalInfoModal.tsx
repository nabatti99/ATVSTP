import React, { useContext, useState } from "react";
import { Modal, Colors, Text, View, Typography, Card, Button } from "react-native-ui-lib";
import { TextField } from "react-native-ui-lib/src/incubator";

import { Icon } from "../../../components/Icon";
import { PersonalStackScreenProps } from "../../../navigation/types";
import { personalContext } from "../context/PersonalContext";
import { PersonalContextData } from "../type";

export function PersonalInfoModal({ navigation, route }: PersonalStackScreenProps<"EmailModal">) {
  const [email, setEmail] = useState<string | undefined>();
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [fullname, setFullname] = useState<string | undefined>();
  const [phone_number, setPhone_number] = useState<string | undefined>();

  const handleModalClosed = () => {
    navigation.goBack();
  };

  const { contextData, setContextData }: PersonalContextData = useContext<PersonalContextData>(personalContext)!;
  const handleModalSubmitted = () => {
    setContextData?.({
      email,
      fullname: fullname || contextData.fullname,
      phone_number: phone_number || contextData.phone_number,
    });
    handleModalClosed();
  };

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
        <Modal.TopBar title="Thông tin cá nhân" onCancel={handleModalClosed} titleStyle={Typography.h2} />

        <View row centerV>
          <View flex>
            <TextField
              placeholder="Email của bạn"
              floatingPlaceholder
              enableErrors
              validateOnChange
              validate={["email"]}
              validationMessage={["Email không hợp lệ"]}
              onChangeValidity={setIsEmailValid}
              onChangeText={setEmail}
              style={Typography.regular}
              floatingPlaceholderStyle={Typography.regular}
              validationMessageStyle={Typography.small}
            />
          </View>
          <Icon name="mail" size={32} color={Colors.gray700} />
        </View>

        <View row centerV>
          <View flex>
            <TextField
              placeholder="Họ và tên"
              floatingPlaceholder
              onChangeText={setFullname}
              style={Typography.regular}
              floatingPlaceholderStyle={Typography.regular}
              validationMessageStyle={Typography.small}
            />
          </View>
          <Icon name="user" size={32} color={Colors.gray700} />
        </View>

        <View row centerV>
          <View flex>
            <TextField
              placeholder="Số điện thoại"
              floatingPlaceholder
              onChangeText={setPhone_number}
              style={Typography.regular}
              floatingPlaceholderStyle={Typography.regular}
              validationMessageStyle={Typography.small}
            />
          </View>
          <Icon name="phone" size={32} color={Colors.gray700} />
        </View>

        <Button
          label="Hoàn thành"
          size={Button.sizes.medium}
          backgroundColor={Colors.green500}
          labelStyle={Typography.regular}
          marginT-8
          disabled={!isEmailValid}
          onPress={handleModalSubmitted}
        />
      </Card>
    </View>
  );
}
