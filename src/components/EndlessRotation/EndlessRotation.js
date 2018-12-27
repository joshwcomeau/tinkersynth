// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

type Props = {
  duration: number,
  delay: number,
  repeatAfter: number,
  run: boolean,
  children: React$Node,
};

class EndlessRotation extends PureComponent<Props> {
  static defaultProps = {
    duration: 5000,
    delay: 0,
    repeatAfter: 100,
  };

  node: ?HTMLElement;
  nodeAnimation: any;

  componentDidMount() {
    const { duration, delay, run, repeatAfter } = this.props;
    const { node } = this;

    if (!node) {
      return;
    }

    const orbitAnimationFrames = [
      { transform: `translateX(0%)` },
      { transform: `translateX(-${repeatAfter}%)` },
    ];

    const orbitAnimationTiming = {
      duration,
      delay,
      iterations: Infinity,
    };

    // $FlowIgnore
    this.nodeAnimation = node.animate(
      orbitAnimationFrames,
      orbitAnimationTiming
    );

    if (!run) {
      this.nodeAnimation.pause();
    }
  }

  componentDidUpdate() {
    if (!this.props.run) {
      this.nodeAnimation.pause();
    } else {
      this.nodeAnimation.play();
    }
  }

  render() {
    const { duration, delay, children, ...delegated } = this.props;

    return (
      <Orbiter
        {...delegated}
        ref={node => {
          this.node = node;
        }}
      >
        {children}
      </Orbiter>
    );
  }
}

const Orbiter = styled.div`
  display: inline-block;
`;

export default EndlessRotation;
