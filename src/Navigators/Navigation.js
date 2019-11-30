import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

import Login from '../Screens/Login';
import Chat from '../Screens/Chat';
import Registration from '../Screens/Registration';

import Dashboard from '../Screens/Dashboard';

const TabBarComponent = props => <BottomTabBar {...props} />;

const TabScreens = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
    },
    Settings: {
      screen: Dashboard,
    },
  },
  {
    tabBarComponent: props => (
      <TabBarComponent {...props} style={{borderTopColor: '#605F60'}} />
    ),
  },
);

const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
  Registration: {
    screen: Registration,
  },
});

const App = createStackNavigator(
  {
    Auth: {
      screen: AuthNavigator,
    },
    MainApp: {
      screen: TabScreens,
    },
    Chat: {
      screen: Chat,
    },
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(App);
