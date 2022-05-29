import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { View, Text, Colors, TouchableOpacity, Image, Fader } from "react-native-ui-lib";

import { Icon } from "../../components/Icon";
import { PersonalStackScreenProps } from "../../navigation/types";
import FeedbackField from "./components/FeedbackField";
import { FeedbackList } from "./components/FeedbackList";
import { personalContext } from "./context/PersonalContext";
import { PersonalContext } from "./type";

export default function PersonalScreen({ navigation, route }: PersonalStackScreenProps<"Personal">) {
  const {
    contextData: { email },
  }: PersonalContext = useContext<PersonalContext>(personalContext)!;

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
            {email || "Chưa thiết lập"}
          </Text>
        </TouchableOpacity>

        <View row centerH marginT-32>
          <Image assetGroup="demo" assetName="feedback" aspectRatio={1.54} style={{ width: "80%" }} />
        </View>

        <FeedbackField />

        <FeedbackList />
      </ScrollView>

      <Fader position={Fader.position.BOTTOM} visible tintColor={Colors.bgPrimary} />
    </View>
  );
}
