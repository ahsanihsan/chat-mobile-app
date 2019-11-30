import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './Screens/Login';
import Chat from './Chat';
import Registration from './Screens/Registration';

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  Chat: {
    screen: Chat,
  },
  Registration: {
    screen: Registration,
  },
});

export default createAppContainer(AuthNavigator);
