// @flow
import React from 'react';

import Shelf from '../Shelf';
import Heading from '../Heading';

const DownloadShelf = ({ isVisible, handleToggle }) => {
  return (
    <Shelf isVisible={isVisible} handleToggle={handleToggle}>
      <Heading size={3}>Download</Heading>
      Blablabla
    </Shelf>
  );
};

export default DownloadShelf;
