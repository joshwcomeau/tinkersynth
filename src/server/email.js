import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Purchase from './email-templates/purchase';

const postmark = require('postmark');

// Send an email:
var client = new postmark.ServerClient('b79d4a35-93f3-49b3-ab72-8278293863f6');

export const sendArtVectorEmail = (
  name,
  email,
  format,
  svgUrl,
  pngUrlTransparent,
  pngUrlOpaque
) => {
  if (process.env.NODE_ENV !== 'production') {
    email = 'josh@tinkersynth.com';
  }

  client.sendEmail({
    From: 'josh@tinkersynth.com',
    To: email,
    Subject: 'Your art is ready to be downloaded!',
    HtmlBody: ReactDOMServer.renderToStaticMarkup(
      <Purchase
        format={format}
        name={name}
        svgUrl={svgUrl}
        pngUrlTransparent={pngUrlTransparent}
        pngUrlOpaque={pngUrlOpaque}
      />
    ),
  });
};
