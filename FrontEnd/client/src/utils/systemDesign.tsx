import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {Appearance} from 'react-native';
import {Colors, Typography} from 'react-native-ui-lib';

import {stores} from '../stores';
import loadColors from '../config/loadColors';
import loadFonts from '../config/loadFonts';

const baseColors: DesignSystemColors = loadColors();

const themes: Record<AppearanceMode, ThemeColors> = {
  light: {
    textColor: baseColors.gray500,
    bgColor: baseColors.gray50,
  },
  dark: {
    textColor: baseColors.gray50,
    bgColor: baseColors.gray700,
  },
};

// for more information - https://wix.github.io/react-native-ui-lib/foundation/style
export const configureDesignSystem = (): void => {
  const {ui} = stores;

  if (ui.isSystemAppearance) {
    Colors.loadColors(baseColors);
    Colors.loadSchemes(themes);
  } else {
    Colors.loadColors({...baseColors, ...themes[ui.appearance]});
    Colors.loadSchemes({dark: {}, light: {}});
  }
};

export const getThemeStatusBarStyle = (ca?: CurrentAppearance): StatusBarStyle => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  const appearance = current.system ? Appearance.getColorScheme() : current.value;
  switch (appearance) {
    case 'dark':
      return 'light-content';
    case 'light':
      return 'dark-content';
  }
};

export const getThemeStatusBarBGColor = (ca?: CurrentAppearance): string => {
  return Colors.bgColor;
};

export const getNavigationTheme = (ca?: CurrentAppearance): Theme => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  // for more information - https://reactnavigation.org/docs/themes
  const MyLightTheme: Theme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.green500,
      background: Colors.bgColor,
      card: Colors.bgColor,
      text: Colors.textColor,
      // border: Colors.grey30,
      // notification: Colors.primary,
    },
  };

  const MyDarkTheme: Theme = {
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.green500,
      background: Colors.bgColor,
      card: Colors.bgColor,
      text: Colors.textColor,
      // border: Colors.grey30,
      // notification: Colors.primary,
    },
  };

  const appearance = current.system ? Appearance.getColorScheme() : current.value;
  switch (appearance) {
    case 'dark':
      return MyDarkTheme;
    case 'light':
      return MyLightTheme;
  }

  return DefaultTheme;
};

export const getHeaderBlurEffect = (ca?: CurrentAppearance): 'regular' | 'light' | 'dark' => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  return current.system ? 'regular' : current.value;
};
