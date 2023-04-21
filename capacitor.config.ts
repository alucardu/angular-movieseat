import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.movieseat.app',
  appName: 'Movieseat',
  webDir: 'dist/angular-movieseat',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      launchFadeOutDuration: 400
    }
  }
};

export default config;
// to generate icons:
// npx @capacitor/assets generate --iconBackgroundColor '#280028' --iconBackgroundColorDark '#280028' --android
