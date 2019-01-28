// @flow
/**
 * The Stripe API requires a pretty-hefty client-side lib to be loaded.
 * I don't want to pay that cost upfront. Instead I'd like to load it when it's
 * actually necessary.
 *
 * This component is generalized so that it will load any script URL when it
 * mounts.
 */
import React from 'react';

type Props = {
  src: string,
  onLoad?: () => void,
};

const LoadScript = ({ src, onLoad }: Props) => {
  console.log('Render script', src);
  React.useEffect(
    () => {
      const script = document.createElement('script');

      script.type = 'text/javascript';
      script.async = true;
      script.onload = onLoad;
      script.src = src;
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    [src]
  );

  return null;
};

export default LoadScript;
