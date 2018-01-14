
import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import RestClient from 'react-native-rest-client'

import {
  Text,
  ScrollView,
  Button,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
// class DeckBrewApi extends RestClient {
//   constructor () {
//     // super('https://api.deckbrew.com/mtg');
//   }
//   getCardByCardName (cardName) {
//     // return this.GET('/cards/typeahead?q={cardName}').then(response => response.first);
//   }
// };
class DeckCards extends Component {
  constructor(props) {
    super(props);
    params = this.props.navigation.state.params
    this.state = {
      name: params.name,
      archetype: params.archetype,
      cardInput: "",
      cardName: "",
      cardImageUrl: "",
      deckCards: [],
      cardQuantity: "1",
    }
  };

  // CardsGet = new DeckBrewApi();

  updateSelectedCard = (cardName) => {
    // card = this.CardsGet.getCardByCardName(cardName).then(response => response.data)
    // alert(JSON.stringify(card))
    this.setState({cardName: "Tarmogoyf"})
    this.setState({cardImageUrl: "https://image.deckbrew.com/mtg/multiverseid/370404.jpg"})
    this.setState({cardInput: cardName})
  };
  limitToNumbers = (text) => {
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
    this.setState({ cardQuantity: newText });
  }
  saveCard = () => {
    const deckCards = this.state.deckCards;
    deckCards.push({
      name: this.state.cardName,
      quantity: this.state.cardQuantity,
      display: this.state.cardQuantity + "x " + this.state.cardName,
      key: this.state.deckCards.length,
    });
    input = this.state.cardInput;
    this.setState({
      deckCards: deckCards,
      cardName: "",
      cardInput: "",
      cardQuantity: "1",
    });
  }
  saveDeck = (navigate) => {
    navigate("Navigation")
  }
  static navigationOptions = {
    title: 'Create Deck Part 2/2',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <TextInput
          placeholder="Quantity"
          keyboardType='numeric'
          onChangeText={(text)=> this.limitToNumbers(text)}
          value={this.state.cardQuantity}
          maxLength={2}  //setting limit of input
        />
        <TextInput
          placeholder="Card Name"
          value={this.state.cardInput}
          onChangeText={(cardInput) => this.updateSelectedCard(cardInput)}
        />
        <Image
          style={{width: 171, height: 239}}
          source={{uri: this.state.cardImageUrl}}
        />
        <Button
          title="Save Card"
          onPress={ () => this.saveCard() }
        />
        <FlatList
          data={this.state.deckCards}
          renderItem={({item}) => <Text>{item.display}</Text>}
          extraData={this.state}
        />
        <Button
          title="Save Deck"
          onPress={ () => this.saveDeck(navigate) }
        />
      </ScrollView>
    );
  }
}

export default DeckCards