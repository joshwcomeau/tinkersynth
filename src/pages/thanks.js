// @flow
import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { facebook_1 as facebookIcon } from 'react-icons-kit/ikons/facebook_1';
import { twitter as twitterIcon } from 'react-icons-kit/ikons/twitter';

import { UNIT, COLORS } from '../constants';

import Layout from '../components/Layout';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import MountainsBg from '../components/MountainsBg';
import LoadScript from '../components/LoadScript/LoadScript';

var getWindowOptions = function() {
  var width = 500;
  var height = 350;
  var left = window.innerWidth / 2 - width / 2;
  var top = window.innerHeight / 2 - height / 2;

  return [
    'resizable,scrollbars,status',
    'height=' + height,
    'width=' + width,
    'left=' + left,
    'top=' + top,
  ].join();
};

const Finished = () => {
  const text = encodeURIComponent(
    'I just made some generative art with Tinkersynth :o'
  );
  const homeUrl = 'https://tinkersynth.com';
  var twitterShareUrl = `https://twitter.com/intent/tweet?url=${homeUrl}&text=${text}`;

  return (
    <Layout pageId="thanks" noHeader>
      <Background>
        <MountainsBg />
      </Background>
      <Foreground>
        <Wrapper>
          <MainContent>
            <Heading size={1}>Success!</Heading>
            <Spacer size={40} />
            <Paragraph style={{ fontSize: 21 }}>
              At this very moment, a computer in a server farm in Toronto is
              hard at work creating some high-resolution versions of your
              artwork. Within a few minutes, you should receive an email with
              links to download them!
            </Paragraph>

            <Paragraph style={{ fontSize: 21 }}>
              Your purchase is really appreciated. Thank you for being an early
              adopter!
            </Paragraph>

            <Spacer size={50} />

            <Paragraph style={{ fontSize: 21 }}>
              If you enjoyed creating art with this machine, spread the word!
              These buttons will help show your art to the world:
            </Paragraph>

            <Spacer size={20} />

            <ButtonsRow>
              <Button
                style="flat"
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
                <Icon icon={twitterIcon} /> <Spacer inline size={UNIT} />{' '}
                Twitter
              </Button>
              <Spacer size={20} />
              <Button
                style="flat"
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
          </MainContent>

          <Spacer size={UNIT * 2} />

          <ArtPreview />
        </Wrapper>
      </Foreground>
    </Layout>
  );
};

const Background = styled.div`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #9a9fa2;
`;

const Foreground = styled.div`
  position: relative;
  z-index: 1;
  padding-top: 10vh;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 960px;
  margin: auto;
  display: flex;
  background: #fff;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.16);
  padding: ${UNIT}px;
  border-radius: 8px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: ${UNIT * 4}px;
`;

const ArtPreview = styled.div`
  width: 320px;
  background: ${COLORS.gray[100]};
  border-radius: 4px;

  @media (max-width: 830px) {
    display: none;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
`;

export default Finished;
