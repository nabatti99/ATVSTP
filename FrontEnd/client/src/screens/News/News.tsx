import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Card,
  Assets,
  Image,
  GridList,
  TouchableOpacity,
  ListItem,
} from 'react-native-ui-lib';
import {Dimensions, ScaledSize} from 'react-native';
import {observer} from 'mobx-react';

import {useServices} from '../../services';
import {useStores} from '../../stores';
import {Icon} from '@app/components/icon';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {width: windowWidth, height: windowHeight}: ScaledSize = Dimensions.get('screen');

export const News: React.FC = observer(({}) => {
  const {nav, translate, api} = useServices();
  const {counter, ui} = useStores();

  const [news, setNews] = useState<News[]>();

  useEffect(() => {
    setNews([
      {
        title: 'Có nhiều cửa hàng được cấp chứng nhận asdas as as as asd ...',
        date: new Date(),
        authors: ['Minh', 'Thịnh'],
      },
      {
        title: 'Có nhiều cửa hàng được cấp chứng nhận 2 ...',
        date: new Date(),
        authors: ['Minh', 'Thịnh'],
      },
    ]);
  }, []);

  return (
    <View flex bg-background paddingH-24 paddingT-16>
      <View row centerV>
        <View width={20} height={20} style={{borderRadius: 100}} bg-green500 marginT-6 marginR-8 />
        <Text h1 green500>
          Tin tức
        </Text>
      </View>

      <Card enableShadow elevation={8} style={{shadowColor: '#00000022'}} marginT-16>
        <Card.Section
          imageSource={{uri: 'https://picsum.photos/400/200'}}
          imageStyle={{width: '100%', height: 200}}
        />
        <View margin-12>
          <Text strong gray700>
            Tình hình giá bắp cải ở Đà Nẵng
          </Text>

          <View row marginT-4 spread>
            <View row centerV>
              <Icon name="calendar" size={14} />
              <Text small gray500 marginL-4>
                13/03/2022
              </Text>
            </View>

            <View row centerV>
              <Icon name="edit" size={14} />
              <Text small gray500 marginL-4>
                Thịnh, Huyền
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <GridList
        data={news}
        numColumns={1}
        keyExtractor={item => item.title}
        style={{marginTop: 24}}
        containerWidth={windowWidth - 24 * 2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ListItem
            onPress={() => nav.push('NewsDetail')}
            style={{height: 108}}
            activeOpacity={0.6}
          >
            <ListItem.Part left>
              <Image
                source={{uri: 'https://picsum.photos/200'}}
                style={{width: 120, height: 108, borderRadius: 16, marginRight: 12}}
              />
            </ListItem.Part>
            <ListItem.Part middle column>
              <Text strong gray700>
                {item.title}
              </Text>

              <View row centerV marginT-12>
                <Icon name="calendar" size={14} />
                <Text small gray500 marginL-4>
                  13/03/2022
                </Text>
              </View>

              <View row centerV marginT-4>
                <Icon name="edit" size={14} />
                <Text small gray500 marginL-4>
                  Thịnh, Huyền
                </Text>
              </View>
            </ListItem.Part>
          </ListItem>
        )}
      />
    </View>
  );
});
