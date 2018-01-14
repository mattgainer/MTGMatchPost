import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

class SignUp extends Component {
  static navigationOptions = {
    title: 'Sign Up',
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email:    ''
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TextInput
          placeholder="username"
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          placeholder="email"
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          placeholder="password"
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}

        />
        <Button
          title="Log In"
          onPress={() => this.logIn()}
        />
        <Text>{this.state.username}</Text>
        <Text>{this.state.password}</Text>
      </View>
    );
  }
}

export default SignUp