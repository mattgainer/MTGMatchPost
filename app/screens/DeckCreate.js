import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  ScrollView,
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
      selectedArchetype: null,
      selectedFormat: null,
      archetypesList: [],
      formats: [{
        name: "",
        id: null
      }]
    }
    // alert(this.props.navigation.state.params);
  };
  componentWillMount() {
    if (this.state.formats.length <= 1 && this.props.navigation.state.params) {
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
    }
  }
  params = this.props.navigation.state.params;

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
      <ScrollView>
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
          onPress={() => navigate(
            'DeckCards',
            {
              name: this.state.deckName,
              archetype: this.state.selectedArchetype,
              userId: this.params.userId,
              token: this.params.token,
            }
          )}
        />
      </ScrollView>
    );
  }
}

export default DeckCreate