// @flow
import React, { useContext } from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { power as powerIcon } from 'react-icons-kit/feather/power';
import { shuffle as shuffleIcon } from 'react-icons-kit/feather/shuffle';

import { COLORS, UNIT } from '../../../constants';
import warningSrc from '../../../images/warning-wide.png';

import { SlopesContext } from '../SlopesState';
import { InstrumentCluster } from '../../ControlPanel';
import SeedPicker from '../../SeedPicker';
import BigOminousButton from '../../BigOminousButton';
import PowerButton from '../../PowerButton';
import Spacer from '../../Spacer';

import type { TweakParameterAction } from '../SlopesState';

type Props = {
  isPoweredOn: boolean,
  shuffle: () => void,
  toggleMachinePower: () => void,
};

const DestructiveCluster = ({
  isPoweredOn,
  shuffle,
  toggleMachinePower,
}: Props) => {
  return (
    <ClusterWrapper>
      <InlineInstrumentCluster>
        <Wrapper style={{ backgroundImage: `url(${warningSrc})` }}>
          <InnerWrapper>
            <ButtonWrapper>
              <IconOuterWrapper>
                <Icon icon={shuffleIcon} size={13} />
              </IconOuterWrapper>

              <BigOminousButton
                id="shuffle"
                color="gray"
                handlePress={shuffle}
                isDisabled={!isPoweredOn}
              />
            </ButtonWrapper>

            <Spacer size={UNIT} />

            <ButtonWrapper>
              <IconOuterWrapper>
                <Icon icon={powerIcon} size={13} />
              </IconOuterWrapper>
              <PowerButton handlePress={toggleMachinePower} />
            </ButtonWrapper>
          </InnerWrapper>
        </Wrapper>
      </InlineInstrumentCluster>

      <IconBorder style={{ left: 27 }} />
      <IconBorder style={{ left: 83 }} />
    </ClusterWrapper>
  );
};

// $FlowIgnore
const OptimizedDestructiveCluster = React.memo(DestructiveCluster);

const DestructiveContainer = () => {
  const slopesParams = useContext(SlopesContext);

  return (
    <OptimizedDestructiveCluster
      isPoweredOn={slopesParams.isPoweredOn}
      shuffle={slopesParams.shuffle}
      toggleMachinePower={slopesParams.toggleMachinePower}
    />
  );
};

const ClusterWrapper = styled.div`
  position: relative;
`;

const InlineInstrumentCluster = styled(InstrumentCluster)`
  /* This is done for mobile, to avoid this short thing stretching the entire space */
  display: inline-flex;
`;

const Wrapper = styled.div`
  height: 54px;
  padding: ${UNIT}px;
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
  border-radius: 100%;
`;

const IconOuterWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: -19px;
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
  top: -9px;
  width: 28px;
  height: 28px;
  background: ${COLORS.gray[100]};
  border: 1px solid ${COLORS.gray[400]};
  border-radius: 100%;
`;

export default DestructiveContainer;
