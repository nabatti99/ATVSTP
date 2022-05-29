import React, { useContext, useState } from "react";
import { Modal, Colors, Text, View, Typography, Card, Button } from "react-native-ui-lib";
import { TextField } from "react-native-ui-lib/src/incubator";

import { Icon } from "../../../components/Icon";
import { PersonalStackScreenProps } from "../../../navigation/types";
import { personalContext } from "../context/PersonalContext";
import { PersonalContext, PersonalContextData } from "../type";

export function PersonalInfoModal({ navigation, route }: PersonalStackScreenProps<"EmailModal">) {
  const { contextData, setContextData }: PersonalContext = useContext<PersonalContext>(personalContext);

  const [email, setEmail] = useState<string | undefined>(contextData.email);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [fullname, setFullname] = useState<string>(contextData.fullname);
  const [phone_number, setPhone_number] = useState<string>(contextData.phone_number);

  const handleModalClosed = () => {
    navigation.goBack();
  };

  const handleModalSubmitted = () => {
    setContextData?.({
      ...contextData,
      email,
      fullname,
      phone_number,
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
              value={email}
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
              value={fullname}
              floatingPlaceholder
              onChangeText={setFullname}
              style={Typography.regular}
              floatingPlaceholderStyle={Typography.regular}
              validationMessageStyle={Typography.small}
              enableErrors
            />
          </View>
          <Icon name="user" size={32} color={Colors.gray700} />
        </View>

        <View row centerV>
          <View flex>
            <TextField
              placeholder="Số điện thoại"
              value={phone_number}
              floatingPlaceholder
              onChangeText={setPhone_number}
              style={Typography.regular}
              floatingPlaceholderStyle={Typography.regular}
              validationMessageStyle={Typography.small}
              enableErrors
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
