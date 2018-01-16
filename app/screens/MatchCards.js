
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
      ],
      sideboard: [
        {
          id: 4,
          deck_id: 1,
          card_id: "Thoughtseize",
          quantity: 1,
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
  params = this.props.navigation.state.params
  componentWillMount() {
    if (this.state.maindeck.length < 2 && this.props.navigation.state.params) {
      fetch('http://localhost:3001/api/decks/' + this.props.navigation.state.params.deck, {
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
            this.setState({maindeck: response.data.deck.maindeck})
            this.setState({sideboard: response.data.deck.sideboard})
        })
      )
      .catch((error) => {
        alert(error);
      });
    }
  }
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
    card = this.state.sideboard[this.state.sideboard.findIndex(i => i.id === cardIn)]
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
    card = this.state.maindeck[this.state.maindeck.findIndex(i => i.id === cardOut)]
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
    fetch('http://localhost:3001/api/matches/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.navigation.state.params.token
      },
      body: JSON.stringify(
        {
          match: {
            user_id: this.params.userId,
            opposing_archetype_id: this.params.archetype,
            writeup: this.params.writeup,
            result_id: this.params.result,
            deck_id: this.params.deck,
            match_cards_in: this.state.cardsIn,
            match_cards_out: this.state.cardsOut,
          }
        }
      )
    }).then(response =>
      response.json().then(
        data => ({
          data: data,
          status: response.status,
        })
      ).then(response => {
        // Callback goes here
        navigate("Navigation", {
          userId: this.props.navigation.state.params.userId,
          token:  this.props.navigation.state.params.token
        });
      })
    )
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