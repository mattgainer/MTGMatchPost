import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

class Navigation extends Component {
  static navigationOptions = {
    title: 'Hub',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate('DeckCreate')}
          title="Create Deck"
        />

        <Button
          onPress={() => navigate('MatchCreate')}
          title="Create Match"
        />

        <Button
          onPress={() => navigate('MatchSearch')}
          title="Browse by Match"
        />

        {
        //   <Button
        //   onPress={() => navigate('ArchetypeSearch')}
        //   title="Browse by Archetype"
        // />
        }
      </View>
    );
  }
}

export default Navigation