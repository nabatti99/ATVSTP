import React from "react";
import { View, Text, Card, Colors, Fader } from "react-native-ui-lib";
import { ScrollView } from "react-native";

import Layout from "../../constants/Layout";
import { StoresStackScreenProps } from "../../navigation/types";
import { BackButton } from "../../components/BackButton";
import { Icon } from "../../components/Icon";

const { window } = Layout;
const HEADER_HEIGHT: number = 280;

export function StoreDetailScreen({ route, navigation }: StoresStackScreenProps<"StoreDetail">) {
  return (
    <View flex bg-bgPrimary>
      <ScrollView>
        <Card borderRadius={0} enableShadow={false}>
          <Card.Section
            imageSource={{ uri: "https://picsum.photos/460/400" }}
            imageStyle={{ width: "100%", height: HEADER_HEIGHT }}
          />
          <View absF paddingL-24 paddingT-16>
            <BackButton navigation={navigation} color={Colors.white} size={32} />
          </View>
        </Card>

        <View marginH-24 marginT-16>
          <View row bottom>
            <Icon name="home" size={48} />

            <View marginL-8>
              <Text h1 textSecondary>
                CH rau củ Hải Hoà
              </Text>

              <View row centerV>
                <View width={12} height={12} style={{ borderRadius: 100 }} bg-green500 marginT-3 marginR-4 />
                <Text regular uppercase green500>
                  Đang hoạt động
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
                105 Điện Biên Phủ, Hải Châu, Đà Nẵng
              </Text>
            </View>

            <View row centerV marginT-4>
              <Icon name="phone" color={Colors.green500} size={16} />
              <Text regular textPrimary green500 marginL-4 marginB-2>
                067219461 (Lê Quang Vinh)
              </Text>
            </View>
          </View>

          <View marginT-16>
            <Text h2 textPrimary uppercase>
              MẶT HÀNG KINH DOANH
            </Text>

            <View row marginT-8>
              <View paddingH-12 paddingV-4 bg-green100 style={{ borderRadius: 100 }} marginR-4>
                <Text strong green500>
                  Rau củ
                </Text>
              </View>
            </View>
          </View>

          <View marginT-16>
            <Text h2 textPrimary uppercase>
              CHỨNG NHẬN ĐƯỢC CẤP
            </Text>

            <View row centerV marginT-4>
              <Icon name="checksquare" color={Colors.green500} size={16} />
              <Text regular textPrimary green500 marginL-4 marginB-2>
                ATVS 1
              </Text>
              <Text regular textPrimary marginL-4 marginB-2>
                - Cấp vào ngày 30/04/2022
              </Text>
            </View>

            <View row centerV marginT-4>
              <Icon name="checksquare" color={Colors.green500} size={16} />
              <Text regular textPrimary green500 marginL-4 marginB-2>
                ATVS 1
              </Text>
              <Text regular textPrimary marginL-4 marginB-2>
                - Cấp vào ngày 30/04/2022
              </Text>
            </View>
          </View>

          <View marginT-16 row>
            <Text strong textPrimary>
              Khảo sát lần cuối:&nbsp;
            </Text>
            <Text strong green500>
              03/03/2022
            </Text>
          </View>
        </View>
      </ScrollView>
      <Fader position={Fader.position.BOTTOM} tintColor={Colors.gray50} />
    </View>
  );
}
