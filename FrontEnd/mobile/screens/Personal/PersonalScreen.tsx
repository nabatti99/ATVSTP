import React from "react";
import { View, Text, Colors, TouchableOpacity } from "react-native-ui-lib";

import { Icon } from "../../components/Icon";
import { PersonalStackScreenProps } from "../../navigation/types";

export default function PersonalScreen({ navigation }: PersonalStackScreenProps<"Personal">) {
  return (
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
        onPress={() => navigation.navigate("EmailModal")}
      >
        <Icon name="mail" size={32} color={Colors.gray500} />
        <Text h2 gray500 marginL-16>
          Chưa thiết lập
        </Text>
      </TouchableOpacity>
    </View>
  );
}
