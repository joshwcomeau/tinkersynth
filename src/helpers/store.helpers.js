export const calculateCost = (format, size) => {
  if (format === 'vector') {
    return 1900;
  } else {
    // prettier-ignore
    switch (size) {
      case 'small': return 4900;
      case 'medium': return 6900;
      case 'large': return 11900;
    }
  }
};
