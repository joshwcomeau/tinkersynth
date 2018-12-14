// @flow
import React, { Component } from 'react';

import Slopes from '../Slopes';
import GlobalStyles from '../GlobalStyles';

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
