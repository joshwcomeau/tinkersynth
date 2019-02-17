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
  // Don't send email in development
  if (process.env.node_env !== 'production') {
    return;
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

export const notifyMe = (name, email, format, cost, chargeId) => {
  // Don't send email in development
  if (process.env.node_env !== 'production') {
    return;
  }

  client.sendEmail({
    From: 'josh@tinkersynth.com',
    To: email,
    Subject: 'New purchase on Tinkersynth!',
    TextBody: `
Yay new order!

chargeId: ${chargeId}
name:     ${name}
email:    ${email}
format:   ${format}
cost:     ${cost / 100}`,
  });
};

// Method to handle the contact form, for customer inquiries.
export const sendContactEmail = (
  firstName,
  lastName,
  email,
  subject,
  message
) => {
  // Don't send email in development
  if (process.env.node_env !== 'production') {
    return new Promise(resolve =>
      resolve({
        test: true,
      })
    );
  }

  return client
    .sendEmail({
      From: 'josh@tinkersynth.com',
      To: 'josh@tinkersynth.com',
      Subject: 'Contact form submission on Tinkersynth.com',
      TextBody: `
From:
    ${firstName} ${lastName} <${email}>

Subject:
    ${subject}

Message:
${message}
`,
    })
    .catch(err => {
      console.error(err);

      throw new Error(err);
    });
};
