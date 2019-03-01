// @flow
import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';

import { COLORS, UNIT } from '../constants';
import { smoothScrollTo } from '../utils';
import cc0Badge from '../images/cc0-badge.png';
import faqPerfCount from '../videos/faq-perf-count.mp4';
import faqPerfOcclusion from '../videos/faq-perf-occ.mp4';

import LayoutSidePage from '../components/LayoutSidePage';
import QuestionAndAnswer from '../components/QuestionAndAnswer';
import Asterisk from '../components/Asterisk';
import Paragraph from '../components/Paragraph';
import Spacer from '../components/Spacer';
import Heading from '../components/Heading';
import List from '../components/List';
import TextLink from '../components/TextLink';
import SimpleTable from '../components/SimpleTable';

const IntraFAQLink = ({ id, setOpenQuestionId, children }) => (
  <TextLink
    to={`/faq?q=${id}`}
    onClick={ev => {
      ev.preventDefault();
      ev.stopPropagation();

      setOpenQuestionId(id);

      // HACK: I've totally broken out of React's abstraction here, because
      // the alternative is more work.
      smoothScrollTo(`#${id}`);
    }}
  >
    {children}
  </TextLink>
);

const FAQ = () => {
  const [openQuestionId, setOpenQuestionId] = React.useState(null);

  React.useEffect(() => {
    const { q: questionId } = queryString.parse(location.search);

    if (questionId) {
      setOpenQuestionId(questionId);
      smoothScrollTo(`#${questionId}`);
    }
  }, []);

  return (
    <LayoutSidePage pageId="faq" title="Frequently Asked Questions">
      <Section>
        <Header>
          <Heading size={4} style={{ color: COLORS.violet[500] }}>
            General
          </Heading>
        </Header>
        <Questions>
          <QuestionAndAnswer
            id="what-is-this"
            question="What is this exactly?"
            isExpanded={openQuestionId === 'what-is-this'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Tinkersynth is a collection
              <Asterisk tooltip="Well, er, so far it's just the one machine... but we hope to add others!" />{' '}
              of software machines that can be used to produce unique{' '}
              <TextLink to="https://en.wikipedia.org/wiki/Generative_art">
                generative art
              </TextLink>{' '}
              via serendipitous experimentation.
            </Paragraph>

            <Paragraph>
              More concretely, Tinkersynth is an art store where you build art
              by poking at sliders and buttons. The goal isn't to provide a
              linear path to a specific piece of art, but rather to encourage
              experimentation. Tinkersynth prioritizes being delighted by
              unexpected effects rather than creating an intuitive, predictable
              tool.
            </Paragraph>

            <Paragraph>
              Once you're satisfied with your creation, you can{' '}
              <IntraFAQLink
                id="purchase-options"
                setOpenQuestionId={setOpenQuestionId}
              >
                purchase it
              </IntraFAQLink>
              ! You can choose to buy a high-quality vector/raster download
              pack, a premium Giclée print, or both.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="what-is-generative-art"
            question="How does it work?"
            isExpanded={openQuestionId === 'what-is-generative-art'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              The machines on Tinkersynth are examples of generative art. Unlike
              most traditional forms of visual art, generative art is produced
              by an algorithm.
            </Paragraph>

            <Paragraph>
              An algorithm is a fancy computer word, but really it just means
              that the art is produced by following a set of discrete,
              repeatable steps. For example, the
              <TextLink to="https://en.wikipedia.org/wiki/Spirograph">
                Spirograph
              </TextLink>{' '}
              produces generative art by following an algorithm as well. You can
              produce 10 identical pieces by following the same steps, and you
              can produce different pieces by modifying those steps, or changing
              the input parameters (like which gear to use).
            </Paragraph>

            <Paragraph>
              The Slopes machine uses an algorithm inspired by{' '}
              <TextLink to="https://blogs.scientificamerican.com/blogs/assets/sa-visual/Image/SciAm_pulsar.jpg">
                data visualizations of electromagnetic radiation
              </TextLink>
              . In its simplest form, it draws each row 1 at a time, using a
              form of randomization known as perlin noise to come up with the
              slopes.
            </Paragraph>

            <Paragraph>
              The controls on the Slopes machine turn what would otherwise be a
              fairly static piece into something dynamic and unpredictable.
              There are 22 individual controls which each affect the algorithm.
              Some, like the "perspective" slider in the top left, are
              reasonably predictable: it controls the height and distance
              between rows. Others are more inscrutable, like the "split earth"
              control which uses the tangent function to remarkable effect. Each
              control affects how the others behave, and the result is that
              there are over 1,000,000,000,000,000,000,000,000,000,000 possible
              outputs.
            </Paragraph>

            <Paragraph>
              If you're interested in learning more about creating generative
              art,{' '}
              <TextLink to="https://twitter.com/JoshWComeau">
                hit me up on Twitter
              </TextLink>
              !
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />
        </Questions>
      </Section>

      <Section>
        <Header>
          <Heading size={4} style={{ color: COLORS.violet[500] }}>
            Shipping
          </Heading>
        </Header>

        <Questions>
          <QuestionAndAnswer
            id="shipping-from-where"
            question="Where are orders shipped from?"
            isExpanded={openQuestionId === 'shipping-from-where'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Tinkersynth uses a fulfillment service that ships from the United
              States as well as Europe. We choose the closest centre when
              shipping your order.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="shipping-duration"
            question="How long will shipping take?"
            isExpanded={openQuestionId === 'shipping-duration'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Because Tinkersynth products are made-to-order (there's no way
              around this, since you're the one creating them!), there's a short
              period of fulfillment where your order is printed and packaged. We
              aim to have all orders in the mail carrier's hands within{' '}
              <strong>6 business days</strong>.
            </Paragraph>

            <Paragraph>
              We generally try and use mid-tier shipping options with tracking
              information. Here are some approximate shipping times, depending
              on your location:
            </Paragraph>

            <SimpleTable>
              <thead>
                <tr>
                  <th />
                  <th>United States</th>
                  <th>Canada</th>
                  <th>Europe</th>
                  <th>Worldwide</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Duration</strong>
                    <br />
                    <span style={{ fontSize: '0.8em' }}>(business days)</span>
                  </td>
                  <td>3-5 days</td>
                  <td>3-8 days</td>
                  <td>5-10 days</td>
                  <td>5-20 days</td>
                </tr>
              </tbody>
            </SimpleTable>

            <Paragraph>
              These times <em>do not</em> include the original processing time.
              This means that for an order to Canada, an order could take as
              little as 4 business days, but as long as 14 business days (or
              longer, in exceptional circumstances)
            </Paragraph>

            <br />
            <br />

            <Paragraph>
              Unfortunately, we don't offer the option to pay extra for "rush"
              shipping. If this is something that interests you, please{' '}
              <TextLink to="/contact">reach out</TextLink> and let us know - we
              may consider building in support for this, in the future.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="worldwide-shipping"
            question="Do you really ship anywhere in the world?"
            isExpanded={openQuestionId === 'worldwide-shipping'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Tinkersynth uses a fulfillment shipping service to manage
              shipping, and they claim to offer worldwide shipping. In certain
              extreme cases, if they are not able to accommodate your address,
              we may have to cancel and refund your order. This has never
              happened so far, though.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="how-are-orders-shipped"
            question="How are orders shipped?"
            isExpanded={openQuestionId === 'how-are-orders-shipped'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Fine art prints are shipped rolled inside shipping tubes. We take
              care to wrap prints carefully.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="damaged-during-shipping"
            question="Help! My order was damaged during shipping!"
            isExpanded={openQuestionId === 'damaged-during-shipping'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              It's really important to us that you receive a perfect-condition
              piece of artwork. If your art is damaged in transit, please send a
              photo of the damage to josh@tinkersynth.com.
            </Paragraph>

            <Paragraph>
              We'll either issue a full refund immediately, or ship it again,
              whichever you'd prefer.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />
        </Questions>
      </Section>

      <Section>
        <Header>
          <Heading size={4} style={{ color: COLORS.violet[500] }}>
            Store
          </Heading>
        </Header>

        <Questions>
          <QuestionAndAnswer
            id="purchase-options"
            question="What are the purchase options?"
            isExpanded={openQuestionId === 'purchase-options'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              When purchasing art through Tinkersynth, we offer two products: a
              digital download, and a physical fine art print.
            </Paragraph>

            <br />
            <Heading size={5}>Download</Heading>
            <br />
            <Paragraph>
              When purchasing an option that includes a digital download, you'll
              receive an email a few moments after purchase with links to
              download the assets.
            </Paragraph>

            <Paragraph>
              Specifically, we'll send you the following files:
            </Paragraph>

            <List>
              <List.Item>
                A 300dpi raster image in .png format with a transparent
                background (only the lines).
              </List.Item>
              <List.Item>
                A 300dpi raster image in .png format with an opaque background
                (white lines on black background, or black lines on white
                background).
              </List.Item>
              <List.Item>
                An infinitely-scalable vector image in .svg format.
              </List.Item>
            </List>

            <Paragraph>
              This is a great, flexible option. You can manage the printing
              yourself with these assets, or use them for any other purpose.
            </Paragraph>

            <br />
            <Heading size={5}>Fine art prints</Heading>
            <br />

            <Paragraph>
              We also sell fine art Giclée prints. We use{' '}
              <em>Epson ultra-premium lustre paper</em>, a heavy 240-gsm
              acid-free paper whose ink retention captures rich, deep blacks.
              The ink is a high-quality archival ink with solid monochromatic
              reproduction.
            </Paragraph>

            <Paragraph>
              Please note that this option doesn't include a frame.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="license"
            question="What's the license for purchased artwork?"
            isExpanded={openQuestionId === 'license'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Artwork created and purchased through Tinkersynth is released
              under a{' '}
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
              through Tinkersynth to be used however you want, even
              commercially. You can use it as your next album cover, or produce
              and sell throw pillows with your design.
            </Paragraph>

            <Paragraph>
              Unlike most Creative Commons licenses, CC0 does not require any
              attribution. This means you can use your artwork without
              mentioning Tinkersynth at all (although we're grateful if you do!)
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="refund"
            question="Can I get a refund?"
            isExpanded={openQuestionId === 'refund'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              For our fine art prints, we generally are unable to offer refunds.
              By design, Tinkersynth art is one-of-a-kind, and made-to-order;
              we'd have no way of reselling a returned piece of artwork.
            </Paragraph>

            <Paragraph>
              That said, if your item was damaged in shipping, or has some sort
              of cosmetic flaw, we'll gladly refund your money, or ship a new
              print, whichever you'd prefer. This hasn't happened yet, but it's
              important to us that you receive a high-quality piece of art.
            </Paragraph>

            <Paragraph>
              For our digital download packages, we <em>generally</em> don't
              offer refunds, although there's a little bit more flexibility.
              Please <TextLink to="/contact">contact us</TextLink> and let us
              know if you'd like a refund.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="multiple-purchases"
            question="Can I purchase multiple prints?"
            isExpanded={openQuestionId === 'multiple-purchases'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              In the future, we plan to build in support for a typical shopping
              cart experience, where you can create and save multiple prints and
              then check out all at once.
            </Paragraph>

            <Paragraph>
              Once this happens, we'll be able to offer discounts for grouped
              art prints, as shipping can be combined on multiple items.
            </Paragraph>

            <Paragraph>
              In the meantime, we're happy to offer a{' '}
              <strong>10% discount on multiple art-print orders!</strong> Just{' '}
              <TextLink to="/contact">contact us</TextLink> after purchase, and
              we'll issue a 10% refund on all orders that haven't yet shipped.
            </Paragraph>

            <Paragraph>
              We recognize that this experience is not ideal, and we're working
              to improve upon it!
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
          <QuestionAndAnswer
            id="that-performance-tho"
            question="Is there any way to speed up the machine?"
            isExpanded={openQuestionId === 'that-performance-tho'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              While developing the Slopes machine, it was important that the
              performance was top-notch: having a short feedback loop is
              imperative to discovering neat tricks, and coming up with great
              art.
            </Paragraph>

            <Paragraph>
              The performance varies pretty drastically depending on the
              settings chosen, since some settings increase the work that the
              machine has to do. Here are some tricks you can use to speed up
              the machine.
            </Paragraph>

            <QuestionSubsection>
              <Heading size={5}>Reducing line counts</Heading>

              <Spacer size={UNIT * 2} />

              <video
                autoPlay
                loop
                muted
                playsInline
                src={faqPerfCount}
                style={{ width: 312 }}
              />
              <Spacer size={UNIT * 2} />
              <Paragraph>
                The more lines you draw, the slower the calculation. You can
                reduce the number to dramatically improve performance.
              </Paragraph>
            </QuestionSubsection>

            <QuestionSubsection>
              <Heading size={5}>Disabling line occlusion</Heading>
              <Spacer size={UNIT * 2} />
              <video
                autoPlay
                loop
                muted
                playsInline
                src={faqPerfOcclusion}
                style={{ width: 312 }}
              />
              <Spacer size={UNIT * 2} />
              <Paragraph>
                One of the more computationally-intensive steps is making sure
                that lines are "occluded" by earlier lines. By disabling this,
                you reduce the amount of work needed to be done.
              </Paragraph>
            </QuestionSubsection>

            <Paragraph>
              Even if you want your final piece of artwork to include many
              occluded lines, it can be advantageous to experiment with these
              recommended settings, and then crank them up once you're happy
              with the result.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="can-i-save"
            question="Is there a way to save my work?"
            isExpanded={openQuestionId === 'can-i-save'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              At this time, there is no way to save individual works, other than
              by purchasing them.
            </Paragraph>

            <Paragraph>
              When you purchase an item (whether fine-art print or vector/raster
              download), a special link is included with your confirmation
              email. This link restores the machine to the settings used for
              your purchase. This way, you can always pick up where you left
              off.
            </Paragraph>

            <Paragraph>
              Note that we didn't intend for saving to be a "premium" feature;
              we'd love to offer the ability for everyone to create and share
              collections of works. We hope to develop this in a future release,
              but Tinkersynth is a very new product and a lot of quality-of-life
              improvements didn't make it into this MVP.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="why-is-mobile-bad"
            question="What's the deal with the limited mobile experience?"
            isExpanded={openQuestionId === 'why-is-mobile-bad'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Originally, we had hoped to create a first-class mobile
              experience, on par with the desktop experience. During
              development, it became clear that it wasn't really feasible.
            </Paragraph>
            <Paragraph>
              The Tinkersynth machines work so well because of the tight
              feedback loop: when you drag a slider or toggle a switch, you can
              immediately see what effect this has on the artwork, since both
              the controls and the art are visible at the same time.
            </Paragraph>
            <Paragraph>
              In our original mobile design, the machine's controls took up the
              entire screen, so you had to make an adjustment, then swipe up to
              see the effect. It felt really labor-intensive, and not a great
              experience.
            </Paragraph>

            <Paragraph>
              We decided to offer a limited subset for mobile, where the primary
              mechanism for generating new art was the grey "Shuffle" button.
              This button randomizes all the other controls, and can produce an
              incredible range of potential outputs. With this solution, we can
              fit the entire thing on your phone's screen, and still offer the
              ability to create interesting, unique works of art.
            </Paragraph>

            <Paragraph>
              That said, the desktop experience offers so much more control.
              It's worth trying on a device with a larger screen, if possible.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="pen-plotter"
            question="Is the art plottable by a pen plotter?"
            isExpanded={openQuestionId === 'pen-plotter'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              <strong>Yes!</strong> Digital downloads purchased through
              Tinkersynth provide a plotter-friendly SVG. All of the occlusion
              is done mathematically, rather than relying on SVG fills or masks,
              so that you can plot the SVG directly with programs like Inkscape.
            </Paragraph>
            <Paragraph>
              (<TextLink to="https://axidraw.com/">Pen plotters</TextLink> are
              machines that create art by mechanically moving a pen over paper.
              The end result is a charming, clearly-not-printed effect that is
              perfect for displaying the art created with Tinkersynth.)
            </Paragraph>
          </QuestionAndAnswer>
        </Questions>
      </Section>
    </LayoutSidePage>
  );
};

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

const QuestionSubsection = styled.div`
  padding: ${UNIT * 2}px;
  background: rgba(0, 0, 0, 0.1);
  margin-bottom: ${UNIT * 4}px;
`;

export default FAQ;
