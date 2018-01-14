
import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  ScrollView,
  Text,
  Picker,
  TextInput,
  Button,
  FlatList,
} from 'react-native';


class MatchCards extends React.Component {
  constructor(props) {
    super(props);
    params = this.props.navigation.state.params
    this.state = {
      writeup: params.writeup,
      archetype: params.archetype,
      result: params.result,
      deck: params.deck,
      maindeck: [
        {
          id: 1,
          deck_id: 1,
          card_id: "Tarmogoyf",
          quantity: 1,
        },
        {
          id: 2,
          deck_id: 1,
          card_id: "Scavenging Ooze",
          quantity: 2,
        },
        {
          id: 3,
          deck_id: 1,
          card_id: "Kitchen Finks",
          quantity: 3,
        },
      ],
      sideboard: [
        {
          id: 4,
          deck_id: 1,
          card_id: "Thoughtseize",
          quantity: 1,
        },
        {
          id: 5,
          deck_id: 1,
          card_id: "Drown in Sorrow",
          quantity: 2,
        },
        {
          id: 6,
          deck_id: 1,
          card_id: "Terminate",
          quantity: 2,
        },
      ],
      cardsIn: [],
      cardsOut: [],
      selectedCardIn: null,
      selectedCardOut: null,
      quantityIn: null,
      quantityOut: null,
      cardInput: "",
      cardName: "",
      cardImageUrl: "",
      deckCards: [],
    }
  };
  limitToNumbersIn = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1 ) {
          newText = newText + text[i];
      }
      else {
        alert("please enter numbers only");
      }
    }
    this.setState({ quantityIn: newText });
  }
  limitToNumbersOut = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1 ) {
          newText = newText + text[i];
      }
      else {
        alert("please enter numbers only");
      }
    }
    this.setState({ quantityOut: newText });
  }
  saveCardIn = () => {
    cardIn = this.state.selectedCardIn;
    card = this.state.maindeck[this.state.maindeck.indexOf(i => i.id === cardIn)]
    quantityIn = this.state.quantityIn;
    cardsIn = this.state.cardsIn
    cardsIn.push({
      deck_card_id: cardIn,
      quantity: quantityIn,
      display: quantityIn + "x " + card.card_id,
    });
    this.setState({
      cardsIn: cardsIn,
      quantityIn: "1",
      cardIn: null,
      selectedCardIn: null,
    });
  }
  saveCardOut = () => {
    cardOut = this.state.selectedCardOut;
    card = this.state.maindeck[this.state.maindeck.indexOf(i => i.id === cardOut)]
    quantityOut = this.state.quantityOut;
    cardsOut = this.state.cardsOut
    cardsOut.push({
      deck_card_id: cardOut,
      quantity: quantityOut,
      display: quantityOut + "x " + card.card_id,
    });
    this.setState({
      cardsOut: cardsOut,
      quantityOut: "1",
      cardOut: null,
      selectedCardOut: null,
    });
  }
  submitMatch = (navigate) => {
    navigate("Navigation");
  }
  static navigationOptions = {
    title: 'Create Match Part 2/2',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <Text>In</Text>
        <Picker
          selectedValue={this.state.selectedCardIn}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedCardIn: itemValue})}>
          {this.state.sideboard.map(card => {
            return (
              <Picker.Item label={card.card_id} value={card.id}></Picker.Item>
            );
          })}
        </Picker>
        <TextInput
          placeholder="Quantity"
          keyboardType='numeric'
          onChangeText={(text)=> this.limitToNumbersIn(text)}
          value={this.state.quantityIn}
          maxLength={2}  //setting limit of input
        />
        <Button
          title="Submit Card"
          onPress={ () => this.saveCardIn() }
        />
        <FlatList
          data={this.state.cardsIn}
          renderItem={({item}) => <Text>{item.display}</Text>}
          extraData={this.state}
        />
        <Text>Out</Text>
        <Picker
          selectedValue={this.state.selectedCardOut}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedCardOut: itemValue})}>
          {this.state.maindeck.map(card => {
            return (
              <Picker.Item label={card.card_id} value={card.id}></Picker.Item>
            );
          })}
        </Picker>
        <TextInput
          placeholder="Quantity"
          keyboardType='numeric'
          onChangeText={(text)=> this.limitToNumbersOut(text)}
          value={this.state.quantityOut}
          maxLength={2}  //setting limit of input
        />
        <Button
          title="Submit Card"
          onPress={ () => this.saveCardOut() }
        />
        <FlatList
          data={this.state.cardsOut}
          renderItem={({item}) => <Text>{item.display}</Text>}
          extraData={this.state}
        />
        <Button
          title="Submit Match"
          onPress={ () => this.submitMatch(navigate) }
        />
      </ScrollView>
    );
  }
}

export default MatchCards