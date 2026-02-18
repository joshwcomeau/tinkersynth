declare module 'react-tippy' {
  import { ComponentType } from 'react';
  export const Tooltip: ComponentType<any>;
}

declare module 'react-spring/hooks' {
  import { ComponentType } from 'react';
  export function useSpring<T>(props: T): any;
  export function useTrail(count: number, props: object): any[];
  export function useTransition(item: any, props: object): any;
  export function useChain(refs: any[], timeSteps?: number[]): void;
  export function useSprings(count: number, props: object | object[]): any[];
  export const animated: { [key: string]: ComponentType<any> };
  export function interpolate(
    value: number,
    inputRange: number[],
    outputRange: string[] | number[]
  ): any;
}

declare module 'react-helmet' {
  import { ComponentType } from 'react';
  const Helmet: ComponentType<any>;
  export default Helmet;
}

declare module 'react-retro-hit-counter' {
  import { ComponentType } from 'react';
  const HitCounter: ComponentType<any>;
  export default HitCounter;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}
