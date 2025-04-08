
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c6f539af3dfa4b548326892e9fc8cac2',
  appName: 'react-native-web-glimpse',
  webDir: 'dist',
  server: {
    url: 'https://c6f539af-3dfa-4b54-8326-892e9fc8cac2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Browser: {
      launchMode: 'standard'
    }
  }
};

export default config;
