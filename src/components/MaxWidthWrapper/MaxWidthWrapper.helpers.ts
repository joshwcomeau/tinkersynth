// @ts-nocheck
import { getDeviceType } from '../../helpers/responsive.helpers';

export const getPadding = (
  props: {
    noPadding?: boolean;
    noPaddingOnMobile?: boolean;
  } = {}
) => {
  const { noPadding = false, noPaddingOnMobile = false } = props;
  if (noPadding) {
    return 0;
  }

  if (getDeviceType() === 'mobile' && noPaddingOnMobile) {
    return 0;
  }

  return getDeviceType() === 'mobile' ? '1rem' : '2rem';
};
