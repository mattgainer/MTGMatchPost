import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import { setUserId } from "../actions/user"

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
      username: 'Matt',
      password: 'PW'
    };
  }


  static navigationOptions = {
    title: 'Log In',
  };

  logIn = () => {
    const { navigate } = this.props.navigation;
    // const api = new BackEndApi()
    // stuff = api.logIn(this.state.username, this.state.password).then(response => response.user)
    fetch('http://localhost:3001/api/sessions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    }).then(response =>
        response.json().then(
          data => ({
            data: data,
            status: response.status,
          })
        ).then(response => {
        user = response.data.user;
        navigate("Navigation", {
          userId: user.id,
          token: user.token,
        });
      })
    )
    .catch((error) => {
      alert(error);
    });
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
      </View>
    );
  }
}

export default LogIn
