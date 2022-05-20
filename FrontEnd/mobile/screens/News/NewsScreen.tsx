import React, { Fragment, useEffect, useState } from "react";
import { View, Text, Card, Image, GridList, ListItem, Colors, Fader, TouchableOpacity } from "react-native-ui-lib";

import Layout from "../../constants/Layout";
import { News } from "./types";
import { Icon } from "../../components/Icon";
import { NewsStackScreenProps } from "../../navigation/types";
import useRequest from "../../hooks/useRequest";
import { AxiosInstance } from "axios";

const { window } = Layout;

export default function NewsScreen({ navigation }: NewsStackScreenProps<"News">) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [news, setNews] = useState<News[]>([]);
  const request: AxiosInstance = useRequest();

  useEffect(() => {
    setIsLoading(true);
    request
      .get(`information/read`, {
        params: {
          offset: 0,
          limit: 9999,
          value: "",
        },
      })
      .then(({ data }) => {
        // console.log(data);
        setNews(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const firstNews: News = news[0];
  const oldNewsPreview = news.slice(1);
  console.log(firstNews);

  return (
    <View flex bg-bgPrimary paddingH-24 paddingT-16>
      <View row centerV>
        <View width={20} height={20} style={{ borderRadius: 100 }} bg-green500 marginT-6 marginR-8 />
        <Text h1 green500>
          Tin tức
        </Text>
      </View>

      {!isLoading && (
        <Fragment>
          <TouchableOpacity
            activeOpacity={0.65}
            onPress={() => navigation.navigate("NewsDetail", { _id: firstNews._id })}
          >
            <Card
              enableShadow
              elevation={8}
              style={{ shadowColor: Colors.bgSecondary }}
              marginT-16
              backgroundColor={Colors.bgSecondary}
            >
              <Card.Section
                imageSource={{ uri: firstNews.contents.find((content) => content.url)?.url }}
                imageStyle={{ width: "100%", height: 200 }}
              />
              <View margin-12>
                <Text strong textSecondary>
                  {firstNews.title}
                </Text>

                <View row marginT-4 spread>
                  <View row centerV>
                    <Icon name="calendar" size={14} />
                    <Text small textPrimary marginL-4>
                      {firstNews.update_at}
                    </Text>
                  </View>

                  <View row centerV>
                    <Icon name="edit" size={14} />
                    <Text small textPrimary marginL-4>
                      {firstNews.writer}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <GridList
            data={oldNewsPreview}
            numColumns={1}
            keyExtractor={(item) => item.title}
            style={{ marginTop: 24 }}
            containerWidth={window.width - 24 * 2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ListItem
                onPress={() => navigation.navigate("NewsDetail", { _id: item._id })}
                style={{ height: 108 }}
              >
                <ListItem.Part left>
                  <Image
                    source={{ uri: item.contents.find((content) => content.url)?.url }}
                    style={{ width: 120, height: 108, borderRadius: 16, marginRight: 12 }}
                  />
                </ListItem.Part>
                <ListItem.Part middle column>
                  <Text strong textSecondary>
                    {item.title}
                  </Text>

                  <View row centerV marginT-12>
                    <Icon name="calendar" size={14} />
                    <Text small textPrimary marginL-4>
                      {item.update_at}
                    </Text>
                  </View>

                  <View row centerV marginT-4>
                    <Icon name="edit" size={14} />
                    <Text small textPrimary marginL-4>
                      {item.writer}
                    </Text>
                  </View>
                </ListItem.Part>
              </ListItem>
            )}
          />
        </Fragment>
      )}

      <Fader position={Fader.position.BOTTOM} visible tintColor={Colors.bgPrimary} />
    </View>
  );
}
