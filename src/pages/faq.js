// @flow
import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';

import { COLORS, UNIT } from '../constants';
import { smoothScrollTo } from '../utils';
import ccLicense from '../images/cc-license.png';
import faqPerfCount from '../videos/faq-perf-count.mp4';
import faqPerfOcclusion from '../videos/faq-perf-occ-modern.mp4';
import faqPerfResolution from '../videos/faq-perf-resolution.mp4';

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
    <React.Fragment>
      <Paragraph>
        <em>Last updated: May 24th 2019</em>.
      </Paragraph>

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
              Tinkersynth is an experimental art project. It lets you create
              unique{' '}
              <TextLink to="https://en.wikipedia.org/wiki/Generative_art">
                generative art
              </TextLink>{' '}
              by making serendipitous discoveries through experimentation.
            </Paragraph>

            <Paragraph>
              More concretely, Tinkersynth is a design tool where you build art
              by poking at sliders and buttons. The goal isn't to provide a
              linear path to a specific piece of art, but rather to encourage
              experimentation. Tinkersynth prioritizes being delighted by
              unexpected effects rather than creating an intuitive, predictable
              tool.
            </Paragraph>

            <Paragraph>
              In a former life, Tinkersynth was also a store which sold the
              rights to digital products, as well as physical fine-art prints.
            </Paragraph>

            <Paragraph>
              Tinkersynth was created by me,{' '}
              <a href="https://twitter.com/JoshWComeau">Josh Comeau</a>.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="how-does-it-work"
            question="How does it work?"
            isExpanded={openQuestionId === 'how-does-it-work'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              The machines on Tinkersynth are examples of generative art. Unlike
              most traditional forms of visual art, generative art is produced
              by an algorithm.
            </Paragraph>

            <Paragraph>
              The Slopes machine uses an algorithm inspired by{' '}
              <TextLink to="https://blogs.scientificamerican.com/blogs/assets/sa-visual/Image/SciAm_pulsar.jpg">
                data visualizations of electromagnetic radiation
              </TextLink>
              , most famously seen on the Unknown Pleasures album cover. In its
              simplest form, it draws each row 1 at a time, using a form of
              randomization known as perlin noise to come up with the slopes.
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
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="what-happened-store"
            question="What happened to the store?"
            isExpanded={openQuestionId === 'what-happened-store'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              In the initial version of Tinkersynth, I sold digital downloads
              and fine-art prints of the art created through the machine. This
              new version doesn't.
            </Paragraph>

            <Paragraph>
              The short version is that the store wasn't very lucrative, and I
              felt weird that I was charging people who wanted to pursue a
              creative art project. I love the idea of people using Tinkersynth
              as input to a subsequent creative project. The new model allows
              for remixing :D
            </Paragraph>

            <Paragraph>
              Check out the "License" question below for more information on
              this.
            </Paragraph>
          </QuestionAndAnswer>
        </Questions>
      </Section>

      <Section>
        <Header>
          <Heading size={4} style={{ color: COLORS.violet[500] }}>
            Downloads
          </Heading>
        </Header>

        <Questions>
          <QuestionAndAnswer
            id="formats"
            question="What are the download formats?"
            isExpanded={openQuestionId === 'formats'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Tinkersynth downloads are available in multiple formats. The
              format you want will depend on your usecase.
            </Paragraph>

            <List>
              <List.Item>
                <strong>Opaque PNG</strong> - This is essentially a scaled-up
                version of the asset previewed through the machine. It's a .PNG,
                and it's large enough to print an 18" x 24" print at 300 DPI
                (Dots Per Inch).
                <br />
                <br />
                This is a great option for managing a fine-art print. You can
                send it straight to your printer.
              </List.Item>
              <List.Item>
                <strong>Transparent PNG</strong> - Identical to the "Opaque
                PNG", except without a background.
                <br />
                <br />
                This can be a good option for printing as well - if you want to
                print on a shirt, and the shirt is already a color similar to
                the background, for example.
              </List.Item>
              <List.Item>
                <strong>SVG</strong> - Finally, the SVG download is the most
                powerful/flexible. SVG is a vector format, which means that you
                can resize it to any size and it'll look crisp and sharp.
                <br />
                <br />
                This is a great option for creating derivative works, since you
                can select and modify individual layers, and easily tweak things
                like line width and color. It's also useful if you'd like to
                make a <em>huge</em> print.
              </List.Item>
            </List>

            <Paragraph>
              We do not offer downloads in .jpg format, altough online
              PNG-to-JPG converters can be used to easily produce .jpg files.
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="license"
            question="What license are downloads released under?"
            isExpanded={openQuestionId === 'license'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              The art you download from Tinkersynth is licensed under a{' '}
              <strong>
                Creative Commons Attribution-NonCommercial 4.0 International
              </strong>{' '}
              license.
            </Paragraph>

            <Paragraph>
              More information about this license is available{' '}
              <TextLink to="https://creativecommons.org/licenses/by-nc/4.0/">
                on the Creative Commons website
              </TextLink>
              , but to summarize:
            </Paragraph>

            <List>
              <List.Item>
                You are free to create and share derivative works. I'd love to
                see what you come up with!
              </List.Item>
              <List.Item>
                Please attribute Tinkersynth when sharing. For attribution, you
                can reference this website, or its creator, Josh Comeau.
              </List.Item>
              <List.Item>
                Please don't do anything commercial with the downloads. I feel
                funny about people selling art created in minutes through a tool
                that took months to build.
              </List.Item>
            </List>

            <Paragraph>
              If you use Tinkersynth as input to your creative process, and the
              output is so different that it would be unrecognizeable as a
              Tinkersynth design, please feel free to use it commercially, or
              however you wish. The art is 100% yours at that point. I'm not
              sure if this is technically within the bounds of the license (I
              just picked the closest representation of what I want I could
              find), but please feel free to contact me and I'll grant a
              personal exemption after seeing the work.
            </Paragraph>

            <Paragraph>
              <a href="https://twitter.com/LucLalande/status/1229800830926237696">
                See some examples of sufficiently-derivative work
              </a>
              .
            </Paragraph>
          </QuestionAndAnswer>
          <QuestionAndAnswer
            id="nft"
            question="Can I sell art created with Tinkersynth as an NFT?"
            isExpanded={openQuestionId === 'nft'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>The short answer is "no". Sorry!</Paragraph>

            <Paragraph>
              Tinkersynth is intended to be a tool used for fun, not profit.
              It's an experimental toy, something to be played with.
            </Paragraph>

            <Paragraph>
              The exception is derivative works. If you use your Tinkersynth
              export as an <em>input</em> to another creative process, then
              that's totally fine; the art is yours, and you can do whatever you
              want with it. But{' '}
              <strong>it has to be significantly transformed</strong>. Cropping,
              warping, or changing the colors doesn't count.
            </Paragraph>

            <Paragraph>
              <a href="https://twitter.com/LucLalande/status/1229800830926237696">
                See some examples of sufficiently-derivative work
              </a>
              .
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
                width={312}
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
              <video autoPlay loop muted playsInline src={faqPerfOcclusion} />
              <Spacer size={UNIT * 2} />
              <Paragraph>
                One of the more computationally-intensive steps is making sure
                that lines are "occluded" by earlier lines. By disabling this,
                you reduce the amount of work needed to be done.
              </Paragraph>
            </QuestionSubsection>

            <QuestionSubsection>
              <Heading size={5}>Lowering the resolution</Heading>
              <Spacer size={UNIT * 2} />
              <video autoPlay loop muted playsInline src={faqPerfResolution} />
              <Spacer size={UNIT * 2} />
              <Paragraph>
                Every line in Tinkersynth is made up of a number of smaller
                straight lines. To get the lines looking perfectly smooth, we
                need <em>a lot</em> of these lines. In Tinkersynth 2.0, you can
                lower the number of points per row, which dramatically improves
                performance.
              </Paragraph>
            </QuestionSubsection>

            <Paragraph>
              Even if you want your final piece of artwork to include many
              occluded lines, or lots of points, it can be advantageous to
              experiment with these recommended settings, lowering them while
              you work and then cranking them up once you're ready to download.
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
              You can download your works at any time to preserve a copy,
              although there is no way to restore from a previously-downloaded
              state.
            </Paragraph>

            <Paragraph>
              Tinkersynth does use device storage to store the current settings,
              so you can close/reopen the tab without losing your work. But you
              can't restore to a previous state.
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
              Originally, I had hoped to create a first-class mobile experience,
              on par with the desktop experience. During development, it became
              clear that it wasn't really feasible.
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
              I decided to offer a limited subset for mobile, where the primary
              mechanism for generating new art was the grey "Shuffle" button.
              This button randomizes all the other controls, and can produce an
              incredible range of potential outputs. With this solution, I can
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
              <strong>Yes!</strong> The "SVG" download option should be
              plotter-friendly. All of the occlusion is done mathematically,
              rather than relying on fills or masks, so that you can plot the
              SVG directly with programs like Inkscape.
            </Paragraph>

            <Paragraph>
              Note that the plotter will assume that every line should be the
              same color. There is currently no way to export multiple files for
              each color, although with some patience this can be done in
              programs like Inkscape or Illustrator.
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

      <Section>
        <Header>
          <Heading size={4} style={{ color: COLORS.violet[500] }}>
            Source
          </Heading>
        </Header>

        <Questions>
          <QuestionAndAnswer
            id="oss"
            question="Is Tinkersynth open-source?"
            isExpanded={openQuestionId === 'oss'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Sort of. Tinkersynth's code has been made public for educational
              purposes, so that those who are curious can disect and understand
              how it's built.
            </Paragraph>

            <Paragraph>
              It's not open-source in the conventional sense, though; it is
              published without license, and thus I retain the full copyright.
              Feel free to fork the repo and experiment, but please create your
              own original works from scratch, not using Tinkersynth as a base.
            </Paragraph>

            <Paragraph>
              With that in mind, you can find the source here:{' '}
              <TextLink to="https://github.com/joshwcomeau/tinkersynth">
                https://github.com/joshwcomeau/tinkersynth
              </TextLink>
            </Paragraph>
          </QuestionAndAnswer>

          <Separator />

          <QuestionAndAnswer
            id="contribute"
            question="Can I contribute to Tinkersynth?"
            isExpanded={openQuestionId === 'contribute'}
            toggleExpanded={setOpenQuestionId}
          >
            <Paragraph>
              Sorry, I'm afraid I'm not looking for contributors at this time.
              Tinkersynth is a passion project of mine, something I do in my
              spare time to be creative and experiment. Accepting contributions
              means I'd be doing code reviews and assigning issues, and that
              feels a little bit too much like my day job.
            </Paragraph>

            <Paragraph>
              Please feel empowered to create your own version of Tinkersynth
              though! Generative art is still a new field, and there's ample
              room for new inventions =D
            </Paragraph>
          </QuestionAndAnswer>
        </Questions>
      </Section>
    </React.Fragment>
  );
};

const Wrapper = () => (
  <LayoutSidePage pageId="faq" title="Frequently Asked Questions">
    <FAQ />
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

const QuestionSubsection = styled.div`
  padding: ${UNIT * 2}px;
  background: rgba(0, 0, 0, 0.1);
  margin-bottom: ${UNIT * 4}px;
`;

export default Wrapper;
