import React from "react";
import { View, Text, Card, Colors, Fader } from "react-native-ui-lib";
import { ScrollView } from "react-native";

import Layout from "../../constants/Layout";
import { NewsStackScreenProps } from "../../navigation/types";
import { BackButton } from "../../components/BackButton";
import { Icon } from "../../components/Icon";

const { window } = Layout;
const HEADER_HEIGHT: number = 280;

export const NewsDetailScreen: React.FC<NewsStackScreenProps<"NewsDetail">> = ({ navigation }) => {
  return (
    <View flex bg-background>
      <Card borderRadius={0} enableShadow={false}>
        <Card.Section
          imageSource={{ uri: "https://picsum.photos/460/400" }}
          imageStyle={{ width: "100%", height: HEADER_HEIGHT }}
        />
        <Fader position={Fader.position.BOTTOM} size={HEADER_HEIGHT} tintColor={Colors.green700} />

        <View absF paddingH-24 paddingT-16 style={{ zIndex: 10 }}>
          <View flexG paddingH-32 bottom>
            <Text h1 white center>
              Tình hình giá bắp cải ở Đà Nẵng
            </Text>
          </View>

          <View row spread marginT-32 marginB-48>
            <View row>
              <Icon name="calendar" color={Colors.white} size={16} />
              <Text small white marginL-4>
                13/03/2022
              </Text>
            </View>
            <View row>
              <Icon name="calendar" color={Colors.white} size={16} />
              <Text small white marginL-4>
                13/03/2022
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <View absF>
        <ScrollView>
          <View style={{ minHeight: window.height - 100 }}>
            <View marginT-16 marginB-8 marginH-24>
              <BackButton navigation={navigation} color={Colors.white} size={32} />
            </View>
            <Card
              elevation={4}
              borderRadius={32}
              style={{
                shadowColor: Colors.gray700,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: Colors.gray50,
                marginTop: HEADER_HEIGHT - 32 - 16 - 32 - 8,
              }}
              paddingV-24
            >
              <Card.Section
                content={[
                  {
                    text: "Risus aliquam erat et sodales sit. Ut suspen disse curabitur porttitor ultrices amet. Lacus nibh posuere proin a.",
                    gray700: true,
                    strong: true,
                  },
                ]}
                paddingH-24
                marginB-16
              />
              <Card.Section
                content={[
                  {
                    text: "Odio placerat aenean rhoncus quisque ac nunc et dictum. Lorem egestas mauris metus, augue viverra ornare. A sit odio volutpat semper consequat enim iaculis eu. Lectus in facilisis blandit vitae. Viverra dignissim sit aliquam dolor faucibus laoreet maecenas tortor a. Mattis cursus scelerisque nullam quis platea sed sed diam.",
                    gray700: true,
                    regular: true,
                  },
                ]}
                paddingH-24
                marginB-16
              />
              <Card.Section
                content={[
                  {
                    text: "Odio placerat aenean rhoncus quisque ac nunc et dictum. Lorem egestas mauris metus, augue viverra ornare. A sit odio volutpat semper consequat enim iaculis eu. Lectus in facilisis blandit vitae.",
                    gray700: true,
                    regular: true,
                  },
                ]}
                paddingH-24
                marginB-16
              />

              <Card.Section
                content={[
                  {
                    text: "Odio placerat aenean rhoncus quisque ac nunc et dictum. Lorem egestas mauris metus, augue viverra ornare. A sit odio volutpat semper consequat enim iaculis eu. Lectus in facilisis blandit vitae. Odio placerat aenean rhoncus quisque ac nunc et dictum. Lorem egestas mauris metus, augue viverra ornare. A sit odio volutpat semper consequat enim iaculis eu. Lectus in facilisis blandit vitae. Viverra dignissim sit aliquam dolor faucibus laoreet maecenas tortor a. Mattis cursus scelerisque nullam quis platea sed sed diam. Odio placerat aenean rhoncus quisque ac nunc et dictum. Lorem egestas mauris metus, augue viverra ornare. A sit odio volutpat semper consequat enim iaculis eu. Lectus in facilisis blandit vitae. Viverra dignissim sit aliquam dolor faucibus laoreet maecenas tortor a. Mattis cursus scelerisque nullam quis platea sed sed diam. Odio placerat aenean rhoncus quisque ac nunc et dictum. Lorem egestas mauris metus, augue viverra ornare. A sit odio volutpat semper consequat enim iaculis eu. Lectus in facilisis blandit vitae. Viverra dignissim sit aliquam dolor faucibus laoreet maecenas tortor a. Mattis cursus scelerisque nullam quis platea sed sed diam. Odio placerat aenean rhoncus quisque ac nunc et dictum. Lorem egestas mauris metus, augue viverra ornare. A sit odio volutpat semper consequat enim iaculis eu. Lectus in facilisis blandit vitae. Viverra dignissim sit aliquam dolor faucibus laoreet maecenas tortor a. Mattis cursus scelerisque nullam quis platea sed sed diam. Odio placerat aenean rhoncus quisque ac nunc et dictum. Lorem egestas mauris metus, augue viverra ornare. A sit odio volutpat semper consequat enim iaculis eu. Lectus in facilisis blandit vitae. Viverra dignissim sit aliquam dolor faucibus laoreet maecenas tortor a. Mattis cursus scelerisque nullam quis platea sed sed diam. Odio placerat aenean rhoncus quisque ac nunc et dictum. Lorem egestas mauris metus, augue viverra ornare. A sit odio volutpat semper consequat enim iaculis eu. Lectus in facilisis blandit vitae. Viverra dignissim sit aliquam dolor faucibus laoreet maecenas tortor a. Mattis cursus scelerisque nullam quis platea sed sed diam.",
                    gray700: true,
                    regular: true,
                  },
                ]}
                paddingH-24
                marginB-16
              />
            </Card>
          </View>
        </ScrollView>
        <Fader position={Fader.position.BOTTOM} tintColor={Colors.gray50} />
      </View>
    </View>
  );
};
