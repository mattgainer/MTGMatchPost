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

class MatchSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFormat: null,
      selectedArchetype: null,
      selectedOpposingArchetype: null,
      selectedResult: null,
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
      archetypesList: [
      ],
    }
  }
  setArchetypesList = (formatId) => {
    const formats = this.state.formats;
    this.setState({selectedFormat: formatId});
    const archetypes = formats[formats.findIndex(i => i.id === formatId)].archetypes
    this.setState({archetypesList: archetypes});
    // alert(JSON.stringify(this.state.archetypesList));
  };
  static navigationOptions = {
    title: 'Match Search',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
      {
        // <Picker
        //   selectedValue={this.state.selectedFormat}
        //   onValueChange={(itemValue, itemIndex) => this.setArchetypesList(itemValue)}>
        //   {this.state.formats.map(format => {
        //     return (
        //       <Picker.Item label={format.name} value={format.id}></Picker.Item>
        //     );
        //   })}
        // </Picker>
        // <Picker
        //   selectedValue={this.state.selectedArchetype}
        //   onValueChange={(itemValue, itemIndex) => this.setState({selectedArchetype: itemValue})}>
        //   {this.state.archetypesList.map(archetype => {
        //     return (
        //       <Picker.Item label={archetype.name} value={archetype.id}></Picker.Item>
        //     );
        //   })}
        // </Picker>
        // <Picker
        //   selectedValue={this.state.selectedOpposingArchetype}
        //   onValueChange={(itemValue, itemIndex) => this.setState({selectedOpposingArchetype: itemValue})}>
        //   {this.state.archetypesList.map(archetype => {
        //     return (
        //       <Picker.Item label={archetype.name} value={archetype.id}></Picker.Item>
        //     );
        //   })}
        // </Picker>
        // <Picker
        //   selectedValue={this.state.selectedResult}
        //   onValueChange={(itemValue, itemIndex) => this.setState({selectedResult: itemValue})}>
        //   {this.state.results.map(result => {
        //     return (
        //       <Picker.Item label={result.name} value={result.id}></Picker.Item>
        //     );
        //   })}
        // </Picker>
      }
        <Button
          title="Go To Results"
          onPress={() => navigate('MatchResults', {
            selectedArchetype: this.state.writeup,
            selectedOpposingArchetype: this.state.selectedArchetype,
            selectedResult: this.state.selectedResult,
            userId: this.props.navigation.state.params.userId,
            token: this.props.navigation.state.params.token,
          })}
        />
      </ScrollView>
    );
  }
}

export default MatchSearch