// @flow
import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import Icon from 'react-icons-kit';
import { facebook_1 as facebookIcon } from 'react-icons-kit/ikons/facebook_1';
import { twitter as twitterIcon } from 'react-icons-kit/ikons/twitter';

import { UNIT, COLORS } from '../constants';

import LayoutSidePage from '../components/LayoutSidePage';
import SEO from '../components/SEO';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import List from '../components/List';

const PrivacyPolicy = () => {
  return (
    <LayoutSidePage pageId="privacy-policy" title="Privacy Policy">
      <SEO title="Privacy Policy" url="https://tinkersynth.com/slopes/" />

      <Paragraph>
        <em>Last updated: February 14th</em>
      </Paragraph>

      <Paragraph>
        Tinkersynth is a 1-person show: It's created and run by me, Josh Comeau.
        I like when my privacy is protected and respected, and can assume the
        same is true for you. This policy describes what data I collect and how
        it's used, and it does so in plain English, because that's the world I
        wish we lived in.
      </Paragraph>

      <Spacer size={UNIT * 4} />
      <Heading size={4}>Personal Data collected</Heading>
      <Spacer size={UNIT * 2} />

      <Paragraph>
        The main method of personal data collection happens when you purchase
        artwork created through the Tinkersynth machines. We use Stripe for our
        payment processor, and we delegate the hard work of collecting and
        protecting sensitive information to them.
      </Paragraph>

      <Paragraph>
        Tinkersynth never collects information like your credit card number (or
        other payment details), nor your billing address.
      </Paragraph>

      <Paragraph>
        I <em>do</em> collect your name and email. If you are purchasing a
        package that includes a physical print, I also collect your shipping
        address.
      </Paragraph>

      <Paragraph>
        We also offer a contact form, for your convenience. This form collects a
        name, email address, and message, and is sent directly to my email
        address.
      </Paragraph>

      <Spacer size={UNIT * 4} />
      <Heading size={4}>Non-Personal Data collected</Heading>
      <Spacer size={UNIT * 2} />

      <Paragraph>
        Tinkersynth uses <TextLink to="https://mixpanel.com">Mixpanel</TextLink>{' '}
        to track events. The philosophy behind this collection is to understand
        how the product is used. Note that it is not at all connected to any
        personally-identifiable information. Upon the first connection from a
        device, a random UUID is generated and used as an identifier. This
        information is never connected to your name, email, etc.
      </Paragraph>

      <Paragraph>Examples of non-personal data collection include:</Paragraph>

      <List>
        <List.Item>Number of visits</List.Item>
        <List.Item>Button clicks</List.Item>
        <List.Item>Initiate checkout</List.Item>
        <List.Item>Errors</List.Item>
      </List>

      <Spacer size={UNIT * 4} />
      <Heading size={4}>Data Usage</Heading>
      <Spacer size={UNIT * 2} />

      <Paragraph>
        There are two products available through Tinkersynth, which can be
        purchased separately, or combined into a pack: <em>source images</em> or{' '}
        <em>Giclée prints</em>. The data usage depends on which item(s) are
        selected.
      </Paragraph>

      <Paragraph>
        For source images, the artwork is produced on a server, and download
        links are sent in an email to the email address provided, using the
        first/last name within that email.
      </Paragraph>

      <Paragraph>
        For Giclée prints, your first/last name and shipping address are used to
        ship the artwork purchased. I share this information with the printing
        shop, as they handle order fulfillment. For prints, I also use the
        first/last name and email address to send a confirmation email, once the
        print has shipped.
      </Paragraph>

      <Paragraph>
        Our contact form uses the contact data collected to respond to your
        inquiry.
      </Paragraph>

      <Paragraph>
        The above usages are exclusive. I won't use your email address to send
        you unrequested marketing newsletters. I won't sell your personal data.
        I'm not here for that.
      </Paragraph>

      <Paragraph>
        The non-personal analytics information collected is used exclusively by
        Josh Comeau to understand how Tinkersynth is being used, and to educate
        future product changes.
      </Paragraph>

      <Spacer size={UNIT * 4} />
      <Heading size={4}>Cookies & Local Storage</Heading>
      <Spacer size={UNIT * 2} />

      <Paragraph>
        Tinkersynth doesn't use cookies at all. GDPR compliance without a huge
        page-blocking banner 👌🏻.
      </Paragraph>

      <Paragraph>
        On the other hand, Tinkersynth does use localStorage, an alternative
        storage mechanism, to track a few things:
      </Paragraph>

      <List>
        <List.Item>
          The random UUID which identifies the current device
        </List.Item>
        <List.Item>
          The current settings for the Slopes machine (this is a convenience for
          the user, so that their work isn't destroyed when navigating away from
          the page).
        </List.Item>
        <List.Item>
          Checkout settings, again for the convenience of the user.
        </List.Item>
        <List.Item>
          The number of page-loads from this device. This is used to tweak the
          experience (for example, the loading screen is less elaborate after
          the 4th visit).
        </List.Item>
      </List>

      <Spacer size={UNIT * 4} />
      <Heading size={4}>Contact</Heading>
      <Spacer size={UNIT * 2} />

      <Paragraph>
        If anything about this policy is unclear, please reach out. Send an
        email to <a href="mailto:josh@tinkersynth.com">josh@tinkersynth.com</a>.
      </Paragraph>

      <Spacer size={UNIT * 12} />
    </LayoutSidePage>
  );
};

export default PrivacyPolicy;
