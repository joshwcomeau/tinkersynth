// @flow
import React, { Component } from 'react';

import Slopes from '../Slopes';
import GlobalStyles from '../GlobalStyles';

import 'focus-visible';

class App extends Component {
  render() {
    return (
      <>
        <Slopes />
        <GlobalStyles />
      </>
    );
  }
}

export default App;
