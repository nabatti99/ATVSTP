import { View, ViewProps } from "react-native-ui-lib";

type ListViewItem = Record<string, any> & {
  key: string | number;
};

type ListViewProps = {
  data: ListViewItem[];
  renderItem: (item: ListViewItem, index: number) => JSX.Element;
  containerStyle?: ViewProps;
  itemStyle?: ViewProps;
};

export function ListView({ data, renderItem, containerStyle, itemStyle }: ListViewProps) {
  return (
    <View {...containerStyle}>
      {data.map((item, index) => (
        <View key={item.key} {...itemStyle}>
          {renderItem(item, index)}
        </View>
      ))}
    </View>
  );
}
