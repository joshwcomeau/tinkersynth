// @flow
import React from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { loader } from 'react-icons-kit/feather/loader';

import { COLORS, UNIT } from '../constants';
import { submitContactForm } from '../helpers/api.helpers';

import LayoutSidePage from '../components/LayoutSidePage';
import Paragraph from '../components/Paragraph';
import Heading from '../components/Heading';
import TextLink from '../components/TextLink';
import TextInputWithLabel from '../components/TextInputWithLabel';
import Label from '../components/Label';
import Spacer from '../components/Spacer';
import Button from '../components/Button';
import Spin from '../components/Spin';

type Status = 'idle' | 'sending' | 'complete' | 'error';

type ContactFormProps = {
  status: Status,
  setStatus: (status: Status) => void,
};

const getErrorTextForCode = (code) => {
  // The server returns a 422 when required fields are left blank.
  // We also have HTML guards, so the only way to see this error should be if
  // the user modifies the DOM tree.
  if (code === 422) {
    return (
      <>
        All fields are required. Please make sure to fill out the form
        completely
      </>
    );
  }

  return (
    <>
      An unknown error has occurred. If the problem persists, you can email me
      directly instead, at me@joshwcomeau.com.
    </>
  );
};

const ContactForm = ({ status, setStatus, errorCode, setErrorCode }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleSubmitForm = (ev) => {
    ev.preventDefault();

    setStatus('sending');

    submitContactForm(firstName, lastName, email, subject, message)
      .then((res) => {
        setStatus('complete');
      })
      .catch((err) => {
        setStatus('error');
        setErrorCode(err.status);
      });
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <Row>
        <Column>
          <TextInputWithLabel
            required
            id="first-name"
            type="text"
            value={firstName}
            updateValue={setFirstName}
            labelText="First Name"
            placeholder="Kim"
          />
        </Column>

        <Spacer size={UNIT * 4} />

        <Column>
          <TextInputWithLabel
            required
            id="last-name"
            type="text"
            value={lastName}
            updateValue={setLastName}
            labelText="Last Name"
            placeholder="Smith"
          />
        </Column>
      </Row>

      <Spacer size={UNIT * 4} />

      <Row>
        <Column>
          <TextInputWithLabel
            required
            id="email"
            type="email"
            value={email}
            updateValue={setEmail}
            labelText="Email"
            placeholder="kim.smith@gmail.com"
          />
        </Column>
      </Row>

      <Spacer size={UNIT * 4} />

      <Row>
        <Column>
          <TextInputWithLabel
            required
            id="subject"
            type="text"
            value={subject}
            updateValue={setSubject}
            labelText="Subject"
            placeholder="Hello world!"
          />
        </Column>
      </Row>

      <Spacer size={UNIT * 4} />

      <Row>
        <Column>
          <TextInputWithLabel
            required
            as="textarea"
            id="message"
            value={message}
            updateValue={setMessage}
            labelText="Message"
            rows={6}
          />
        </Column>
      </Row>

      {status === 'error' && (
        <>
          <Spacer size={UNIT * 4} />

          <ErrorText>{getErrorTextForCode(errorCode)}</ErrorText>
        </>
      )}

      <Spacer size={UNIT * 4} />

      <LastRow>
        <Button style={{ width: 80 }} disabled={status === 'sending'}>
          {status === 'sending' ? (
            <Spin>
              <Icon icon={loader} />
            </Spin>
          ) : (
            'Submit'
          )}
        </Button>
      </LastRow>
    </Form>
  );
};

const Contact = () => {
  const [status, setStatus] = React.useState('idle');
  const [errorCode, setErrorCode] = React.useState(null);

  return (
    <LayoutSidePage pageId="contact" title="Contact">
      {status === 'complete' ? (
        <Success>
          <Heading size={4}>Message Received.</Heading>
          <Spacer size={UNIT * 2} />
          <Paragraph>
            Thanks for your inquiry! We'll get back to you as soon as we can.
          </Paragraph>
        </Success>
      ) : (
        <Wrapper>
          <Intro>
            <Paragraph>
              Have questions about how Tinkersynth works, or feedback about the
              experience? We'd love to hear from you! This contact form is an
              effective way to reach the author of this project.
            </Paragraph>

            <Paragraph>
              <strong>For order inquiries</strong>, you can reply to any email
              sent from Tinkersynth. This way, we'll have all the context for
              your inquiry. We don't do that "noreply" nonsense.
            </Paragraph>
          </Intro>
          <Spacer size={UNIT * 4} />
          <ContactForm
            status={status}
            setStatus={setStatus}
            errorCode={errorCode}
            setErrorCode={setErrorCode}
          />
        </Wrapper>
      )}
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

const ErrorText = styled.div`
  font-size: 16px;
  padding: ${UNIT * 3}px;
  line-height: 1.45;
  color: ${COLORS.red[500]};
`;

const Success = styled.div`
  background-color: hsla(150, 100%, 60%, 0.2);
  padding: ${UNIT * 4}px;
`;

export default Contact;
