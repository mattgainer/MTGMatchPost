import React from 'react';

import RestClient from 'react-native-rest-client';

export default class BackEndApi extends RestClient {
  constructor () {
    // Initialize with your base URL
    super('localhost:3001');
  }
  // Now you can write your own methods easily
  logIn (username, password) {
    // Returns a Promise with the response.
    return this.POST('/sessions', { username, password });
  }
  SignUp () {
    // If the request is successful, you can return the expected object
    // instead of the whole response.
    return this.POST('/sessions', { username, password });
  }
  GetFormats () {
    return this.GET('/formats');
  }
};

export default BackEndApi;