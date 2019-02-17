// @flow
import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import Icon from 'react-icons-kit';
import { facebook_1 as facebookIcon } from 'react-icons-kit/ikons/facebook_1';
import { twitter as twitterIcon } from 'react-icons-kit/ikons/twitter';
import { arrowLeft } from 'react-icons-kit/feather/arrowLeft';

import { UNIT, COLORS } from '../constants';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Heading from '../components/Heading';
import Paragraph from '../components/Paragraph';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import Link from '../components/Link';
import MountainsBg from '../components/MountainsBg';
import CanvasFrame from '../components/CanvasFrame';
import LoadScript from '../components/LoadScript/LoadScript';

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

const Thanks = ({ location }) => {
  const { previewUrl, width, height } = queryString.parse(location.search);

  const text = encodeURIComponent(
    'I just made some generative art with Tinkersynth :o'
  );
  const homeUrl = 'https://tinkersynth.com';
  var twitterShareUrl = `https://twitter.com/intent/tweet?url=${homeUrl}&text=${text}`;

  return (
    <Layout pageId="thanks" noHeader transparentFooter>
      <SEO title="Slopes" url="https://tinkersynth.com/slopes/" />
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
                <Icon icon={twitterIcon} /> <Spacer inline size={UNIT} />{' '}
                Twitter
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
          </MainContent>

          <Spacer size={UNIT * 2} />

          <ArtPreview>
            {previewUrl && (
              <CanvasFrame>
                <img
                  src={previewUrl}
                  style={{ width: width / 2, height: height / 2 }}
                />
              </CanvasFrame>
            )}
          </ArtPreview>
        </Wrapper>

        <AfterWrapper>
          <Link to="/slopes" style={{ color: '#FFF' }}>
            <Icon icon={arrowLeft} size={24} /> Create another piece
          </Link>
        </AfterWrapper>
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
  background: hsl(0, 0%, 12%);
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

const AfterWrapper = styled.div`
  width: 90%;
  max-width: 960px;
  margin: auto;
  line-height: 65px;
  font-size: 18px;
  color: #fff;
`;

const MainContent = styled.div`
  flex: 1;
  padding: ${UNIT * 4}px;
`;

const ArtPreview = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${UNIT * 5}px;
  background: hsl(0, 0%, 94%);
  border-radius: 4px;

  @media (max-width: 830px) {
    display: none;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
`;

export default Thanks;
