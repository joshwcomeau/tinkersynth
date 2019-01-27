// @flow
import React from 'react';

import { debounce } from '../../utils';

type Props = {
  length?: number,
  children: React$Node,
};

class Debounce extends React.Component<Props> {
  static defaultProps = {
    length: 500,
  };

  forceUpdateDebounced = debounce(() => this.forceUpdate(), this.props.length);

  shouldComponentUpdate() {
    this.forceUpdateDebounced();
    return false;
  }

  componentWillUnmount() {
    this.forceUpdateDebounced.cancel();
  }

  render() {
    return this.props.children;
  }
}

export default Debounce;
