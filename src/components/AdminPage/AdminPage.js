// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getApiUrl } from '../../helpers/api.helpers';
import * as actions from '../../actions';

import Button from '../Button';
import Spacer from '../Spacer';
import Heading from '../Heading';
import TextInput from '../TextInput';
import { COLORS } from '../../constants';

type Props = {
  children: React$Node,
  authenticateAsAdmin: (password: string) => void,
};

const AdminPage = ({ children, authenticateAsAdmin }: Props) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  const handleSubmit = ev => {
    ev.preventDefault();

    setError(null);

    window
      .fetch(`${getApiUrl()}/admin/authenticate`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `basic ${password}`,
        },
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        setIsAuthorized(true);
        authenticateAsAdmin(password);
      })
      .catch(err => {
        console.error(err);

        setError('The password was incorrect');
      });
  };

  if (!isAuthorized) {
    return (
      <form onSubmit={handleSubmit}>
        <Heading size={3}>This page requires admin authorization.</Heading>
        <Spacer size={36} />

        <label>
          Enter password:{' '}
          <TextInput
            type="password"
            value={password}
            onChange={ev => setPassword(ev.currentTarget.value)}
            width={200}
          />
        </label>

        <Spacer size={48} />

        {error && <Error>{error}</Error>}

        <Button>Submit</Button>
      </form>
    );
  }

  return children;
};

const Error = styled.pre`
  padding: 30px;
  color: ${COLORS.red[500]};
`;

export default connect(
  null,
  { authenticateAsAdmin: actions.authenticateAsAdmin }
)(AdminPage);
