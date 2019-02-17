/**
 * Ok so email is still stuck in 2003.
 * I'm in a hurry so this component will be a huge mess.
 */

import React from 'react';

import { COLORS } from '../../constants';

const Wrapper = ({ children }) => (
  <table
    width="100%"
    style={{
      fontSize: 18,
      lineHeight: 1.4,
      WebkitFontSmoothing: 'antialiased',
      fontFamily: 'sans-serif',
    }}
  >
    <tr>
      <td
        style={{
          backgroundColor: '#EEE',
          backgroundImage: `url(https://storage.googleapis.com/tinkersynth-email-assets/mountains.svg)`,
          backgroundSize: 'cover',
          padding: 50,
        }}
        align="center"
      >
        <div style={{ textAlign: 'left', maxWidth: 730 }}>
          <img
            src="https://storage.googleapis.com/tinkersynth-email-assets/logo-with-name.png"
            width={175}
            style={{ transform: 'translateX(-4px)' }}
          />
        </div>

        <table
          style={{
            maxWidth: 730,
          }}
        >
          <tr>
            <td
              style={{
                background: '#FFF',
                padding: 30,
                paddingTop: 20,
                borderRadius: 12,

                boxShadow: '0px 5px 50px rgba(0, 0, 0, 0.1)',
              }}
            >
              {children}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
);

const getFormatSpecificCopy = format => {
  switch (format) {
    case 'combo': {
      return (
        <p>
          Our server has been hard at work assembling the pieces of art you
          created through Tinkersynth, and they've just wrapped the job up. Your
          assets are available to download now!
        </p>
      );
    }

    case 'vector': {
      return (
        <p>Our servers have finished assembling the files you purchased.</p>
      );
    }

    default:
      throw new Error(`Unrecognized format: ${format}`);
  }
};

const PurchaseTemplate = ({
  orderId,
  format,
  name,
  svgUrl,
  pngUrlTransparent,
  pngUrlOpaque,
}) => (
  <Wrapper>
    <p>Hi {name},</p>

    <p>
      Good news - our server has been hard at work assembling the images of the
      art you created through Tinkersynth, and they've just wrapped the job up.
      Your assets are available to download now!
    </p>

    {format === 'combo' && (
      <p>
        Your order also included a physical art print. We'll send you another
        email once that has been printed and shipped.
      </p>
    )}

    <h4>Downloads</h4>

    <ul>
      <li>
        <a href={pngUrlOpaque} style={{ color: COLORS.blue[500] }}>
          Raster image (solid background)
        </a>
      </li>
      <li>
        <a href={pngUrlTransparent} style={{ color: COLORS.blue[500] }}>
          Raster image (transparent background)
        </a>
      </li>
      <li>
        <a href={svgUrl} style={{ color: COLORS.blue[500] }}>
          Vector image
        </a>
      </li>
    </ul>

    <br />

    <p>
      Thanks again for your purchase! This is a new art experiment, and your
      support is much appreciated 🙏.
    </p>

    <p>
      If you have any questions or comments, feel free to reply to this email.
      I'd love to hear from you!
    </p>

    <p
      style={{
        fontSize: 12,
        marginTop: 40,
        color: '#999',
        textAlign: 'center',
      }}
    >
      This email is in reference to Order #<em>{orderId}</em>.
    </p>
  </Wrapper>
);

export default PurchaseTemplate;
