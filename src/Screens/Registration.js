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
import {SCREEN_WIDTH} from '../Helper/Layout';
import Axios from 'axios';
import {NavigationActions, StackActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '../Helper/Api';
export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'ahsa12n.ihsa123n@outlook.com',
      password: 'ahsan11343',
      confirmPassword: 'ahsan11343',
      fullName: 'Ahsan Ihsan',
      isLoading: false,
    };
  }

  onSubmit = () => {
    const {email, password, fullName} = this.state;
    this.setState({isLoading: true});
    Axios.post(API_URL + '/register', {email, password, fullName})
      .then(response => {
        this.setState({isLoading: false});
        console.log(response.data);
        if (response.data && response.data.success) {
          AsyncStorage.setItem('token', response.data.token);
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'MainApp'})],
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          Alert.alert('Invalid', response.data.message);
        }
      })
      .catch(error => {
        this.setState({isLoading: false});
        Alert.alert('Invalid Credentials', error.response.data.message);
      });
  };

  render() {
    return (
      <ImageBackground
        source={require('../Images/login.jpeg')}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={styles.card}>
              <Text style={styles.title}>Register For Hello Jee</Text>
              <TextInput
                style={styles.textField}
                placeholder="Enter Your Name"
                placeholderTextColor="grey"
                value={this.state.fullName}
                onChangeText={fullName => this.setState({fullName})}
                editable={!this.state.isLoading}
                autoCapitalize="none"
              />
              <TextInput
                style={[styles.textField, {marginTop: 20}]}
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
              <TextInput
                autoCapitalize="none"
                style={[styles.textField, {marginTop: 20}]}
                placeholder="Repeat Password"
                placeholderTextColor="grey"
                secureTextEntry
                value={this.state.confirmPassword}
                onChangeText={confirmPassword =>
                  this.setState({confirmPassword})
                }
                editable={!this.state.isLoading}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                disabled={this.state.isLoading}
                onPress={() => this.onSubmit()}>
                <Text style={styles.buttonText}>Submit</Text>
                {this.state.isLoading ? <ActivityIndicator /> : undefined}
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

Registration.navigationOptions = {
  header: null,
};
