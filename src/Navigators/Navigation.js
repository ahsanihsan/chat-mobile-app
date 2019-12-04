import React from 'react';
import {Image, Text} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

import Login from '../Screens/Login';
import Chat from '../Screens/Chat';
import Registration from '../Screens/Registration';

import Friends from '../Screens/Friends';
import {Colors} from '../Helper/Layout';
import More from '../Screens/More';

const TabBarComponent = props => <BottomTabBar {...props} />;
const Settings = (image, label) => {
  return {
    tabBarLabel: ({focused}) => (
      <Text style={{color: focused ? Colors.primaryColor : Colors.grey}}>
        {label}
      </Text>
    ),
    tabBarIcon: ({focused}) => {
      return (
        <Image
          source={image}
          style={{
            width: 20,
            height: 20,
            tintColor: focused ? Colors.primaryColor : Colors.grey,
          }}
        />
      );
    },
  };
};

const TabScreens = createBottomTabNavigator(
  {
    Friends: {
      screen: Friends,
      navigationOptions: Settings(require('../Images/friends.png'), 'Friends'),
    },
    More: {
      screen: More,
      navigationOptions: Settings(require('../Images/more.png'), 'More'),
    },
  },
  {
    tabBarComponent: props => {
      return (
        <TabBarComponent
          {...props}
          style={{
            shadowColor: Colors.black,
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.5,
            paddingTop: 10,
          }}
        />
      );
    },
  },
);

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Registration: {
      screen: Registration,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

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
