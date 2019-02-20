// @flow
import { getIsMobile } from '../../helpers/responsive.helpers';

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

  if (getIsMobile() && noPaddingOnMobile) {
    return 0;
  }

  return getIsMobile() ? '1rem' : '2rem';
};
