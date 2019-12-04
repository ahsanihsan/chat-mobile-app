import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import Header from '../Components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';

export default class More extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogOut = async () => {
    await AsyncStorage.setItem('token', '');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Auth'})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View>
        <Header title="More" />
        <Button
          title="Logout"
          onPress={() => {
            this.handleLogOut();
          }}
        />
      </View>
    );
  }
}
