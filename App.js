import React, { useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import RootContainer from './src/RootContainer';
import Amplify from '@aws-amplify/core';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    loadFonts();
  });

  async function loadFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });
    setReady(true);
  }

  if (!ready) return <AppLoading />;
  return <RootContainer />;
}
