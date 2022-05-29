import { useState } from "react";
import { GridList, GridView, ListItem, Text, View } from "react-native-ui-lib";
import { Icon } from "../../../components/Icon";
import { ListView } from "../../../components/ListView";
import Layout from "../../../constants/Layout";

const { window } = Layout;

export function FeedbackList() {
  const [data, setData] = useState<>([]);

  return (
    <ListView
      data={}
      renderItem={(item, index) => (
        <View row marginV-8>
          <View center width={56} height={56} bg-green500 marginR-8 style={{ borderRadius: 1000 }}>
            <Text h2 white>
              {item.fullname
                .split(" ")
                .slice(0, 2)
                .map((word: string) => word[0].toUpperCase())
                .join("")}
            </Text>
          </View>

          <View>
            <View>
              <Text strong textSecondary>
                {item.fullname}
              </Text>
              <Text regular textPrimary>
                {item.content.find((content: any) => content.type == "feedback")?.message}
              </Text>
            </View>

            {(() => {
              const response: ResponseMessage | undefined = item.content.find(
                (content: any) => content.type == "response"
              );

              return (
                <View>
                  <Text strong textSecondary>
                    <Text green500>{response?.sender}</Text> phản hồi
                  </Text>
                  <Text regular textPrimary>
                    {response?.message}
                  </Text>
                </View>
              );
            })()}
          </View>
        </View>
      )}
      containerStyle={{
        "marginH-24": true,
        "marginT-16": true,
        "marginB-40": true,
      }}
    />
  );
}
