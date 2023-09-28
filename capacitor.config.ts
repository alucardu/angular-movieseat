import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.movieseat.app',
  appName: 'Movieseat',
  webDir: 'dist/angular-movieseat/browser',
  server: {
    hostname: 'www.moviese.at',
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      launchFadeOutDuration: 400
    },
    CapacitorCookies: {
      enabled: true,
    },
  }
};

export default config;
