/**
 * Augment styled-components so that styled components accept arbitrary
 * custom props (e.g. $fromColor, orientation, maxWidth) without explicit typing.
 */
import 'styled-components';

declare module 'styled-components' {
  export interface ExecutionContext {
    [key: string]: unknown;
  }
}
