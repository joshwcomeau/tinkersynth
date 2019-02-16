// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../constants';
import cc0Badge from '../images/cc0-badge.png';

import LayoutSidePage from '../components/LayoutSidePage';
import QuestionAndAnswer from '../components/QuestionAndAnswer';
import Paragraph from '../components/Paragraph';
import Heading from '../components/Heading';
import List from '../components/List';
import TextLink from '../components/TextLink';

const FAQ = () => (
  <LayoutSidePage pageId="faq" title="Frequently Asked Questions">
    <Section>
      <Header>
        <Heading size={4} style={{ color: COLORS.violet[500] }}>
          General
        </Heading>
      </Header>
      <Questions>
        {/* Q1 */}
        <QuestionAndAnswer id="what-is-this" question="What is this exactly?">
          <Paragraph>
            Tinkersynth is a collection of software machines that can be used to
            produce unique{' '}
            <TextLink to="https://en.wikipedia.org/wiki/Generative_art">
              generative art
            </TextLink>{' '}
            via serendipitous experimentation.
          </Paragraph>

          <Paragraph>
            More concretely, Tinkersynth is an art store where you build art by
            poking at sliders and buttons. The goal isn't to provide a linear
            path to a specific piece of art, but rather to encourage
            experimentation. Tinkersynth prioritizes being delighted by
            unexpected effects rather than creating an intuitive, predictable
            tool.
          </Paragraph>

          <Paragraph>
            Once you're satisfied with your creation, you can{' '}
            <TextLink to="#purchase-options">purchase it</TextLink>! You can
            choose to buy a high-quality vector/raster download pack, a premium
            Giclée print, or both.
          </Paragraph>
        </QuestionAndAnswer>

        <Separator />

        {/* Q2 */}
        <QuestionAndAnswer
          id="what-is-generative-art"
          question="How does it work?"
        >
          <Paragraph>
            The machines on Tinkersynth are examples of generative art. Unlike
            most traditional forms of visual art, generative art is produced by
            an algorithm.
          </Paragraph>

          <Paragraph>
            An algorithm is a fancy computer word, but really it just means that
            the art is produced by following a set of discrete, repeatable
            steps. For example, the
            <TextLink to="https://en.wikipedia.org/wiki/Spirograph">
              Spirograph
            </TextLink>{' '}
            produces generative art by following an algorithm as well. You can
            produce 10 identical pieces by following the same steps, and you can
            produce different pieces by modifying those steps, or changing the
            input parameters (like which gear to use).
          </Paragraph>

          <Paragraph>
            The Slopes machine uses an algorithm inspired by{' '}
            <TextLink to="https://blogs.scientificamerican.com/blogs/assets/sa-visual/Image/SciAm_pulsar.jpg">
              data visualizations of electromagnetic radiation
            </TextLink>
            . In its simplest form, it draws each row 1 at a time, using a form
            of randomization known as perlin noise to come up with the slopes.
          </Paragraph>

          <Paragraph>
            The controls on the Slopes machine turn what would otherwise be a
            fairly static piece into something dynamic and unpredictable. There
            are 22 individual controls which each affect the algorithm. Some,
            like the "perspective" slider in the top left, are reasonably
            predictable: it controls the height and distance between rows.
            Others are more inscrutable, like the "split earth" control which
            uses the tangent function to remarkable effect. Each control affects
            how the others behave, and the result is that there are over
            1,000,000,000,000,000,000,000,000,000,000 possible outputs.
          </Paragraph>

          <Paragraph>
            If you're interested in learning more about creating generative art,{' '}
            <TextLink to="https://twitter.com/JoshWComeau">
              hit me up on Twitter
            </TextLink>
            !
          </Paragraph>
        </QuestionAndAnswer>
      </Questions>
    </Section>

    <Section>
      <Header>
        <Heading size={4} style={{ color: COLORS.violet[500] }}>
          Store
        </Heading>
      </Header>

      <Questions>
        {/* Q1 */}
        <QuestionAndAnswer
          id="purchase-options"
          question="What are the purchase options?"
        >
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

        <Separator />

        {/* Q2 */}
        <QuestionAndAnswer
          id="license"
          question="What's the license for purchased artwork?"
        >
          <Paragraph>
            Artwork created and purchased through Tinkersynth is released under
            a{' '}
            <strong>
              <TextLink to="https://creativecommons.org/share-your-work/public-domain/cc0/">
                Creative Commons Zero
              </TextLink>
            </strong>{' '}
            (CC0) license.
          </Paragraph>

          <TextLink to="https://creativecommons.org/share-your-work/public-domain/cc0/">
            <img src={cc0Badge} width={200} />
          </TextLink>
          <br />
          <br />

          <Paragraph>
            This license was chosen because it is the <em>most permissive</em>{' '}
            license available. It allows the artwork created and purchased
            through Tinkersynth to be used however you want, even commercially.
            You can use it as your next album cover, or produce and sell throw
            pillows with your design.
          </Paragraph>

          <Paragraph>
            Unlike most Creative Commons licenses, CC0 does not require any
            attribution. This means you can use your artwork without mentioning
            Tinkersynth at all (although we're grateful if you do!)
          </Paragraph>
        </QuestionAndAnswer>

        <Separator />

        {/* Q2 */}
        <QuestionAndAnswer question="How is the pricing calculated?">
          <Paragraph>
            When compared to other works from generative artists, Tinkersynth's
            prices are a bit higher. There are several reasons for this:
          </Paragraph>

          <List>
            <List.Item>
              Tinkersynth is a unique experience. You aren't just buying art
              from a Shopify shop, you're participating in its creation. You
              control the final output, and the sheer number of possible
              combinations—more than 10³²—means that your art is virtually
              guaranteed to be 100% unique.
              <br />
              <br />
              Creating this tool took an incredible amount of time, and so that
              effort is worked into the price.
            </List.Item>

            <List.Item>
              Worldwide free shipping is included on physical prints.
            </List.Item>

            <List.Item>
              The artwork produced is licensed as Creative Commons Zero, an
              incredibly permissive license for artwork. You can use the designs
              you purchase anywhere you'd like, even commercially, without
              attributing Tinkersynth.
            </List.Item>
          </List>

          <Paragraph>
            Because of these factors, we believe we've priced our product quite
            aggressively. Prices may rise in the future.
          </Paragraph>

          <Paragraph>
            Please note that low-res image downloads are available for free -
            right-click the canvas and select "Save Image As..." to download a
            raster .png image. While we hope that most folks will pay for
            high-res + vector formats, this is a great option if you want a new
            background image for your phone and can't afford the high-res
            download price.
          </Paragraph>
        </QuestionAndAnswer>
      </Questions>
    </Section>

    <Section>
      <Header>
        <Heading size={4} style={{ color: COLORS.violet[500] }}>
          Slopes Machine
        </Heading>
      </Header>

      <Questions>
        {/* Q1 */}

        <QuestionAndAnswer question="So, the performance...">
          <Paragraph>
            Not a question, but I take your point. The art-generation is pretty
            sluggish.
          </Paragraph>

          <Paragraph>
            There are a few tricks you can do to speed up the machine:
          </Paragraph>

          <Paragraph>
            Line occlusion is very expensive to calculate, and can be disabled
            with this control.
          </Paragraph>

          <Paragraph>
            Reducing the number of lines rendered can also greatly speed up the
            generation process.
          </Paragraph>

          <Paragraph>
            Even if you want to build a piece with many occluded lines, it can
            be helpful to tweak the other parameters with the above
            optimizations enabled, and then revert them to their desired values
            once you've created something you like.
          </Paragraph>
        </QuestionAndAnswer>

        <Separator />

        {/* Q2 */}
      </Questions>
    </Section>
  </LayoutSidePage>
);

const Section = styled.div`
  margin-bottom: ${UNIT * 8}px;

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

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
`;

export default FAQ;
