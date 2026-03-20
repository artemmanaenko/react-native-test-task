import { Platform } from 'react-native';

const androidLocalhost = 'http://10.0.2.2:4000';
const iosOrOtherLocalhost = 'http://localhost:4000';

export const apiBaseUrl =
  Platform.OS === 'android' ? androidLocalhost : iosOrOtherLocalhost;
