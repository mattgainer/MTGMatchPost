
import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

class ArchetypeSearch extends Component {
  static navigationOptions = {
    title: 'Archetype Search',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>

      </View>
    );
  }
}

export default ArchetypeSearch