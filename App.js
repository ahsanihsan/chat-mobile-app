import React from 'react';
import {StyleSheet} from 'react-native';
import Login from './src/Screens/Login';
import {setCustomText} from 'react-native-global-props';
import 'react-native-gesture-handler';
import Navigator from './src/Navigators/Navigation';

const App: () => React$Node = () => {
  const customTextProps = {
    style: {
      fontFamily: 'Avenir',
    },
  };
  setCustomText(customTextProps);
  return <Navigator />;
};

export default App;
