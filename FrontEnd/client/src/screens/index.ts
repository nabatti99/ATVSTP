import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';

import {Main} from './main';
import {Settings} from './settings';
import {Example} from './screen-sample';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import {screenDefaultOptions, tabBarDefaultOptions} from '../services/navigation/options';

// Describe your screens here
export type Tabs = 'Stores' | 'News' | 'Settings';
export type Modal = 'ExampleModal';
export type Screen = 'Stores' | 'News' | 'Settings' | 'Feedback';

export type ModalProps = {
  ExampleModal: undefined;
};
export type ScreenProps = {
  Main: undefined;
  Example: ExampleScreenProps;
  Settings: undefined;
} & ModalProps;

// Screens
const screens: ScreenLayouts = {
  Stores: {
    name: 'Cửa hàng uy tín',
    component: Main,
    options: () => ({
      title: 'Cửa Hàng',
      ...screenDefaultOptions(),
    }),
  },
  News: {
    name: 'Tin tức mới cập nhật',
    component: Example,
    options: () => ({
      title: 'Tin Tức',
      ...screenDefaultOptions(),
    }),
  },
  Settings: {
    name: 'Cài đặt ứng dụng',
    component: Settings,
    options: () => ({
      title: 'Phản hồi',
      ...screenDefaultOptions(),
    }),
  },
  Feedback: {
    name: 'Phản hồi người dùng',
    component: Main,
    options: () => ({
      title: 'Phản hồi',
      ...screenDefaultOptions(),
    }),
  },
};
const StoresStack = () => genStackNavigator([screens.Stores]);
const HomeStack = () => genStackNavigator([screens.News]);
const SettingsStack = () => genStackNavigator([screens.Settings, screens.Feedback]);

// Tabs
const tabs: TabScreenLayouts = {
  Stores: {
    name: 'Stores',
    component: StoresStack,
    options: () => ({
      title: 'Cửa Hàng',
      ...tabBarDefaultOptions('staro', 'star'),
    }),
  },
  News: {
    name: 'News',
    component: HomeStack,
    options: () => ({
      title: 'Tin Tức',
      ...tabBarDefaultOptions('check', 'checkcircle'),
    }),
  },
  Settings: {
    name: 'Settings',
    component: SettingsStack,
    options: () => ({
      title: 'Cài Đặt',
      ...tabBarDefaultOptions('appstore-o', 'appstore1'),
    }),
  },
};
const TabNavigator = () => genTabNavigator([tabs.Stores, tabs.News, tabs.Settings]);

// Modals
const modals: ModalScreenLayouts = {
  ExampleModal: {
    name: 'ExampleModal',
    component: HomeStack,
    options: () => ({
      title: 'ExampleModal',
    }),
  },
};

// Root Navigator
export const RootNavigator = (): JSX.Element =>
  genRootNavigator(TabNavigator, [modals.ExampleModal]);
