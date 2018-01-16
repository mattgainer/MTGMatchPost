import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';


class Home extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate('LogIn')}
          title="Log In"
        />
        {
          // <Button
          //   onPress={() => navigate('SignUp')}
          //   title="Sign Up"
          // />
        }
      </View>
    );
  }
}

export default Home