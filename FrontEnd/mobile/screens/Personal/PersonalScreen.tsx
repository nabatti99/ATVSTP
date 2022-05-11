import React from "react";
import { ScrollView } from "react-native";
import {
  View,
  Text,
  Colors,
  TouchableOpacity,
  Image,
  Typography,
  Assets,
  Button,
  Fader,
} from "react-native-ui-lib";
import KeyboardTrackingView from "react-native-ui-lib/lib/components/Keyboard/KeyboardTracking/KeyboardTrackingView";
import { TextField } from "react-native-ui-lib/src/incubator";

import { Icon } from "../../components/Icon";
import { PersonalStackScreenProps } from "../../navigation/types";

export default function PersonalScreen({ navigation }: PersonalStackScreenProps<"Personal">) {
  return (
    <View flex bg-bgPrimary>
      <ScrollView keyboardDismissMode="interactive" showsVerticalScrollIndicator={false}>
        <View marginH-24 marginT-16>
          <Text h1 textPrimary>
            Cá nhân
          </Text>
        </View>

        <TouchableOpacity
          row
          paddingH-24
          paddingV-8
          marginT-8
          activeOpacity={0.65}
          onPress={() => navigation.navigate("EmailModal")}
          bg-bgSecondary
        >
          <Icon name="mail" size={32} color={Colors.textPrimary} />
          <Text h2 textPrimary marginL-16>
            Chưa thiết lập
          </Text>
        </TouchableOpacity>

        <View row centerH marginT-32>
          <Image assetGroup="demo" assetName="feedback" aspectRatio={1.54} style={{ width: "80%" }} />
        </View>

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
          label="Hãy thiết lập email trước"
          marginH-24
          labelStyle={Typography.regular}
          marginT-16
          backgroundColor={Colors.green500}
          disabled
        />
      </ScrollView>

      <Fader position={Fader.position.BOTTOM} visible tintColor={Colors.bgPrimary} />
    </View>
  );
}
