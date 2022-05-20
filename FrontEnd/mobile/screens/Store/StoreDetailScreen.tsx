import React, { useEffect, useState } from "react";
import { View, Text, Card, Colors, Fader } from "react-native-ui-lib";
import { ScrollView } from "react-native";

import { StoresStackScreenProps } from "../../navigation/types";
import { BackButton } from "../../components/BackButton";
import { Icon } from "../../components/Icon";
import { Store } from "./types";
import useRequest from "../../hooks/useRequest";
import { AxiosResponse } from "axios";

type StoreRequest = {
  Status: "Success" | "Fail";
  Grocery: Store;
};

const HEADER_HEIGHT: number = 280;

export function StoreDetailScreen({ route, navigation }: StoresStackScreenProps<"StoreDetail">) {
  const { name } = route.params;

  const [grocery, setGrocery] = useState<Store>({
    name: "",
    address: "",
    certificate: [],
    image_url: "",
    owner: "",
    phone_number: "",
    status: "active",
    item: [],
    created_time: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const request = useRequest();
  useEffect(() => {
    setIsLoading(true);
    request.get<any, AxiosResponse<StoreRequest>>(`grocery/${name}`).then(({ data }) => {
      setGrocery(data.Grocery);
      setIsLoading(false);
    });
  }, []);

  const { address, certificate, image_url, owner, phone_number, status, item, created_time } = grocery!;

  return (
    <View flex bg-bgPrimary>
      {!isLoading && (
        <ScrollView>
          <Card borderRadius={0} enableShadow={false}>
            <Card.Section imageSource={{ uri: image_url }} imageStyle={{ width: "100%", height: HEADER_HEIGHT }} />
            <View absF paddingL-24 paddingT-16>
              <BackButton navigation={navigation} color={Colors.white} size={32} />
            </View>
          </Card>

          <View marginH-24 marginT-16>
            <View row bottom>
              <Icon name="home" size={48} />

              <View marginL-8>
                <Text h1 textSecondary>
                  {name}
                </Text>

                <View row centerV>
                  <View width={12} height={12} style={{ borderRadius: 100 }} bg-green500 marginT-3 marginR-4 />
                  <Text regular uppercase green500>
                    {status == "active" ? "Đang hoạt động" : "Không hoạt động"}
                  </Text>
                </View>
              </View>
            </View>

            <View marginT-16>
              <Text h2 textPrimary uppercase>
                THÔNG TIN LIÊN HỆ
              </Text>

              <View row centerV marginT-4>
                <Icon name="enviromento" color={Colors.green500} size={16} />
                <Text regular textPrimary green500 marginL-4 marginB-2>
                  {address}
                </Text>
              </View>

              <View row centerV marginT-4>
                <Icon name="phone" color={Colors.green500} size={16} />
                <Text regular textPrimary green500 marginL-4 marginB-2>
                  {phone_number} ({owner})
                </Text>
              </View>
            </View>

            <View marginT-16>
              <Text h2 textPrimary uppercase>
                MẶT HÀNG KINH DOANH
              </Text>

              <View row marginT-8>
                {item.map(({ name, is_allowed }) => (
                  <View
                    key={name}
                    paddingH-12
                    paddingV-4
                    bg-green100={is_allowed}
                    bg-red100={!is_allowed}
                    style={{ borderRadius: 100 }}
                    marginR-4
                  >
                    <Text strong green500={is_allowed} red500={!is_allowed}>
                      {name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View marginT-16>
              <Text h2 textPrimary uppercase>
                CHỨNG NHẬN ĐƯỢC CẤP
              </Text>

              {certificate.map(({ date, name }) => (
                <View key={name} row centerV marginT-4>
                  <Icon name="checksquare" color={Colors.green500} size={16} />
                  <Text regular textPrimary green500 marginL-4 marginB-2>
                    {name}
                  </Text>
                  <Text regular textPrimary marginL-4 marginB-2>
                    - Cấp vào:&nbsp;{new Date(date).toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>

            <View marginT-16 row>
              <Text strong textPrimary>
                Khảo sát lần cuối:&nbsp;
              </Text>
              <Text strong green500>
                {created_time}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
      <Fader position={Fader.position.BOTTOM} tintColor={Colors.gray50} />
    </View>
  );
}
