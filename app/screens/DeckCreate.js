import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  View,
  Text,
  Picker,
  TextInput,
  Button,
} from 'react-native';

class DeckCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckName: "",
      selectedArchetype: 1,
      selectedFormat: 1,
      archetypesList: [
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
      ],
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
  setArchetypesList = (formatId) => {
    const formats = this.state.formats;
    this.setState({selectedFormat: formatId});
    const archetypes = formats[formats.findIndex(i => i.id === formatId)].archetypes
    this.setState({archetypesList: archetypes});
    // alert(JSON.stringify(this.state.archetypesList));
  };
  static navigationOptions = {
    title: 'Create Deck Part 1/2',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Deck Name</Text>
        <TextInput
          placeholder="Name Here"
          value={this.state.deckName}
          onChangeText={(deckName) => this.setState({deckName})}
        />
        <Text>Format</Text>
        <Picker
          selectedValue={this.state.selectedFormat}
          onValueChange={(itemValue, itemIndex) => this.setArchetypesList(itemValue)}>
          {this.state.formats.map(format => {
            return (
              <Picker.Item label={format.name} value={format.id}></Picker.Item>
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
        <Button
          title="Next"
          onPress={() => navigate('DeckCards', {name: this.state.deckName, archetype: this.state.selectedArchetype})}
        />
      </View>
    );
  }
}

export default DeckCreate