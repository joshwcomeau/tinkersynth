// @flow
import React from 'react';
import styled from 'styled-components';

import thanksSrc from '../images/thanks.svg';
import Layout from '../components/Layout';
import Paragraph from '../components/Paragraph';
import Spacer from '../components/Spacer';
import Button from '../components/Button';

const Finished = () => (
  <Layout pageId="thanks" noHeader>
    <Wrapper>
      <img src={thanksSrc} />
      <Spacer size={40} />
      <Paragraph style={{ fontSize: 24 }}>
        Your purchase has been registered, and your art is on the way! Check
        your email shortly.
      </Paragraph>
      <Paragraph style={{ fontSize: 24 }}>
        You’re one of the very first people to use this tool, and I’m thrilled
        to have you as a customer.
      </Paragraph>
      <Paragraph style={{ fontSize: 24 }}>
        If you enjoyed creating art with the machine, it’d be awesome if you
        could share it with friends!
      </Paragraph>

      <Spacer size={60} />

      <ButtonsRow>
        <Button color="hsl(203, 89%, 53%)">Twitter</Button>
        <Spacer size={20} />
        <Button color="hsl(221, 44%, 41%)">Facebook</Button>
      </ButtonsRow>
    </Wrapper>
  </Layout>
);

const Wrapper = styled.div`
  width: 525px;
  margin: auto;
  margin-top: 100px;
  text-align: center;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: center;
`;

export default Finished;
