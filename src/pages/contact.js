// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, UNIT } from '../constants';

import LayoutSidePage from '../components/LayoutSidePage';
import Paragraph from '../components/Paragraph';
import Heading from '../components/Heading';
import TextLink from '../components/TextLink';
import TextInputWithLabel from '../components/TextInputWithLabel';
import Label from '../components/Label';
import Spacer from '../components/Spacer';
import Button from '../components/Button';

const Contact = () => {
  return (
    <LayoutSidePage pageId="contact" title="Contact">
      <Wrapper>
        <Intro>
          <Paragraph>
            Have questions about how Tinkersynth works, or feedback about the
            experience? We'd love to hear from you! This contact form is an
            effective way to reach the author of this project.
          </Paragraph>

          <Paragraph>
            <strong>For order inquiries</strong>, you can reply to any email
            sent from Tinkersynth. This way, we'll have all the context for your
            inquiry. We don't do that "noreply" nonsense.
          </Paragraph>
        </Intro>

        <Form>
          <Row>
            <Column>
              <TextInputWithLabel
                id="first-name"
                labelText="First Name"
                type="text"
              />
            </Column>

            <Spacer size={UNIT * 4} />

            <Column>
              <TextInputWithLabel
                id="first-name"
                labelText="Last Name"
                type="text"
              />
            </Column>
          </Row>

          <Spacer size={UNIT * 4} />

          <Row>
            <Column>
              <TextInputWithLabel
                id="subject"
                labelText="Subject"
                type="text"
              />
            </Column>
          </Row>

          <Spacer size={UNIT * 4} />

          <Row>
            <Column>
              <TextInputWithLabel
                as="textarea"
                id="body"
                labelText="Message"
                rows={6}
              />
            </Column>
          </Row>

          <Spacer size={UNIT * 4} />

          <LastRow>
            <Button>Submit</Button>
          </LastRow>
        </Form>
      </Wrapper>
      <Spacer size={UNIT * 12} />
    </LayoutSidePage>
  );
};

const Wrapper = styled.div`
  @media (min-width: 800px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
  }
`;

const Intro = styled.div`
  margin-bottom: ${UNIT * 4}px;
  padding: ${UNIT * 3}px ${UNIT * 4}px;
  background: ${COLORS.gray[100]};
  border-radius: 4px;

  & ${Paragraph} {
    font-size: 15px;
    line-height: 1.5;
  }

  & ${Paragraph}:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 800px) {
    margin-bottom: 0;
    width: 300px;
  }
`;

const Form = styled.form`
  @media (min-width: 800px) {
    padding-right: ${UNIT * 4}px;
    flex: 1;
  }
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
`;

const LastRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default Contact;
