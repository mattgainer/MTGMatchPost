import React from 'react';

import RestClient from 'react-native-rest-client';

export default class DeckBrewApi extends RestClient {
  constructor () {
    // Initialize with your base URL
    super('api.deckbrew.com/mtg');
  }
  // Now you can write your own methods easily
  logIn (props) {
    // Returns a Promise with the response.
    // return this.POST('/sessions', { username, password });
  }
};

export default DeckBrewApi;