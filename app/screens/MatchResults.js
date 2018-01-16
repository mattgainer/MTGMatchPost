
import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  ScrollView,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
class MatchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [
        {
          result: {
            name: "1-1"
          },
          writeup: "",
          opposing_archetype: {
            name: "Temur Energy"
          },
          deck: {
            user: {
              name: "Matt"
            },
            archetype: {
              name: "Temur Energy",
              format: {
                name: "Standard"
              },
            },
          }
        }
      ]
    }
  }
  componentWillMount() {
    if (this.state.matches.length < 2 && this.props.navigation.state.params) {
      fetch('http://localhost:3001/api/matches/', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.navigation.state.params.token
        },
      }).then(response =>
          response.json().then(
            data => ({
              data: data,
              status: response.status,
            })
          ).then(response => {
            // Callback goes here
            this.setState({matches: response.data.matches})
        })
      )
      .catch((error) => {
        alert(error);
      });
    }
  }
  static navigationOptions = {
    title: 'Match Search Results',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <FlatList
          data={this.state.matches}
          renderItem={({item}) => <Text>{item.deck.archetype.name} vs. {item.opposing_archetype.name} by {item.deck.user.name}, Result: {item.result.name}</Text>}
          extraData={this.state}
        />
      </ScrollView>
    );
  }
}

export default MatchResults