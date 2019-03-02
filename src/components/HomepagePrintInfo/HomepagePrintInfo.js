import React from 'react';
import styled from 'styled-components';

import backgroundImageSrc from '../../images/homepage-wall-shot-wide.jpg';
import backgroundImageMobileSrc from '../../images/homepage-wall-shot-square.jpg';

import MaxWidthWrapper from '../MaxWidthWrapper';
import Heading from '../Heading';
import Spacer from '../Spacer';
import Paragraph from '../Paragraph';

const HomepagePrintInfo = () => {
  return (
    <OuterWrapper id="homepage-print-info">
      <InnerWrapper>
        <MaxWidthWrapper>
          <Heading size={3}>Digital artwork, made tangible.</Heading>

          <Spacer size={48} />

          <LargeParagraph>
            The really cool thing about Tinkersynth is that it’s not just a web
            toy. Your unique creation can be produced into a fine-art Giclée
            print.
          </LargeParagraph>

          <Spacer size={48} />

          <LargeParagraph>
            We’re proud of the prints we produce. We tried many paper options
            before settling on <em>Epson Ultra-Premium Lustre paper</em>, a
            heavy 240gsm light-gloss paper that produces vivid, inky blacks
            reminiscent of traditional silver halide printing. We print using
            premium archival inks, so that your artwork will look great for many
            years to come.
          </LargeParagraph>
        </MaxWidthWrapper>
      </InnerWrapper>
      <ImageBelow>
        <Image src={backgroundImageMobileSrc} style={{ width: '100%' }} />
      </ImageBelow>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  background-color: white;
`;

const InnerWrapper = styled.div`
  padding-top: 72px;

  @media (min-width: 600px) {
    padding-left: 48px;
    padding-right: 48px;
  }

  @media (min-width: 1000px) {
    max-width: 1800px;
    margin: auto;
    background-image: url(${backgroundImageSrc});
    background-size: 100%;
    background-position: bottom;
    background-repeat: no-repeat;
    padding-top: 115px;
    padding-bottom: 215px;
    padding-left: 48px;
    padding-right: 0;
  }
`;

const LargeParagraph = styled(Paragraph)`
  font-size: 24px;
  max-width: 47%;
  margin-bottom: 0;
  line-height: 1.5;

  @media (max-width: 999px) {
    max-width: unset;
  }
`;

const ImageBelow = styled.div`
  margin-top: 48px;

  @media (min-width: 1000px) {
    display: none;
  }
`;

const Image = styled.img`
  display: block;
`;

export default HomepagePrintInfo;
