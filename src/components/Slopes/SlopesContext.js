// @flow
import React from 'react';

const SlopesContext = React.createContext({});

let reducer = (state, action) => {
  switch (action.type) {
    case ''
  }
}

const SlopesProvider = () => {
  // High-level "Parameters", tweakable settings
  const [perspective, setPerspective] = useState(100);
  const [spikyness, setSpikyness] = useState(0);
  const [polarAmount, setPolarAmount] = useState(62);
  const [omega, setOmega] = useState(0);
  const [splitUniverse, setSplitUniverse] = useState(1);

}

export const SlopesProvider = SlopesContext.Provider;
export const SlopesConsumer = SlopesContext.Consumer;
