import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {SCREEN_WIDTH, Colors, SCREEN_HEIGHT} from '../Helper/Layout';
import Axios from 'axios';
import {NavigationActions, StackActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import request, {API_URL} from '../Helper/Api';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'ahsan.ihsan@outlook.com',
      password: 'ahsan11343',
      isLoading: false,
      isAppLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value) {
        const decoded = jwt_decode(value);
        const currentTime = moment() / 1000;
        if (decoded.exp < currentTime) {
          return this.setState({
            isAppLoading: false,
          });
        }
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'MainApp'})],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        this.setState({
          isAppLoading: false,
        });
      }
    } catch (error) {
      this.setState({
        isAppLoading: false,
      });
    }
  }

  onSubmit = () => {
    const email = this.state.email;
    const password = this.state.password;
    this.setState({isLoading: true});
    request({method: 'POST', url: '/login', data: {email, password}})
      .then(response => {
        this.setState({isLoading: false});
        console.log(response);
        AsyncStorage.setItem('token', response.token);
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'MainApp'})],
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch(error => {
        this.setState({isLoading: false});
        Alert.alert('Invalid Credentials', error.message);
      });
  };

  render() {
    if (this.state.isAppLoading) {
      return (
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
          }}></View>
      );
    } else
      return (
        <ImageBackground
          source={require('../Images/login.jpeg')}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}>
              <View style={styles.card}>
                <Text style={styles.title}>Welcome to Hello Jee</Text>
                <TextInput
                  style={styles.textField}
                  placeholder="Enter Email"
                  placeholderTextColor="grey"
                  keyboardType="email-address"
                  value={this.state.email}
                  onChangeText={email => this.setState({email})}
                  editable={!this.state.isLoading}
                  autoCapitalize="none"
                />
                <TextInput
                  autoCapitalize="none"
                  style={[styles.textField, {marginTop: 20}]}
                  placeholder="Enter Password"
                  placeholderTextColor="grey"
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={password => this.setState({password})}
                  editable={!this.state.isLoading}
                />
                <TouchableOpacity
                  style={styles.buttonContainer}
                  disabled={this.state.isLoading}
                  onPress={() => this.onSubmit()}>
                  <Text style={styles.buttonText}>Login </Text>
                  {this.state.isLoading ? <ActivityIndicator /> : undefined}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  disabled={this.state.isLoading}
                  onPress={() =>
                    this.props.navigation.navigate('Registration')
                  }>
                  <Text style={styles.buttonText}>Registration</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: SCREEN_WIDTH - 80,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    width: SCREEN_WIDTH - 120,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    backgroundColor: '#10316b',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 50,
    flexDirection: 'row',
    alignContent: 'center',
  },
  textField: {
    width: SCREEN_WIDTH - 120,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    height: 50,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: '500',
  },
});

Login.navigationOptions = {
  header: null,
};
