
import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

class MatchResults extends Component {
  constructor(props) {
    super(props);
    params = this.props.navigation.state.params
    this.state = {
      
    }
  }
  static navigationOptions = {
    title: 'Match Search Results',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>

      </View>
    );
  }
}

export default MatchResults