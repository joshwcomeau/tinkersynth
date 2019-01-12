import React from 'react';

const memoWhileIgnoring = (propsToIgnore, ComposedComponent) => {
  return class Gatekeeper extends React.Component {
    shouldComponentUpdate(nextProps) {
      const propsToCompare = Object.keys(nextProps).filter(
        p => !propsToIgnore.includes(p)
      );

      const hasAnyPropChanged = propsToCompare.find(propName => {
        return this.props[propName] !== nextProps[propName];
      });

      return !!hasAnyPropChanged;
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
};

export default memoWhileIgnoring;
