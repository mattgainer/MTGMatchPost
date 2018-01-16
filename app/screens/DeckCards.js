
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
    this.state = {
      cardInput: "",
      cardName: "",
      cardImageUrl: "",
      deckCards: [],
      cardQuantity: "1",
      sideboard: false,
    }
  };

  params = this.props.navigation.state.params

  updateSelectedCard = (cardName) => {
    fetch('http://localhost:3001/api/deckbrew/' + cardName, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.params.token
      },
    }).then(response =>
        response.json().then(
          data => ({
            data: data,
            status: response.status,
          })
        )
        .then(response => {
          this.setState({cardName: response.data.card.name})
          this.setState({cardImageUrl: response.data.card.editions[0].image_url})
          this.setState({cardInput: cardName})
        }
      )
    )
    .catch((error) => {
      alert(error);
    });
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
  toggleSideboard = () => {
    this.setState({sideboard: !this.state.sideboard})
  }
  saveCard = () => {
    const deckCards = this.state.deckCards;
    deckCards.push({
      card_id: this.state.cardName,
      quantity: this.state.cardQuantity,
      sideboard: this.state.sideboard,
      display: this.state.cardQuantity + "x " + this.state.cardName + " " + this.state.sideboard,
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
    fetch('http://localhost:3001/api/decks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.params.token
      },
      body: JSON.stringify({
        deck: {
          user_id: this.params.userId,
          archetype_id: this.params.archetype,
          name: this.params.name,
          cards: this.state.deckCards
        }
      }),
    }).then(response =>
        response.json().then(
          data => ({
            data: data,
            status: response.status,
          })
        ).then(response => {
        navigate("Navigation", {
          userId: this.params.userId,
          token: this.params.token,
        });
      })
    )
    .catch((error) => {
      alert(error);
    });
    navigate(
      "Navigation",
      {
        userId: this.params.userId,
        token: this.params.token,
      }
    )
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
          title="Toggle In Sideboard"
          onPress={() => this.toggleSideboard()}
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