
import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  ScrollView,
  Button,
  TextInput,
  Picker,
} from 'react-native';

class MatchCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [
        {
          id: 1,
          name: "2-0",
        },
      ],
      selectedResult: 1,
      writeup: " ",
      decks: [
        {
          id: 1,
          name: "Deck 1",
          archetype_id: 1,
          archetype: {
            name: "Temur Energy",
            format_id: 1,
          }
        },
      ],
      selectedDeck: 1,
      archetypesList: [],
      selectedArchetype: null,
      formats: [
        {
          name: "Standard",
          id:   1,
          archetypes: [
            {
              name: "Temur Energy",
              id:   1
            },
            {
              name: "Gifts Control",
              id:   2
            },
            {
              name: "Jeskai Approach",
              id:   3
            },
          ]
        },
      ],
    };
  };
  componentWillMount() {
    if (this.state.formats.length < 2 && this.props.navigation.state.params) {
      fetch('http://localhost:3001/api/formats', {
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
            this.setState({formats: response.data.formats})
        })
      )
      .catch((error) => {
        alert(error);
      });
      fetch('http://localhost:3001/api/results', {
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
            console.log(response.data.results)
            this.setState({results: response.data.results})
        })
      )
      .catch((error) => {
        alert(error);
      });
      fetch('http://localhost:3001/api/decks?user_id=' + this.props.navigation.state.params.userId, {
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
            this.setState({decks: response.data.decks})
        })
      )
      .catch((error) => {
        alert(error);
      });
    }
  }
  setArchetypesList = (deckId) => {
    this.setState({selectedDeck: deckId});
    const formats = this.state.formats;
    const formatId = this.getFormatFromDeck(deckId);
    const archetypes = formats[formats.findIndex(i => i.id === formatId)].archetypes;
    this.setState({archetypesList: archetypes});
  }
  getFormatFromDeck = (deckId) => {
    deck = this.state.decks[this.state.decks.findIndex(i => i.id === deckId)];
    return deck.archetype.format_id;
  }
  static navigationOptions = {
    title: 'Create Match Part 1/2',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <Text>Deck</Text>
        <Picker
          selectedValue={this.state.selectedDeck}
          onValueChange={(itemValue, itemIndex) => this.setArchetypesList(itemValue)}>
          {this.state.decks.map(deck => {
            return (
              <Picker.Item label={deck.name} value={deck.id}></Picker.Item>
            );
          })}
        </Picker>
        <Text>OpposingArchetype</Text>
        <Picker
          selectedValue={this.state.selectedArchetype}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedArchetype: itemValue})}>
          {this.state.archetypesList.map(archetype => {
            return (
              <Picker.Item label={archetype.name} value={archetype.id}></Picker.Item>
            );
          })}
        </Picker>
        <Text>Result</Text>
        <Picker
          selectedValue={this.state.selectedResult}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedResult: itemValue})}>
          {this.state.results.map(result => {
            return (
              <Picker.Item label={result.name} value={result.id}></Picker.Item>
            );
          })}
        </Picker>
        <Text>Writeup</Text>
        <TextInput
          value={this.state.writeup}
          placeholder="Match Writeup Here"
          onChangeText={(writeup) => this.setState({writeup})}
        />
        <Button
          title="Next"
          onPress={() => navigate('MatchCards', {
            writeup: this.state.writeup,
            archetype: this.state.selectedArchetype,
            result: this.state.selectedResult,
            deck: this.state.selectedDeck,
            userId: this.props.navigation.state.params.userId,
            token: this.props.navigation.state.params.token,
          })}
        />
      </ScrollView>
    );
  }
}

export default MatchCreate