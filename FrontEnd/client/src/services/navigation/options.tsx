import React from 'react';
import {Platform} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Colors, Typography} from 'react-native-ui-lib';

import {getHeaderBlurEffect} from '../../utils/systemDesign';
import {Icon} from '../../components/icon';

export const screenDefaultOptions = (): NativeStackNavigationOptions => ({
  headerShadowVisible: false,
  headerTintColor: Colors.textColor,

  // this setup makes large title work on iOS
  ...Platform.select({
    ios: {
      headerLargeTitle: true,
      headerTransparent: true,
      headerBlurEffect: getHeaderBlurEffect(), // this sets up blurred nav bar
      // if you'd like to have a solid color for a nav bar, then you should
      // set up `headerStyle: {backgroundColor: Colors.bg2Color}`
    },
  }),
});

export const tabBarDefaultOptions = (
  iconName: string,
  focusIconName: string,
): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: Colors.green500,
  tabBarInactiveTintColor: Colors.gray50,
  tabBarLabelStyle: {
    ...Typography.small,
    marginBottom: 4,
  },
  tabBarStyle: {backgroundColor: Colors.bgColor, borderTopWidth: 0, elevation: 0},
  tabBarIcon: ({focused, color, size}) => (
    <Icon name={focused ? focusIconName : iconName} size={size} color={color} />
  ),
});
