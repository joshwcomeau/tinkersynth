// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { u1F500 as shuffleIcon } from 'react-icons-kit/noto_emoji_regular/u1F500';
import { u1F4A3 as bombIcon } from 'react-icons-kit/noto_emoji_regular/u1F4A3';

import { COLORS, UNIT } from '../../../constants';
import warningSrc from '../../../images/warning-wide.png';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SeedPicker from '../../SeedPicker';
import BigOminousButton from '../../BigOminousButton';
import Spacer from '../../Spacer';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  shuffle: () => void,
};

const SettingsCluster = ({ squeeze, seed, tweakParameter, shuffle }: Props) => {
  return (
    <ClusterWrapper>
      <InstrumentCluster>
        <Wrapper style={{ backgroundImage: `url(${warningSrc})` }}>
          <InnerWrapper>
            <ButtonWrapper>
              <IconOuterWrapper>
                <Icon icon={shuffleIcon} />
              </IconOuterWrapper>

              <BigOminousButton
                id="shuffle"
                color="black"
                handlePress={shuffle}
              />
            </ButtonWrapper>

            <Spacer size={3} />

            <ButtonWrapper>
              <IconOuterWrapper>
                <Icon icon={bombIcon} />
              </IconOuterWrapper>
              <BigOminousButton id="reset" color="red" handlePress={shuffle} />
            </ButtonWrapper>
          </InnerWrapper>
        </Wrapper>
      </InstrumentCluster>

      <IconBorder style={{ left: 22 }} />
      <IconBorder style={{ left: 73 }} />
    </ClusterWrapper>
  );
};

// $FlowIgnore
const OptimizedSettingsCluster = React.memo(SettingsCluster);

const SettingsContainer = () => {
  const slopesParams = useContext(SlopesContext);

  return <OptimizedSettingsCluster shuffle={slopesParams.shuffle} />;
};

const ClusterWrapper = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  height: 54px;
  padding: 3px;
  background-size: cover;
  border-radius: 4px;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  position: relative;
  background: ${COLORS.gray[100]};
  padding: 4px;
  border-radius: 8px;
`;

const IconOuterWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: -16px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  background: ${COLORS.gray[100]};
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  color: ${COLORS.gray[700]};
  border-radius: 100%;
`;

const IconBorder = styled.div`
  position: absolute;
  z-index: -1;
  top: -6px;
  width: 28px;
  height: 28px;
  background: ${COLORS.gray[100]};
  border: 1px solid ${COLORS.gray[400]};
  border-radius: 100%;
`;

export default SettingsContainer;
