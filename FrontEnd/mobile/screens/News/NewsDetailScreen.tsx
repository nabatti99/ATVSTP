import React, { Fragment, useEffect, useState } from "react";
import { View, Text, Card, Colors, Fader } from "react-native-ui-lib";
import { ScrollView } from "react-native";

import Layout from "../../constants/Layout";
import { NewsStackScreenProps } from "../../navigation/types";
import { BackButton } from "../../components/BackButton";
import { Icon } from "../../components/Icon";
import useRequest from "../../hooks/useRequest";
import { News } from "./types";
import { AxiosResponse } from "axios";

const { window } = Layout;

const HEADER_HEIGHT: number = 280;

export function NewsDetailScreen({ navigation, route }: NewsStackScreenProps<"NewsDetail">) {
  const { _id } = route.params;

  const [news, setNews] = useState<News>({
    _id: "",
    contents: [],
    edit_by: "",
    title: "",
    writer: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const request = useRequest();

  useEffect(() => {
    setIsLoading(true);
    request.get<any, AxiosResponse<News>>(`information/read/${_id}`).then(({ data }) => {
      setNews(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <View flex bg-bgPrimary>
      <Card borderRadius={0} enableShadow={false}>
        <Card.Section
          imageSource={{ uri: news.contents.find((content) => content.url)?.url }}
          imageStyle={{ width: "100%", height: HEADER_HEIGHT }}
        />
        <Fader position={Fader.position.BOTTOM} size={HEADER_HEIGHT + 200} tintColor={Colors.green700} />

        <View absF paddingH-24 paddingT-16 style={{ zIndex: 10 }}>
          <View flexG paddingH-32 bottom>
            <Text h1 white center>
              {news.title}
            </Text>
          </View>

          <View row spread marginT-32 marginB-48>
            <View row>
              <Icon name="calendar" color={Colors.white} size={16} />
              <Text small white marginL-4>
                {news.update_at}
              </Text>
            </View>
            <View row>
              <Icon name="user" color={Colors.white} size={16} />
              <Text small white marginL-4>
                {news.writer}
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
                shadowColor: Colors.textSecondary,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                backgroundColor: Colors.gray50,
                marginTop: HEADER_HEIGHT - 32 - 16 - 32 - 8,
              }}
              paddingV-24
            >
              {news.contents.map((content) => (
                <View key={content.value || content.url} paddingH-24 marginB-16>
                  {content.type == "text" && (
                    <Card.Section
                      content={[
                        {
                          text: content.value,
                          textPrimary: true,
                          strong: true,
                        },
                      ]}
                    />
                  )}

                  {content.type == "header" && (
                    <Card.Section
                      content={[
                        {
                          text: content.value,
                          textSecondary: true,
                          h2: true,
                        },
                      ]}
                    />
                  )}

                  {content.type == "image" && (
                    <Fragment>
                      <Card.Section
                        imageSource={{ uri: content.url }}
                        imageStyle={{ width: "100%", minHeight: 200, resizeMode: "contain" }}
                      />
                      <Card.Section
                        content={[
                          {
                            text: content.caption,
                            textSecondary: true,
                            small: true,
                            center: true,
                          },
                        ]}
                      />
                    </Fragment>
                  )}
                </View>
              ))}
            </Card>
          </View>
        </ScrollView>
        <Fader position={Fader.position.BOTTOM} tintColor={Colors.gray50} />
      </View>
    </View>
  );
}
