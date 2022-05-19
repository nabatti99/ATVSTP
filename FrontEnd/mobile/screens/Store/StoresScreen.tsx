import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, GridList, TouchableOpacity, Fader, Colors } from "react-native-ui-lib";

import { Icon } from "../../components/Icon";
import Layout from "../../constants/Layout";
import useRequest from "../../hooks/useRequest";
import { StoresStackScreenProps } from "../../navigation/types";
import { Certificate, Store } from "./types";

const { window } = Layout;

export default function StoresScreen({ navigation }: StoresStackScreenProps<"Stores">) {
  const [groceries, setGroceries] = useState<Store[]>();
  const request: AxiosInstance = useRequest();

  useEffect(() => {
    request
      .get(`grocery`, {
        params: {
          offset: 0,
          limit: 9999,
          value: "",
        },
      })
      .then(({ data }) => {
        console.log(data);
        setGroceries(data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    // setGroceries([
    //   {
    //     name: "Cửa hàng nông sản Hải Hà",
    //     address: "402 Lê Đình Lý, Hải Châu, Đà Nẵng",
    //     owner: "Nguyễn Lê Anh Minh",
    //     phone_number: "0946672181",
    //     certificate: [
    //       {
    //         name: "ATVS1",
    //         date: new Date(),
    //       },
    //       {
    //         name: "FTP1",
    //         date: new Date(),
    //       },
    //     ],
    //   },
    //   {
    //     name: "Cửa hàng nông sản Han Soon Book",
    //     address: "402 Lê Đình Lý, Hải Châu, Đà Nẵng",
    //     owner: "Nguyễn Lê Anh Minh",
    //     phone_number: "0946672181",
    //     certificate: [
    //       {
    //         name: "ATVS1",
    //         date: new Date(),
    //       },
    //     ],
    //   },
    // ]);
  }, []);

  return (
    <View flex bg-bgPrimary paddingT-16>
      <View paddingH-24>
        <Text h1 textPrimary>
          Cửa hàng
        </Text>
      </View>

      <GridList
        data={groceries}
        numColumns={1}
        keyExtractor={(item) => item.name}
        style={{ marginTop: 16, paddingHorizontal: 24 }}
        containerWidth={window.width - 24 * 2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.push("StoreDetail", { name: item.name })}
            activeOpacity={0.6}
          >
            <View>
              <Image
                source={{ uri: item.image_url }}
                style={{ width: "100%", height: 258, borderRadius: 16, marginRight: 12 }}
              />

              <Text h1 textSecondary>
                {item.name}
              </Text>

              <View row centerV marginT-8>
                <Icon name="enviromento" size={14} />
                <Text regular textPrimary marginL-4>
                  {item.address}
                </Text>
              </View>

              <View row centerV marginT-2>
                <Icon name="phone" size={14} />
                <Text regular textPrimary marginL-4>
                  {`${item.owner} - ${item.phone_number}`}
                </Text>
              </View>

              <View row centerV marginT-2>
                <Icon name="checksquareo" size={14} />
                <View row marginL-4>
                  {item.certificate.map((certificate: Certificate) => (
                    <View
                      key={certificate.name}
                      paddingH-8
                      paddingV-2
                      bg-green100
                      style={{ borderRadius: 100 }}
                      marginR-4
                    >
                      <Text small green500>
                        {certificate.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <Fader position={Fader.position.BOTTOM} visible tintColor={Colors.bgPrimary} />
    </View>
  );
}
