/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

/**
 * Root Stack
 */
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

/**
 * Bottom Tab
 */
export type RootTabParamList = {
  StoresTab: NavigatorScreenParams<StoresStackParamList>;
  NewsTab: NavigatorScreenParams<NewsStackParamList>;
  PersonalTab: NavigatorScreenParams<PersonalStackParamList>;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

/**
 * Store Tab Stack
 */
export type StoresStackParamList = {
  Stores: undefined;
  StoreDetail: { name: string };
};

export type StoresStackScreenProps<Screen extends keyof StoresStackParamList> = NativeStackScreenProps<
  StoresStackParamList,
  Screen
>;

/**
 * New Stack
 */
export type NewsStackParamList = {
  News: undefined;
  NewsDetail: undefined;
};

export type NewsStackScreenProps<Screen extends keyof NewsStackParamList> = NativeStackScreenProps<
  NewsStackParamList,
  Screen
>;

/**
 * Personal Stack
 */
export type PersonalStackParamList = {
  Personal: undefined;
  EmailModal: undefined;
};

export type PersonalStackScreenProps<Screen extends keyof PersonalStackParamList> = NativeStackScreenProps<
  PersonalStackParamList,
  Screen
>;
