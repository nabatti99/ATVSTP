import { View, ViewProps } from "react-native-ui-lib";

type ListViewProps<ListViewItem> = {
  data: ListViewItem[];
  renderItem: (item: ListViewItem, index: number) => JSX.Element;
  keyName: string;
  containerStyle?: ViewProps;
  itemStyle?: ViewProps;
};

export function ListView<ListViewItem extends Record<string, any>>({
  data,
  renderItem,
  keyName,
  containerStyle,
  itemStyle,
}: ListViewProps<ListViewItem>) {
  return (
    <View {...containerStyle}>
      {data.map((item, index) => (
        <View key={item[keyName]} {...itemStyle}>
          {renderItem(item, index)}
        </View>
      ))}
    </View>
  );
}
