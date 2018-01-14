
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
        {
          id: 2,
          name: "2-1",
        },
        {
          id: 3,
          name: "1-1",
        },
        {
          id: 4,
          name: "1-2",
        },
        {
          id: 5,
          name: "0-2",
        },
      ],
      selectedResult: 1,
      writeup: "",
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
        {
          id: 2,
          name: "Deck 2",
          archetype_id: 1,
          archetype: {
            name: "Temur Energy",
            format_id: 1,
          }
        },
        {
          id: 3,
          name: "Deck 3",
          archetype_id: 6,
          archetype: {
            name: "Tron",
            format_id: 2,
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
        {
          name: "Modern",
          id:   2,
          archetypes: [
            {
              name: "Affinity",
              id:   4
            },
            {
              name: "TitanShift",
              id:   5
            },
            {
              name: "Tron",
              id:   6
            },
          ]
        },
        {
          name: "Legacy",
          id:  3,
          archetypes: [
            {
              name: "Lands",
              id:   7
            },
            {
              name: "Sneak and Show",
              id:   8
            },
            {
              name: "Death and Taxes",
              id:   9
            },
          ]
        },
      ],
    };
  };
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
        <Picker
          selectedValue={this.state.selectedDeck}
          onValueChange={(itemValue, itemIndex) => this.setArchetypesList(itemValue)}>
          {this.state.decks.map(deck => {
            return (
              <Picker.Item label={deck.name} value={deck.id}></Picker.Item>
            );
          })}
        </Picker>
        <Picker
          selectedValue={this.state.selectedArchetype}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedArchetype: itemValue})}>
          {this.state.archetypesList.map(archetype => {
            return (
              <Picker.Item label={archetype.name} value={archetype.id}></Picker.Item>
            );
          })}
        </Picker>
        <Picker
          selectedValue={this.state.selectedResult}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedResult: itemValue})}>
          {this.state.results.map(result => {
            return (
              <Picker.Item label={result.name} value={result.id}></Picker.Item>
            );
          })}
        </Picker>
        <TextInput
          multiline={true}
          numberOfLines={4}
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
          })}
        />
      </ScrollView>
    );
  }
}

export default MatchCreate