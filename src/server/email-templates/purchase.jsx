/**
 * Ok so email is still stuck in 2003.
 * I'm in a hurry so this component will be a huge mess.
 */

import React from 'react';

const Wrapper = ({ children }) => (
  <table width="100%">
    <tr>
      <td style={{ background: '#EEE' }} align="center">
        <table width={600}>
          <tr>
            <td style={{ background: '#FFF', padding: 20 }}>{children}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
);

const getFormatSpecificCopy = format => {
  switch (format) {
    case 'print': {
      return (
        <p>
          Your print will soon be processed, and I'll let you know when it's in
          the mail. In the meantime, though, I want you to have the
          vector/raster files ASAP. They're yours, to do with whatever you'd
          like!
        </p>
      );
    }

    case 'vector': {
      return (
        <p>
          My computer robots just finished assembling and preparing your
          high-fidelity raster download, to accompany the vector one you created
          in Tinkersynth.
        </p>
      );
    }

    default:
      throw new Error(`Unrecognized format: ${format}`);
  }
};

const PurchaseTemplate = ({ format, userName, svgUrl, pngUrl }) => (
  <Wrapper>
    <h1>Your art is ready for download</h1>

    <p>Hi {userName}!</p>

    {getFormatSpecificCopy(format)}

    <ul>
      <li>
        <a href={pngUrl}>Raster image (solid background)</a>
      </li>
      <li>
        <a href={pngUrl}>Raster image (transparent background)</a>
      </li>
      <li>
        <a href={svgUrl}>Vector image</a>
      </li>
    </ul>

    <p>
      Thanks again for your purchase! This is a new art experiment, and your
      support is much appreciated 🙏.
    </p>
  </Wrapper>
);

export default PurchaseTemplate;
