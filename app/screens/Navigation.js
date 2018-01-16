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
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    title: 'Hub',
  };
  params = this.props.navigation.state.params;
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => navigate(
            'DeckCreate',
            {
              userId: this.params.userId,
              token: this.params.token
            }
          )}
          title="Create Deck"
        />

        <Button
          onPress={() => navigate(
            'MatchCreate',
            {
              userId: this.params.userId,
              token: this.params.token
            }
          )}
          title="Create Match"
        />

        <Button
          onPress={() => navigate(
            'MatchSearch',
            {
              userId: this.params.userId,
              token: this.params.token
            }
          )}
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