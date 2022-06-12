import { AxiosInstance, AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { View, Text, Colors, TouchableOpacity, Image, Fader } from "react-native-ui-lib";

import { Icon } from "../../components/Icon";
import useRequest from "../../hooks/useRequest";
import { PersonalStackScreenProps } from "../../navigation/types";
import FeedbackField from "./components/FeedbackField";
import { FeedbackList } from "./components/FeedbackList";
import { personalContext } from "./context/PersonalContext";
import { FeedbackData, PersonalContext } from "./type";

type FeedbackResponse = {
  Message: FeedbackData[];
  Status: "Success" | "Fail";
};

export default function PersonalScreen({ navigation, route }: PersonalStackScreenProps<"Personal">) {
  const {
    contextData: { email, lastUpdated },
  }: PersonalContext = useContext<PersonalContext>(personalContext)!;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<FeedbackData[]>();

  const request: AxiosInstance = useRequest();
  const getFeedbacks = () => {
    setIsLoading(true);
    request
      .get("feedback/read")
      .then(({ data: { Message } }: AxiosResponse<FeedbackResponse>) => setData(Message.reverse()))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => getFeedbacks(), [lastUpdated]);

  return (
    <View flex bg-bgPrimary>
      <ScrollView keyboardDismissMode="interactive" showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getFeedbacks} />}>
        <View marginH-24 marginT-16>
          <Text h1 textPrimary>
            Cá nhân
          </Text>
        </View>

        <TouchableOpacity row paddingH-24 paddingV-8 marginT-8 activeOpacity={0.65} onPress={() => navigation.navigate("EmailModal")} bg-bgSecondary>
          <Icon name="mail" size={32} color={Colors.textPrimary} />
          <Text h2 textPrimary marginL-16>
            {email || "Chưa thiết lập"}
          </Text>
        </TouchableOpacity>

        <View row centerH marginT-32>
          <Image assetGroup="demo" assetName="feedback" aspectRatio={1.54} style={{ width: "80%" }} />
        </View>

        <FeedbackField />

        <FeedbackList data={data} isLoading={isLoading} />
      </ScrollView>

      <Fader position={Fader.position.BOTTOM} visible tintColor={Colors.bgPrimary} />
    </View>
  );
}
