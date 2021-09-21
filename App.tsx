import React from "react";
import {initMocks} from "./mock-urls";

<<<<<<< HEAD
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Index from "./navigation/index";

=======
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Index from './navigation/index'
>>>>>>> c5afbe4 (Added Bottom tabs)
export default function App() {
  if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {  // create mirage endpoints
    initMocks(); // create the mock endpoints
  }

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
<<<<<<< HEAD
    return <Index />;
=======
    return (

      <Index />

    );
>>>>>>> c5afbe4 (Added Bottom tabs)
  }
}
