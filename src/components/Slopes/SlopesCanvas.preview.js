// @flow
import React from 'react';
import { Spring } from 'react-spring';

import { extractTypeFromObject, debounce } from '../../utils';

import { SlopesContext } from './SlopesState';
import SlopesCanvas from './SlopesCanvas';

class Debounce extends React.Component<*> {
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

const SlopesCanvasPreview = ({ width, height }: any) => {
  const slopesParams = React.useContext(SlopesContext);

  return (
    <Debounce length={1000}>
      <SlopesCanvas {...slopesParams} width={width} height={height} />
    </Debounce>
  );
};

export default SlopesCanvasPreview;
