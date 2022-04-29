import {Assets} from 'react-native-ui-lib';

export default function loadImages(): void {
  Assets.loadAssetsGroup('demo', {
    logo: require('@assets/icon.png'),
  });
}
