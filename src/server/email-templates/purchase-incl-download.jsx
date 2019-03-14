/**
 * Ok so email is still stuck in 2003.
 * I'm in a hurry so this component will be a huge mess.
 */

import React from 'react';

import { COLORS } from '../../constants';

import Wrapper from './wrapper';

const PurchaseIncludingDownload = ({
  orderId,
  format,
  name,
  svgUrl,
  pngUrlTransparent,
  pngUrlOpaque,
}) => (
  <Wrapper>
    {name && <p>Hi {name}!</p>}

    <p>
      Good news - our servers in Toronto have been hard at work assembling your
      art, pixel by pixel, and they've just completed the job.
    </p>

    {format === 'vector' && (
      <>
        <p>
          We've produced two print-ready raster images, and a scalable vector
          image. We hope that these assets will be useful for whatever creative
          endeavors you have in mind.
        </p>
      </>
    )}

    {format === 'combo' && (
      <>
        <p>
          Your purchase includes digital asset downloads, and this email
          includes the 3 image files we've produced.
        </p>
        <p>
          We'll email you in a few days to let you know when your physical fine
          art print has shipped.
        </p>
      </>
    )}

    <h4>Downloads</h4>

    <ul>
      <li style={{ marginBottom: 20 }}>
        <strong>
          <a href={pngUrlOpaque} style={{ color: COLORS.blue[500] }}>
            Raster image (solid background)
          </a>
        </strong>
        <br />
        This 300dpi .png file can be sent straight to your local print shop for
        printing.
      </li>
      <li style={{ marginBottom: 20 }}>
        <strong>
          <a href={pngUrlTransparent} style={{ color: COLORS.blue[500] }}>
            Raster image (transparent background)
          </a>
        </strong>
        <br />
        This 300dpi .png file uses a transparent background. Use this file if
        you're printing onto a shirt, or want to change the background color.
      </li>
      <li style={{ marginBottom: 20 }}>
        <strong>
          <a href={svgUrl} style={{ color: COLORS.blue[500] }}>
            Vector image
          </a>
        </strong>
        <br />
        This infinitely-scalable .svg can be thought of as a film negative; it
        can be used to produce raster images of any size.
        <br />
        <br />
        <strong>(Right-click and "Save as" to download)</strong>
      </li>
    </ul>

    <br />

    <h4>Jpeg conversion</h4>

    <p>
      We've chosen the Portable Network Graphics (.png) format for our raster
      images, because they produce less compression artifacts than jpegs. If
      your print shop only accepts .jpg/.jpeg images, though, you can use an{' '}
      <a href="https://png2jpg.com/">online conversion tool</a> to quickly
      convert your .png into a .jpg.
    </p>

    <h4>Continue Working</h4>

    <p>
      Want to keep iterating on the design you came up with for this print? This
      special link will initialize the machine to the settings used for this
      order, so you can always pick up from where you left off with your order:
    </p>

    <a href={`https://tinkersynth.com/slopes?orderId=${orderId}`}>
      https://tinkersynth.com/slopes?orderId={orderId}
    </a>

    <br />
    <br />
    <hr />

    <p>
      Thanks again for your purchase! This is a new art experiment, and your
      support is much appreciated 🙏.
    </p>

    <p>
      If you have any questions or comments, feel free to reply to this email.
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

export default PurchaseIncludingDownload;
