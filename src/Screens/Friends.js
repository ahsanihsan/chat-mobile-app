import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Header from '../Components/Header';
import request from '../Helper/Api';

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    request({method: 'GET', url: '/friends'})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <Header title="Friends" />
        <Text> </Text>
      </View>
    );
  }
}
