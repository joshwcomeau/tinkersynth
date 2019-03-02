// @flow
import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import Icon from 'react-icons-kit';
import { facebook_1 as facebookIcon } from 'react-icons-kit/ikons/facebook_1';
import { twitter as twitterIcon } from 'react-icons-kit/ikons/twitter';
import { arrowLeft } from 'react-icons-kit/feather/arrowLeft';

import { UNIT, COLORS } from '../constants';
import analytics from '../services/analytics.service';
import headerSwoops from '../images/header-swoops.svg';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Heading from '../components/Heading';
import Spacer from '../components/Spacer';
import Hr from '../components/Hr';
import Button from '../components/Button';
import Link from '../components/Link';
import Star from '../components/Star';
import Particle from '../components/Particle';
import UnstyledButton from '../components/UnstyledButton';
import CanvasFrame from '../components/CanvasFrame';
import SwoopyBackground from '../components/SwoopyBackground';
import Spin from '../components/Spin';

const getWindowOptions = () => {
  const width = 500;
  const height = 350;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  return [
    'resizable,scrollbars,status',
    'height=' + height,
    'width=' + width,
    'left=' + left,
    'top=' + top,
  ].join();
};

const getCopyForFormat = format => {
  switch (format) {
    case 'vector':
      return (
        <>
          <Paragraph>
            At this very moment, a computer in a server farm near Toronto,
            Canada is working hard to produce high-definition print-ready image
            files using the specifications you provided.
          </Paragraph>

          <Paragraph>
            In a minute or two, you should receive an email with download links.
          </Paragraph>
        </>
      );

    case 'combo':
      return (
        <>
          <Paragraph>
            At this very moment, a computer in a server farm near Toronto,
            Canada is working hard to produce high-definition print-ready image
            files using the specifications you provided.
          </Paragraph>

          <Paragraph>
            In a few minutes, you'll receive an email with download links for
            your digital image assets. We'll start work soon on your physical
            fine art print, and let you know when it's shipped.
          </Paragraph>
        </>
      );

    case 'print':
      return (
        <>
          <Paragraph>
            At this very moment, a computer in a server farm near Toronto,
            Canada is hard at work preparing your artwork. We'll print it within
            the next few days, and let you know when it's shipped.
          </Paragraph>
        </>
      );
  }
};

const Thanks = ({ location }) => {
  const { format } = queryString.parse(location.search);

  const text = encodeURIComponent(
    'Create unique generative art with Tinkersynth'
  );
  const homeUrl = 'https://tinkersynth.com';
  var twitterShareUrl = `https://twitter.com/intent/tweet?url=${homeUrl}&text=${text}`;

  return (
    <Layout pageId="thanks" theme="dark" noHeaderBorder>
      <SEO title="Slopes" url="https://tinkersynth.com/slopes/" />

      <SwoopyBackground width="100%" height={175} />

      <Foreground>
        <Wrapper>
          <Particle
            fadeIn
            angle={-100}
            distance={32}
            spinFrom={-30}
            top={-20}
            left={35}
          >
            <Star />
          </Particle>
          <Particle
            fadeIn
            angle={-140}
            distance={20}
            spinFrom={-10}
            top={-12}
            left={-5}
          >
            <Star />
          </Particle>
          <Particle
            fadeIn
            angle={-170}
            distance={35}
            spinFrom={-60}
            top={10}
            left={-5}
          >
            <Star />
          </Particle>
          <Particle
            fadeIn
            angle={-155}
            distance={41}
            spinFrom={-40}
            top={-15}
            left={-30}
          >
            <Star />
          </Particle>

          <Particle
            fadeIn
            angle={-20}
            distance={30}
            spinFrom={-30}
            top={-15}
            left={300}
          >
            <Star />
          </Particle>

          <Particle
            fadeIn
            angle={-10}
            distance={43}
            spinFrom={-50}
            top={5}
            left={330}
          >
            <Star />
          </Particle>

          <Heading size={3} style={{ fontSize: 36 }}>
            Purchase confirmed!
          </Heading>
          <Spacer size={40} />

          {getCopyForFormat(format)}

          <Paragraph>Thanks for creating with Tinkersynth!</Paragraph>

          <Spacer size={32} />
          <Hr />
          <Spacer size={64} />

          <Heading size={4}>Spread the word</Heading>
          <Spacer size={16} />
          <Paragraph>
            You're one of the very first people to use Tinkersynth! If you
            enjoyed it, could you please share it with your network, so they can
            discover it as well?
          </Paragraph>

          <Spacer size={16} />
          <ButtonsRow>
            <Button
              kind="flat"
              color="hsl(203, 89%, 53%)"
              onClick={ev => {
                ev.preventDefault();

                analytics.logEvent('share-after-purchase', {
                  network: 'twitter',
                });

                const win = window.open(
                  twitterShareUrl,
                  'ShareOnTwitter',
                  getWindowOptions()
                );
                win.opener = null;
              }}
            >
              <Icon icon={twitterIcon} /> <Spacer inline size={UNIT} /> Twitter
            </Button>
            <Spacer size={20} />
            <Button
              kind="flat"
              color="hsl(221, 44%, 41%)"
              onClick={ev => {
                ev.preventDefault();

                analytics.logEvent('share-after-purchase', {
                  network: 'facebook',
                });

                const win = window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${homeUrl}`,
                  'facebook-share-dialog',
                  'width=800,height=600'
                );

                win.opener = null;
              }}
            >
              <Icon icon={facebookIcon} /> <Spacer inline size={UNIT} />{' '}
              Facebook
            </Button>
          </ButtonsRow>

          <Spacer size={32} />
          <Hr />
          <Spacer size={64} />

          <Heading size={4}>Create more art</Heading>
          <Spacer size={16} />
          <Paragraph>
            Continue experimenting to discover what else the Slopes machine can
            do.
          </Paragraph>

          <Spacer size={32} />
          <CreateMoreArtButton
            as={Link}
            to="/slopes"
            onClick={() => {
              analytics.logEvent('continue-creating-after-purchase');
            }}
          >
            <Icon icon={arrowLeft} size={24} /> <Spacer inline size={UNIT} />{' '}
            Continue creating
          </CreateMoreArtButton>

          <Spacer size={UNIT * 2} />
        </Wrapper>

        <Spacer size={100} />
      </Foreground>
    </Layout>
  );
};

const Background = styled.img`
  position: relative;
  width: 100%;
`;

const Foreground = styled.div`
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 750px;
  margin: auto;
  color: ${COLORS.white};
`;

const Paragraph = styled.p`
  line-height: 1.3;
  font-size: 22px;
  margin-bottom: ${UNIT * 3}px;
`;

const ButtonsRow = styled.div`
  display: flex;
  /* justify-content: center; */
`;
const DesktopOnly = styled.div`
  @media screen and (max-width: 500px) {
    display: none;
  }
`;
const CreateMoreArtButton = styled(UnstyledButton)`
  width: 270px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.white};
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export default Thanks;
