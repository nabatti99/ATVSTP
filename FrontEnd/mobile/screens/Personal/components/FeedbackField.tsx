import { AxiosInstance } from "axios";
import { Fragment, useContext } from "react";
import { Button, Colors, Typography, View } from "react-native-ui-lib";
import KeyboardTrackingView from "react-native-ui-lib/lib/components/Keyboard/KeyboardTracking/KeyboardTrackingView";
import { TextField } from "react-native-ui-lib/src/incubator";
import { Icon } from "../../../components/Icon";
import useRequest from "../../../hooks/useRequest";
import { personalContext } from "../context/PersonalContext";
import { PersonalContextData } from "../type";

export default function FeedbackField({}) {
  const {
    contextData: { email, fullname, phone_number },
  }: PersonalContextData = useContext<PersonalContextData>(personalContext)!;

  const request: AxiosInstance = useRequest();

  const handleFeedbackSubmitted = () => {};

  return (
    <Fragment>
      <View row centerH marginT-24>
        {Array.from(new Array(5)).map((_, index) => (
          <Icon
            key={index}
            name="staro"
            color={Colors.textPrimary}
            size={32}
            viewProps={{ "marginH-8": true }}
            isButton
            onPress={() => {}}
          />
        ))}
      </View>

      <KeyboardTrackingView>
        <TextField
          placeholder="123"
          hint="Bạn có muốn chia sẻ thêm về trải nghiệm..."
          multiline
          numberOfLines={5}
          textPrimary
          marginH-24
          marginT-16
          padding-16
          containerStyle={{
            borderColor: Colors.textPrimary,
            borderWidth: 1,
            borderRadius: 16,
          }}
          style={Typography.regular}
          floatingPlaceholderStyle={Typography.regular}
          textAlignVertical="top"
        />
      </KeyboardTrackingView>

      <Button
        label={email ? "Gửi phản hồi" : "Hãy thiết lập email trước"}
        marginH-24
        labelStyle={Typography.regular}
        marginT-16
        backgroundColor={Colors.green500}
        disabled={!email}
      />
    </Fragment>
  );
}
