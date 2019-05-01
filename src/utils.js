// TODO: Flow-type this file

export const range = n => Array.from(Array(n).keys());

export const sample = arr => arr[Math.floor(Math.random() * arr.length)];

export const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const sum = values => values.reduce((sum, value) => sum + value, 0);
export const mean = values => sum(values) / values.length;

export const clamp = (val, min = 0, max = 1) =>
  Math.max(min, Math.min(max, val));

export const roundTo = (number, places = 0) =>
  Math.round(number * 10 ** places) / 10 ** places;

export const roundToNearest = (number, nearest) =>
  Math.round(number / nearest) * nearest;

/**
 * I often find myself needing to normalize values.
 * Say I have a value, 15, out of a range between 0 and 30.
 * I might want to know what that is on a scale of 1-5 instead.
 */
export const normalize = (
  number,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  // FIrst, normalize the value between 0 and 1.
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  // Next, transpose that value to our desired scale.
  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const debounce = (callback, wait, timeoutId = null) => {
  const debounceFn = (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };

  debounceFn.cancel = () => window.clearTimeout(timeoutId);

  return debounceFn;
};

export const compose = (...fns) =>
  fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    value => value
  );

export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export const isEmpty = obj => Object.keys(obj).length === 0;

export const getInterpolatedValue = (y1, y2, ratio) => {
  // We're assuming that `ratio` is a value between 0 and 1.
  // If this were a graph, it'd be our `x`, and we're trying to solve for `y`.
  // First, find the slope of our line.
  const slope = y2 - y1;

  return slope * ratio + y1;
};

export const pick = (obj, keys) => {
  var o = {};
  var i = 0;
  var key;

  keys = Array.isArray(keys) ? keys : [keys];

  while ((key = keys[i++])) {
    if (typeof obj[key] !== 'undefined') {
      o[key] = obj[key];
    }
  }
  return o;
};

export const omit = function(obj, key) {
  var newObj = {};

  for (var name in obj) {
    if (name !== key) {
      newObj[name] = obj[name];
    }
  }

  return newObj;
};

/**
 * 1D flatten. Uses native Array#flat when available.
 */
export const flatten = list => {
  if (typeof list.flat === 'function') {
    return list.flat();
  }

  return list.reduce((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...item);
    } else {
      acc.push(item);
    }

    return acc;
  }, []);
};

export const convertArrayToMap = list =>
  list.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item,
    }),
    {}
  );

const uniqPredicate = (value, index, self) => self.indexOf(value) === index;
export const uniq = arr => arr.filter(uniqPredicate);

// Either removes or adds an item to an array
// EXAMPLE: toggleInArray([1, 2], 3) -> [1, 2, 3]
// EXAMPLE: toggleInArray([1, 2], 2) -> [1]
export const toggleInArray = (arr, item) =>
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

// Combines 2 arrays, removing duplicates.
// EXAMPLE: mergeUnique([1, 2], [2, 3]) -> [1, 2, 3]
export const mergeUnique = (arr1, arr2) =>
  arr1.concat(arr2.filter(item => arr1.indexOf(item) === -1));

export const findRight = (arr, predicate) =>
  arr
    .slice()
    .reverse()
    .find(predicate);

export function requestAnimationFramePromise() {
  return new Promise(resolve => window.requestAnimationFrame(resolve));
}

export function setTimeoutPromise(duration) {
  return new Promise(resolve => window.setTimeout(resolve, duration));
}

export const capitalize = str => str[0].toUpperCase() + str.slice(1);

export const deleteCookie = key => {
  document.cookie = `${encodeURIComponent(
    key
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const convertHexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const hyphenate = str => str.replace(/([A-Z])/g, '-$1').toLowerCase();

export const delay = duration =>
  new Promise(resolve => window.setTimeout(resolve, duration));

export const getDistanceBetweenPoints = (p1, p2) => {
  // Support both object form {x: x, y: y} and array form [x, y]
  const x1 = Array.isArray(p1) ? p1[0] : p1.x;
  const y1 = Array.isArray(p1) ? p1[1] : p1.y;
  const x2 = Array.isArray(p2) ? p2[0] : p2.x;
  const y2 = Array.isArray(p2) ? p2[1] : p2.y;

  const deltaX = Math.abs(x2 - x1);
  const deltaY = Math.abs(y2 - y1);

  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};

export const convertRadiansToDegrees = angle => (angle * 180) / Math.PI;
export const convertDegreesToRadians = angle => (angle * Math.PI) / 180;

export const getQuadrantForPoint = ([x, y]) => {
  if (x >= 0 && y >= 0) {
    return 1;
  } else if (x < 0 && y >= 0) {
    return 2;
  } else if (x < 0 && y < 0) {
    return 3;
  } else if (x >= 0 && y < 0) {
    return 4;
  } else {
    throw new Error(`Invalid coordinates: ${x} and ${y}`);
  }
};

export const convertCartesianToPolar = (point, centerPoint = [0, 0]) => {
  const pointRelativeToCenter = [
    point[0] - centerPoint[0],
    point[1] - centerPoint[1],
  ];

  const [x, y] = pointRelativeToCenter;

  // When going from cartesian to polar, it struggles with negative numbers.
  // We need to take quadrants into account!
  const quadrant = getQuadrantForPoint(pointRelativeToCenter);

  let radiansOffset = 0;
  if (quadrant === 2 || quadrant === 3) {
    radiansOffset += Math.PI;
  } else if (quadrant === 4) {
    radiansOffset += 2 * Math.PI;
  }

  const radius = Math.sqrt(x ** 2 + y ** 2);
  let theta = Math.atan(y / x) + radiansOffset;

  return [theta, radius];
};

export const convertCartesianLineToPolar = (line, centerPoint) => {
  return line.map(point => convertCartesianToPolar(point, centerPoint));
};

export const convertPolarToCartesian = ([θ, radius]) => {
  const x = radius * Math.cos(θ);
  const y = radius * Math.sin(θ);

  return [x, y];
};

export const mix = (v1, v2, ratio = 0.5) => v1 * ratio + v2 * (1 - ratio);

export const extractTypeFromObject = (obj, type) => {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    if (typeof val === type) {
      acc[key] = val;
    }

    return acc;
  }, {});
};

export const shallowCompare = (o1, o2, keys) => {
  return !keys.find(key => {
    return o1[key] !== o2[key];
  });
};

export const smoothScrollTo = selector => {
  const elem = document.querySelector(selector);

  try {
    window.requestAnimationFrame(() => {
      const verticalOffset = elem.getBoundingClientRect().top;

      window.scrollTo({
        top: verticalOffset + window.pageYOffset,
        left: 0,
        behavior: 'smooth',
      });
    });
  } catch (err) {
    console.error('Could not find element', id);
  }
};
