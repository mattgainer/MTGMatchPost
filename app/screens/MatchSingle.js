import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  ScrollView,
  Button,
  TextInput,
  FlatList,
} from 'react-native';

class MatchSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: {
        match_cards: [
          {
            quantity: 1,
            in: false,
            deck_card: {
              card_id: "Tarmogoyf"
            }
          }
        ],
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
          deck_cards: [
            {
              quantity: 1,
              card_id: "Tarmogoyf",
              sideboard: false,
            }
          ],
          archetype: {
            name: "Temur Energy",
            format: {
              name: "Standard"
            },
          },
        }
      }
    }
  }
  componentWillMount() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.matchId) {
      fetch('http://localhost:3001/api/matches/' + this.props.navigation.state.params.matchId, {
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
            this.setState({match: response.data.match})
        })
      )
      .catch((error) => {
        alert(error);
      });
    }
  }
  static navigationOptions = {
    title: 'Single Result View',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <Text>{this.state.match.deck.archetype.name} vs. {this.state.match.opposing_archetype.name}</Text>
        <Text>by {this.state.match.deck.user.name}</Text>
        <Text>Cards in Deck (sideboard is true):</Text>
        <FlatList
          data={this.state.match.deck.deck_cards}
          renderItem={({item}) => <Text>{item.quantity}x {item.card_id} {item.sideboard.toString()}</Text>}
          extraData={this.state}
        />
        <Text>Cards In/Out (in is true)</Text>
        <FlatList
          data={this.state.match.match_cards}
          renderItem={({item}) => <Text>{item.quantity}x {item.deck_card.card_id} {item.in.toString()}</Text>}
          extraData={this.state}
        />
        <Text>Writeup: {this.state.match.writeup}</Text>
      </ScrollView>
    );
  }
}

export default MatchSingle