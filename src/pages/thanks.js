// @flow
import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import Icon from 'react-icons-kit';
import { facebook_1 as facebookIcon } from 'react-icons-kit/ikons/facebook_1';
import { twitter as twitterIcon } from 'react-icons-kit/ikons/twitter';
import { arrowLeft } from 'react-icons-kit/feather/arrowLeft';

import { UNIT, COLORS } from '../constants';
import headerSwoops from '../images/header-swoops.svg';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Heading from '../components/Heading';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import Link from '../components/Link';
import Star from '../components/Star';
import Particle from '../components/Particle';
import CanvasFrame from '../components/CanvasFrame';
import LoadScript from '../components/LoadScript/LoadScript';
import SwoopyBackground from '../components/SwoopyBackground/SwoopyBackground';
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
            At this very moment, a computer in a server farm in Toronto is hard
            at work generating high-definition images for the art you created.
            You should receive an email within a few minutes with links to
            download your artwork!
          </Paragraph>
        </>
      );

    case 'combo':
      return (
        <>
          <Paragraph>
            At this very moment, a bunch of stuff is happening on a computer
            deep in a Toronto server farm. It's creating high-definition images
            for the artwork you created, and sending them across the internet.
            You'll receive a copy in your email inbox within a few minutes, and
            we'll begin producing your fine-art print shortly after that.
          </Paragraph>
        </>
      );

    case 'print':
      return (
        <>
          <Paragraph>
            We'll contact you within a couple days to let you know when your
            fine art print has been produced, and is being shipped.
          </Paragraph>
        </>
      );
  }
};

const Thanks = ({ location }) => {
  const { previewUrl, format, width, height } = queryString.parse(
    location.search
  );

  const text = encodeURIComponent(
    'I just created some generative art with Tinkersynth!'
  );
  const homeUrl = 'https://tinkersynth.com';
  var twitterShareUrl = `https://twitter.com/intent/tweet?url=${homeUrl}&text=${text}`;

  return (
    <Layout pageId="thanks" theme="dark" noHeaderBorder>
      <SEO title="Slopes" url="https://tinkersynth.com/slopes/" />

      <SwoopyBackground width="100vw" height={175} />

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

          <Paragraph>
            At this very moment, a computer in a server farm near Toronto,
            Canada is working hard to produce high-definition print-ready image
            files using the specifications you provided.
          </Paragraph>

          <Paragraph>
            In a minute or two, you should receive an email with download links.
            <br />I hope your new artwork sparks a lot of joy.
          </Paragraph>

          {getCopyForFormat(format)}

          <Spacer size={50} />

          <Paragraph>
            If you enjoyed creating art with this machine, spread the word!
            These buttons will help show your art to the world:
          </Paragraph>

          <ButtonsRow>
            <Button
              kind="flat"
              color="hsl(203, 89%, 53%)"
              onClick={ev => {
                ev.preventDefault();
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
`;

export default Thanks;
