import { AxiosInstance, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { GridList, GridView, ListItem, SkeletonView, Text, View } from "react-native-ui-lib";
import { Icon } from "../../../components/Icon";
import { ListView } from "../../../components/ListView";
import Layout from "../../../constants/Layout";
import useRequest from "../../../hooks/useRequest";
import { FeedbackData } from "../type";

const { window } = Layout;

type FeedbackResponse = {
  Message: FeedbackData[];
  Status: "Success" | "Fail";
};

export function FeedbackList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<FeedbackData[]>([]);

  const request: AxiosInstance = useRequest();
  useEffect(() => {
    request
      .get("feedback/read")
      .then(({ data: { Message } }: AxiosResponse<FeedbackResponse>) => setData(Message))
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <ListView
      data={[{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }]}
      keyName="key"
      renderItem={(item, index) => (
        <View row marginV-8>
          <SkeletonView circle width={56} height={56} marginR-8 />

          <View>
            <View>
              <SkeletonView template={SkeletonView.templates.TEXT_CONTENT} times={1} />
            </View>
          </View>
        </View>
      )}
      containerStyle={{
        "marginH-24": true,
        "marginT-16": true,
        "marginB-40": true,
      }}
    />
  ) : (
    <ListView<FeedbackData>
      data={data}
      keyName="_id"
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
                {item.content[0].message}
              </Text>
            </View>

            {item.content[1] && (
              <View>
                <Text strong textSecondary>
                  <Text green500>{item.content[1]?.sender}</Text> phản hồi
                </Text>
                <Text regular textPrimary>
                  {item.content[1]?.message}
                </Text>
              </View>
            )}
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
