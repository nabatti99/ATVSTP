import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';

import {News} from './News';
import {Personal} from './Personal';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import {screenDefaultOptions, tabBarDefaultOptions} from '../services/navigation/options';

// Describe your screens here
export type Tabs = 'Stores' | 'News' | 'Personal';
export type Modal = 'ExampleModal';
export type Screen = 'Stores' | 'News' | 'Personal' | 'Feedback';

export type ModalProps = {
  ExampleModal: undefined;
};
export type ScreenProps = {
  Main: undefined;
  Example: ExampleScreenProps;
  Personal: undefined;
} & ModalProps;

// Screens
const screens: ScreenLayouts = {
  Stores: {
    name: 'Cửa hàng uy tín',
    component: News,
    options: () => ({
      title: 'Cửa Hàng',
      ...screenDefaultOptions(),
    }),
  },
  News: {
    name: 'Tin tức mới cập nhật',
    component: News,
    options: () => ({
      title: 'Tin Tức',
      ...screenDefaultOptions(),
    }),
  },
  Personal: {
    name: 'Cá nhân và cài đặt',
    component: Personal,
    options: () => ({
      title: 'Phản hồi',
      ...screenDefaultOptions(),
    }),
  },
  Feedback: {
    name: 'Phản hồi người dùng',
    component: News,
    options: () => ({
      title: 'Phản hồi',
      ...screenDefaultOptions(),
    }),
  },
};
const StoresStack = () => genStackNavigator([screens.Stores]);
const HomeStack = () => genStackNavigator([screens.News]);
const SettingsStack = () => genStackNavigator([screens.Personal, screens.Feedback]);

// Tabs
const tabs: TabScreenLayouts = {
  Stores: {
    name: 'Stores',
    component: StoresStack,
    options: () => ({
      title: 'Cửa Hàng',
      ...tabBarDefaultOptions('appstore-o', 'appstore1'),
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
  Personal: {
    name: 'Personal',
    component: SettingsStack,
    options: () => ({
      title: 'Cá nhân',
      ...tabBarDefaultOptions('smileo', 'smile-circle'),
    }),
  },
};
const TabNavigator = () => genTabNavigator([tabs.Stores, tabs.News, tabs.Personal], 'News');

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
