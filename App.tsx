import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { initMocks } from "./mock-urls.tsx";

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Index from './navigation/index'

export default function App() {

  if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "testing") {  // create mirage endpoints
    initMocks();  // create the mock endpoints
  }

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Index />
    );
  }
}
