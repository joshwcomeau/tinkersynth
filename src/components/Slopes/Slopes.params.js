// The user can tweak "high-level" params like perspective, spikyness, etc.
// These values are not used directly in the generator.
// This file specifies the mapping from high-level params to actual variables
// used in the logic.
// `value` will always be from 0-1000
import { normalize } from '../../utils';

/**
 * PERSPECTIVE
 * represents the angle the user is looking at the hills
 * from 0.0 to 30.0
 */

const transformParameters = ({ height, perspective }) => {
  const distanceBetweenRows = normalize(perspective, 0, 30, 0, height * 0.1);

  console.log(distanceBetweenRows);

  return { distanceBetweenRows };
};

export default transformParameters;
