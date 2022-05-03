import {ModalScreenLayouts, ScreenLayouts, TabScreenLayouts} from '../services/navigation/types';

import {News} from './News/News';
import {Personal} from './Personal/Personal';
import {genRootNavigator, genStackNavigator, genTabNavigator} from '../services/navigation/help';
import {screenDefaultOptions, tabBarDefaultOptions} from '../services/navigation/options';
import {Stores} from './Store/Stores';
import {NewsDetail} from './News/NewsDetail';

// Describe your screens here
export type Tabs = 'Stores' | 'News' | 'Personal';
export type Modal = 'ExampleModal';
export type Screen = 'Stores' | 'News' | 'NewsDetail' | 'Personal' | 'Feedback';

export type ModalProps = {
  ExampleModal: undefined;
};
export type ScreenProps = {
  Stores: undefined;
  News: undefined;
  NewsDetail: undefined;
  Personal: undefined;
  Feedback: undefined;
} & ModalProps;

// Screens
const screens: ScreenLayouts = {
  Stores: {
    name: 'Stores',
    component: Stores,
    options: () => ({
      title: 'Cửa hàng uy tín',
      ...screenDefaultOptions(),
    }),
  },
  News: {
    name: 'News',
    component: News,
    options: () => ({
      title: 'Tin tức mới cập nhật',
      ...screenDefaultOptions(),
    }),
  },
  NewsDetail: {
    name: 'NewsDetail',
    component: NewsDetail,
    options: () => ({
      title: 'Tin tức chi tiết',
      ...screenDefaultOptions(),
    }),
  },
  Personal: {
    name: 'Personal',
    component: Personal,
    options: () => ({
      title: 'Cá nhân và cài đặt',
      ...screenDefaultOptions(),
    }),
  },
  Feedback: {
    name: 'Feedback',
    component: News,
    options: () => ({
      title: 'Phản hồi người dùng',
      ...screenDefaultOptions(),
    }),
  },
};
const StoresStack = () => genStackNavigator([screens.Stores]);
const NewsStack = () => genStackNavigator([screens.News, screens.NewsDetail]);
const SettingsStack = () => genStackNavigator([screens.Personal, screens.Feedback]);

// Tabs
const tabs: TabScreenLayouts = {
  Stores: {
    name: 'StoresTab',
    component: StoresStack,
    options: () => ({
      title: 'Cửa Hàng',
      ...tabBarDefaultOptions('appstore-o', 'appstore1'),
    }),
  },
  News: {
    name: 'NewsTab',
    component: NewsStack,
    options: () => ({
      title: 'Tin Tức',
      ...tabBarDefaultOptions('check', 'checkcircle'),
    }),
  },
  Personal: {
    name: 'PersonalTab',
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
    component: NewsStack,
    options: () => ({
      title: 'ExampleModal',
    }),
  },
};

// Root Navigator
export const RootNavigator = (): JSX.Element =>
  genRootNavigator(TabNavigator, [modals.ExampleModal]);
