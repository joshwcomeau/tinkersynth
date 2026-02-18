import React from 'react';

const noop = () => {};

export default function useLocalStorageState(key, defaultValue) {
  if (typeof window === 'undefined') {
    return [null, noop];
  }

  const [value, setValue] = React.useState(() => {
    let initialValue = window.localStorage.getItem(key);
    if (typeof initialValue === 'undefined') {
      initialValue = defaultValue;
    }

    return initialValue;
  });

  const wrappedSetter = value => {
    window.localStorage.setItem(key, value);
    setValue(value);
  };

  return [value, wrappedSetter];
}
