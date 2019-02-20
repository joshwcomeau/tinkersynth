// @flow
import { getDeviceType } from '../../helpers/responsive.helpers';

export const getPadding = ({
  noPadding,
  noPaddingOnMobile,
}: {
  noPadding: boolean,
  noPaddingOnMobile: boolean,
}) => {
  if (noPadding) {
    return 0;
  }

  if (getDeviceType() === 'mobile' && noPaddingOnMobile) {
    return 0;
  }

  return getDeviceType() === 'mobile' ? '1rem' : '2rem';
};
