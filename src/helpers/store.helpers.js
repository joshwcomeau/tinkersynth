export const calculateCost = (format, size) => {
  if (format === 'vector') {
    return 500;
  } else {
    // prettier-ignore
    switch (size) {
      case 'small': return 9900;
      case 'medium': return 14900;
      case 'large': return 21900;
    }
  }
};
