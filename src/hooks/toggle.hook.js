// @flow
import { useState, useEffect } from 'react';

const useToggle = (defaultValue: boolean) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => setValue(!value);

  return [value, toggle];
};

export default useToggle;
