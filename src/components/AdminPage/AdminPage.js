// @flow
import React from 'react';
import styled from 'styled-components';

import { getApiUrl } from '../../helpers/api.helpers';

import LayoutSidePage from '../LayoutSidePage';
import Button from '../Button';
import { COLORS } from '../../constants';

type Props = {
  children: React$Node,
};

const AdminPage = ({ children }: Props) => {
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
      })
      .catch(err => {
        console.error(err);

        setError('The password was incorrect');
      });
  };

  if (!isAuthorized) {
    return (
      <LayoutSidePage title="Admin dashboard" adminPage={true}>
        <form onSubmit={handleSubmit}>
          <h1>This page requires admin authorization.</h1>

          <label>
            Enter password:
            <input
              type="password"
              value={password}
              onChange={ev => setPassword(ev.currentTarget.value)}
            />
          </label>

          {error && <Error>{error}</Error>}

          <Button>Submit</Button>
        </form>
      </LayoutSidePage>
    );
  }

  return children;
};

const Error = styled.pre`
  padding: 30px;
  color: ${COLORS.red[500]};
`;

export default AdminPage;
