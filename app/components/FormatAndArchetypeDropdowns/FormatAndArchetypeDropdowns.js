import React {Component} from 'react';

import {
  Picker
} from 'react-native';

class FormatAndArchetypeDropdowns extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ]
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
      selectedFormat: 1
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
      ]
      selectedArchetype: null
    };
  setArchetypesList = () => {

    this.setState(selectedFormat: itemValue);
  }

  render() {

    return (
      <Picker
        selectedValue=this.state.selectedFormat
        onValueChange={(itemValue, itemIndex) => this.setArchetypesList(itemValue)}>
        for(i=0;i++;i<this.state.formats.length) {
          <Picker.Item label={this.state.formats[i].name} value={this.state.formats[i].id} \>
        }
      </Picker>
    );
  }
}

export default FormatAndArchetypeDropdowns