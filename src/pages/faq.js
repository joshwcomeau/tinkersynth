// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../constants';

import LayoutSidePage from '../components/LayoutSidePage';
import QuestionAndAnswer from '../components/QuestionAndAnswer';
import Paragraph from '../components/Paragraph';
import Heading from '../components/Heading';
import List from '../components/List';
import TextLink from '../components/TextLink';

const SlopesIndex = () => (
  <LayoutSidePage pageId="faq" title="Frequently Asked Questions">
    <Section>
      <Header>
        <Heading size={4} style={{ color: COLORS.violet[500] }}>
          General
        </Heading>
      </Header>
      <Questions>
        <QuestionAndAnswer id="what-is-this" question="Er, so, what is this?">
          <Paragraph>
            Tinkersynth is an experimental tool. It lets you create unique [FIND
            A LINK]generative art[/].
          </Paragraph>

          <Paragraph>
            Generative art is an umbrella term for art created by writing
            software that generates it. In this case, I wrote code that uses
            Perlin noise and trigonometry to create sloped lines.
          </Paragraph>

          <Paragraph>
            The code for this project has parameters that can be tweaked.
            Initially these parameters were pretty straightforward, things like
            the distance between each line... but I kept having ideas for
            alternative ways that the code could work, and as the number of
            parameters grew, the number of possible combinations exploded.
          </Paragraph>

          <Paragraph>
            I started to realize that this wasn't just making small tweaks to a
            generally consistent experience anymore; entirely different pieces
            of art could be created, by experimenting with different
            combinations. This is kind of like a hyper-specialized Photoshop;
            it's a tool to create, not just subtly alter.
          </Paragraph>

          <Paragraph>
            In addition to creating art through the tool, you can also{' '}
            <TextLink to="#purchase-options">purchase it</TextLink>! This is the
            mechanism I'm using to fund the time I invested creating this tool.
            If it does well, that'll encourage me to create new machines, with
            different settings and possible outputs.
          </Paragraph>
        </QuestionAndAnswer>
      </Questions>
    </Section>

    <Section>
      <Header>
        <Heading size={4} style={{ color: COLORS.violet[500] }}>
          Purchasing
        </Heading>
      </Header>

      <Questions>
        <QuestionAndAnswer question="What are the purchase options?">
          <Paragraph>
            The art you create through Tinkersmith can be purchased in two
            formats: <strong>print</strong> and <strong>download</strong>.
          </Paragraph>

          <br />
          <Heading size={4}>Download</Heading>
          <br />
          <Paragraph>
            The "download" option lets you order the raw image files, to be sent
            via email shortly after purchase. This is a great option for folks
            who want to put their art on a T-shirt, or use as a desktop
            background.
          </Paragraph>

          <Paragraph>
            You can do whatever you want with the image, you retain the rights
            to it. Both raster and vector formats are supplied, so you can
            modify them however you wish in Illustrator or Photoshop.
          </Paragraph>

          <Paragraph>The files included with purchase are:</Paragraph>

          <List>
            <List.Item>
              A raster .png, which can be sent straight to print shops. I chose
              .png over .jpg because .pngs tend to have fewer compression
              artifacts. Online tools can be used to convert to jpg if required.
            </List.Item>
            <List.Item>
              A vector .svg, which can be used to create raster images at any
              size.
            </List.Item>
          </List>

          <br />
          <Heading size={4}>Download</Heading>
          <br />

          <Paragraph>
            "Print" allows you to purchase a physical Giclée print, shipped
            right to your door. After experimenting with a couple options, I
            chose Epson ultra-premium lustre paper, a heavy 240-gsm acid-free
            paper whose ink retention captures rich, deep blacks. The ink is a
            high-quality archival ink with solid monochromatic reproduction.
          </Paragraph>

          <Paragraph>Prints are shipped in a rolled tube.</Paragraph>

          <Paragraph>The other option, "download", instead provides</Paragraph>

          <Paragraph>
            Even if you want to build a piece with many occluded lines, it can
            be helpful to tweak the other parameters with the above
            optimizations enabled, and then revert them to their desired values
            once you've created something you like.
          </Paragraph>
        </QuestionAndAnswer>
      </Questions>
    </Section>

    <QuestionAndAnswer question="What are the purchase options?">
      <Paragraph>
        The art you create through Tinkersmith can be purchased in two formats:{' '}
        <strong>print</strong> and <strong>download</strong>.
      </Paragraph>

      <br />
      <Heading size={4}>Download</Heading>
      <br />
      <Paragraph>
        The "download" option lets you order the raw image files, to be sent via
        email shortly after purchase. This is a great option for folks who want
        to put their art on a T-shirt, or use as a desktop background.
      </Paragraph>

      <Paragraph>
        You can do whatever you want with the image, you retain the rights to
        it. Both raster and vector formats are supplied, so you can modify them
        however you wish in Illustrator or Photoshop.
      </Paragraph>

      <Paragraph>The files included with purchase are:</Paragraph>

      <List>
        <List.Item>
          A raster .png, which can be sent straight to print shops. I chose .png
          over .jpg because .pngs tend to have fewer compression artifacts.
          Online tools can be used to convert to jpg if required.
        </List.Item>
        <List.Item>
          A vector .svg, which can be used to create raster images at any size.
        </List.Item>
      </List>

      <br />
      <Heading size={4}>Download</Heading>
      <br />

      <Paragraph>
        "Print" allows you to purchase a physical Giclée print, shipped right to
        your door. After experimenting with a couple options, I chose Epson
        ultra-premium lustre paper, a heavy 240-gsm acid-free paper whose ink
        retention captures rich, deep blacks. The ink is a high-quality archival
        ink with solid monochromatic reproduction.
      </Paragraph>

      <Paragraph>Prints are shipped in a rolled tube.</Paragraph>

      <Paragraph>The other option, "download", instead provides</Paragraph>

      <Paragraph>
        Even if you want to build a piece with many occluded lines, it can be
        helpful to tweak the other parameters with the above optimizations
        enabled, and then revert them to their desired values once you've
        created something you like.
      </Paragraph>
    </QuestionAndAnswer>

    <QuestionAndAnswer question="So, the performance...">
      <Paragraph>
        Not a question, but I take your point. The art-generation is pretty
        sluggish.
      </Paragraph>

      <Paragraph>
        There are a few tricks you can do to speed up the machine:
      </Paragraph>

      <Paragraph>
        Line occlusion is very expensive to calculate, and can be disabled with
        this control.
      </Paragraph>

      <Paragraph>
        Reducing the number of lines rendered can also greatly speed up the
        generation process.
      </Paragraph>

      <Paragraph>
        Even if you want to build a piece with many occluded lines, it can be
        helpful to tweak the other parameters with the above optimizations
        enabled, and then revert them to their desired values once you've
        created something you like.
      </Paragraph>
    </QuestionAndAnswer>
  </LayoutSidePage>
);

const Section = styled.div`
  @media (min-width: 800px) {
    display: flex;
  }
`;

const Header = styled.div`
  display: none;

  @media (min-width: 800px) {
    display: block;
    padding-top: ${UNIT * 4}px;
    line-height: 32px;
    width: 300px;
  }
`;

const Questions = styled.div`
  flex: 1;
`;

export default SlopesIndex;
