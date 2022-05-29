import { AxiosInstance } from "axios";
import { Fragment, useContext, useState } from "react";
import { Button, Colors, Typography, View, ToastPresets } from "react-native-ui-lib";
import KeyboardTrackingView from "react-native-ui-lib/lib/components/Keyboard/KeyboardTracking/KeyboardTrackingView";
import { TextField, Toast } from "react-native-ui-lib/src/incubator";
import { Icon } from "../../../components/Icon";
import useRequest from "../../../hooks/useRequest";
import { personalContext } from "../context/PersonalContext";
import { PersonalContextData } from "../type";

type ToastConfigProps = {
  visible: boolean;
  message: string;
  preset: ToastPresets;
};

const defaultToastConfig: ToastConfigProps = {
  visible: false,
  message: "",
  preset: ToastPresets.GENERAL,
};

export default function FeedbackField({}) {
  const {
    contextData: { email, fullname, phone_number },
  }: PersonalContextData = useContext<PersonalContextData>(personalContext)!;

  const [message, setMessage] = useState<string>("");
  const [isContentValid, setIsContentValid] = useState<boolean>(false);

  const [toastConfig, setToastConfig] = useState<ToastConfigProps>(defaultToastConfig);
  const handleToastDismissed = () => {
    setToastConfig(defaultToastConfig);
  };

  const request: AxiosInstance = useRequest();
  const handleFeedbackSubmitted = () => {
    request
      .post("feedback/created_from_people", {
        fullname,
        email,
        phone_number,
        content: [
          {
            type: "feedback",
            message,
          },
        ],
      })
      .then(({ data }) => {
        console.log(data);
        setToastConfig({
          visible: true,
          message: "Gửi phản hồi thành công",
          preset: ToastPresets.SUCCESS,
        });
      })
      .catch(({ data }) => {
        console.log(data);
        setToastConfig({
          visible: true,
          message: "Gửi phản hồi thất bại",
          preset: ToastPresets.FAILURE,
        });
      })
      .finally(() => {
        setMessage("");
      });
  };

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
          placeholder="Hãy chia sẻ về trải nghiệm của bạn..."
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
          onChangeText={setMessage}
          validate={["required"]}
          validateOnChange
          onChangeValidity={setIsContentValid}
        />
      </KeyboardTrackingView>

      <Button
        label={email ? "Gửi phản hồi" : "Hãy thiết lập email trước"}
        marginH-24
        labelStyle={Typography.regular}
        marginT-16
        backgroundColor={Colors.green500}
        disabled={!email || !isContentValid}
        onPress={handleFeedbackSubmitted}
      />

      <Toast
        visible={toastConfig.visible}
        position={"top"}
        autoDismiss={5000}
        onDismiss={handleToastDismissed}
        preset={toastConfig.preset}
        message={toastConfig.message}
        messageStyle={Typography.regular}
      />
    </Fragment>
  );
}
