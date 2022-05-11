/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import {
  NewsStackParamList,
  PersonalStackParamList,
  RootStackParamList,
  RootTabParamList,
  StoresStackParamList,
} from "./types";
import LinkingConfiguration from "./LinkingConfiguration";
import { Icon } from "../components/Icon";
import { EmailModal } from "../screens/Personal/Options/EmailModal";
import { Colors, Typography } from "react-native-ui-lib";
import StoresScreen from "../screens/Store/StoresScreen";
import NewsScreen from "../screens/News/NewsScreen";
import { NewsDetailScreen } from "../screens/News/NewsDetailScreen";
import PersonalScreen from "../screens/Personal/PersonalScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="NewsTab"
      screenOptions={{
        tabBarActiveTintColor: Colors.green500,
        headerShown: false,
        tabBarLabelStyle: {
          ...Typography.small,
        },
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: Colors.cardBg,
        },
      }}
    >
      <BottomTab.Screen
        name="StoresTab"
        component={StoresStackNavigator}
        options={{
          title: "Cửa Hàng",
          tabBarIcon: ({ color, focused, size }) => (
            <Icon name={focused ? "appstore1" : "appstore-o"} color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="NewsTab"
        component={NewsStackNavigator}
        options={{
          title: "Tin Tức",
          tabBarIcon: ({ color, focused, size }) => (
            <Icon name={focused ? "checkcircle" : "checkcircleo"} color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="PersonalTab"
        component={PersonalStackNavigator}
        options={{
          title: "Cá Nhân",
          tabBarIcon: ({ color, focused, size }) => (
            <Icon name={focused ? "smile-circle" : "smileo"} color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const stackNavigationOptions: NativeStackNavigationOptions = {
  contentStyle: {
    backgroundColor: Colors.bg,
  },
  headerShown: false,
};

/**
 * Store Stack Navigator
 */
const StoresStack = createNativeStackNavigator<StoresStackParamList>();

function StoresStackNavigator() {
  return (
    <StoresStack.Navigator screenOptions={stackNavigationOptions}>
      <StoresStack.Screen name="Stores" component={StoresScreen} />
    </StoresStack.Navigator>
  );
}

/**
 * News Stack Navigator
 */
const NewsStack = createNativeStackNavigator<NewsStackParamList>();

function NewsStackNavigator() {
  return (
    <NewsStack.Navigator screenOptions={stackNavigationOptions}>
      <NewsStack.Screen name="News" component={NewsScreen} />
      <NewsStack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </NewsStack.Navigator>
  );
}

/**
 * Personal Stack Navigator
 */
const PersonalStack = createNativeStackNavigator<PersonalStackParamList>();

function PersonalStackNavigator() {
  return (
    <PersonalStack.Navigator screenOptions={stackNavigationOptions}>
      <PersonalStack.Screen name="Personal" component={PersonalScreen} />
      <PersonalStack.Group
        screenOptions={{
          presentation: "transparentModal",
          contentStyle: { backgroundColor: Colors.gray500 + "A0" },
          animation: "fade",
        }}
      >
        <PersonalStack.Screen name="EmailModal" component={EmailModal} />
      </PersonalStack.Group>
    </PersonalStack.Navigator>
  );
}
