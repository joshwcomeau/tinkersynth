import React, { PureComponent } from 'react';

import { scaleCanvas } from './Canvas.helpers';

type Props = {
  innerRef: (elem: HTMLElement, context: CanvasRenderingContext2D) => void,
};

class Canvas extends PureComponent<Props> {
  static defaultProps = {
    width: 800,
    height: 600,
  };

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  handleRef = (canvas: ?HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    scaleCanvas(this.ctx);

    this.props.innerRef.current = this.ctx;
  };

  render() {
    const { innerRef, style = {}, ...delegatedProps } = this.props;

    return (
      <canvas
        ref={this.handleRef}
        style={{
          ...style,
          border: '10px solid white',
          boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.1)',
        }}
        {...delegatedProps}
      />
    );
  }
}

export default Canvas;
