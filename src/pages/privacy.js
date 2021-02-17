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
        <em>Last updated: May 1st 2019</em>.{' '}
        <TextLink to="/privacy-2019-02-28">View older policy</TextLink>.
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
        Tinkersynth no longer features a store, and as such, we don't collect
        very much personally-identifiable information anymore.
      </Paragraph>

      <Paragraph>
        The one area where personal information is still explicitly collected is
        our <TextLink to="/contact">contact form</TextLink>. This form collects
        a name, email address, and message, and is sent directly to my email
        inbox by my server. This data is not persisted in any database.
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
      <Heading size={4}>Social Trackers</Heading>
      <Spacer size={UNIT * 2} />

      <Paragraph>
        Tinkersynth now uses Google Analytics to grant insights into how people
        are using the product. Before May 1st, I used{' '}
        <TextLink to="https://usefathom.com/">Fathom</TextLink>, but as
        Tinkersynth is transforming from a for-profit store to a
        100%-free-to-use service, it is no longer financially viable to continue
        paying for a premium analytics service.
      </Paragraph>
      <Paragraph>
        There are valid concerns around privacy when it comes to Google
        products, but I've attempted to mitigate these concerns by taking a few
        measures:
      </Paragraph>

      <List>
        <List.Item>
          I've disabled automatic information sharing between Google products.
        </List.Item>
        <List.Item>
          I've disabled all remarketing and advertising reporting features
        </List.Item>
        <List.Item>
          I've reduced the event data retention period to 14 months, the lowest
          option possible
        </List.Item>
        <List.Item>
          I've turned on IP anonymization, so that Google doesn't store your IP
          address when visiting Tinkersynth
        </List.Item>
        <List.Item>
          I've enabled the "Respect Do-Not-Track" setting. I believe this means
          that if you have "Do-Not-Track" enabled, Google Analytics will not
          gather any information about your session, nor will it be available to
          me.
        </List.Item>
      </List>

      <Paragraph>
        Tinkersynth does not use any Facebook or Twitter SDKs.
      </Paragraph>

      <Spacer size={UNIT * 4} />
      <Heading size={4}>Data Usage</Heading>
      <Spacer size={UNIT * 2} />

      <Paragraph>
        When contacting me, either by email or through our{' '}
        <TextLink to="/contact">contact form</TextLink>, I use that data to
        respond to your query.
      </Paragraph>

      <Paragraph>
        The analytics data collected through Mixpanel and Google Analytics is
        used to inform product decisions. For example, I may drop the least-used
        controls from the Slopes machine, and replace it with a more exciting
        control (I recently did exactly this, removing the "dark mode" and
        "margins" controls in favor of the color swatch options).
      </Paragraph>

      <Paragraph>
        If you are one of the people who purchased a print or digital download
        prior to April 29th, I may reach out to you via email, in a personal
        non-automated way, to ask for your feedback once you've received your
        artwork. This is not a newsletter, or any sort of bulk mail. I'm just
        keen to hear what folks do with the art they buy. I may request photos
        of the art, to display on the Tinkersynth homepage. Of course this is
        entirely voluntary, and if you'd rather never hear from me, please just
        reply to my email and let me know. I'll disappear like a phantom.
      </Paragraph>

      <Paragraph>
        <strong>The above usages are exclusive.</strong> I have no newsletter,
        and if I do create one later, existing customers won't be
        auto-subscribed. I won't sell or share any of the data I've collected.
        I'm not here for that.
      </Paragraph>

      <Spacer size={UNIT * 4} />
      <Heading size={4}>Cookies & Local Storage</Heading>
      <Spacer size={UNIT * 2} />

      <Paragraph>Tinkersynth doesn't use cookies at all.</Paragraph>

      <Paragraph>
        Tinkersynth does use localStorage, an alternative storage mechanism, to
        track a few things:
      </Paragraph>

      <List>
        <List.Item>
          A random UUID which identifies the current device, generated on first
          visit
        </List.Item>
        <List.Item>
          The current settings for the Slopes machine (this is a convenience for
          the user, so that their work isn't destroyed when navigating away from
          the page).
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
        email to me@joshwcomeau.com, or use the handy{' '}
        <TextLink to="/contact">contact page</TextLink>.
      </Paragraph>

      <Spacer size={UNIT * 12} />
    </LayoutSidePage>
  );
};

export default PrivacyPolicy;
