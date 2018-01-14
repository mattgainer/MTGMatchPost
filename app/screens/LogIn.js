import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  static navigationOptions = {
    title: 'Log In',
  };

  logIn = () => {
    const { navigate } = this.props.navigation;
    navigate("Navigation")
    // const api = new RestApi()
    // api.logIn(this.props.username, this.props.password)
    //    .then(response => response.token)
    //    .then(token => saveToken(token))
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

export default LogIn
