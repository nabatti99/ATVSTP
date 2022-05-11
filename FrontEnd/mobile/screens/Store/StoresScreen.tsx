import React, { useEffect, useState } from "react";
import { View, Text, Image, GridList, TouchableOpacity } from "react-native-ui-lib";

import { Icon } from "../../components/Icon";
import Layout from "../../constants/Layout";
import { Certificate, Store } from "./types";

const { window } = Layout;

export default function StoresScreen({}) {
  const [groceries, setGroceries] = useState<Store[]>();

  useEffect(() => {
    setGroceries([
      {
        name: "Cửa hàng nông sản Hải Hà",
        address: "402 Lê Đình Lý, Hải Châu, Đà Nẵng",
        owner: "Nguyễn Lê Anh Minh",
        phone_number: "0946672181",
        certificates: [
          {
            name: "ATVS1",
            date: new Date(),
          },
          {
            name: "FTP1",
            date: new Date(),
          },
        ],
      },
      {
        name: "Cửa hàng nông sản Han Soon Book",
        address: "402 Lê Đình Lý, Hải Châu, Đà Nẵng",
        owner: "Nguyễn Lê Anh Minh",
        phone_number: "0946672181",
        certificates: [
          {
            name: "ATVS1",
            date: new Date(),
          },
        ],
      },
    ]);
  }, []);

  return (
    <View flex bg-background paddingH-24 paddingT-16>
      <Text h1 gray500>
        Cửa hàng
      </Text>

      <GridList
        data={groceries}
        numColumns={1}
        keyExtractor={(item) => item.name}
        style={{ marginTop: 16 }}
        containerWidth={window.width - 24 * 2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
            <View>
              <Image
                source={{ uri: "https://picsum.photos/400" }}
                style={{ width: "100%", height: 258, borderRadius: 16, marginRight: 12 }}
              />

              <Text h1 gray700>
                {item.name}
              </Text>

              <View row centerV marginT-8>
                <Icon name="enviromento" size={14} />
                <Text regular gray500 marginL-4>
                  {item.address}
                </Text>
              </View>

              <View row centerV marginT-2>
                <Icon name="phone" size={14} />
                <Text regular gray500 marginL-4>
                  {`${item.owner} - ${item.phone_number}`}
                </Text>
              </View>

              <View row centerV marginT-2>
                <Icon name="checksquareo" size={14} />
                <View row marginL-4>
                  {item.certificates.map((certificate: Certificate) => (
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
    </View>
  );
}
