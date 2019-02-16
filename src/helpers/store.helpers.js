export const calculateCost = (format, size) => {
  if (format === 'vector') {
    return 2000;
  } else {
    // prettier-ignore
    switch (size) {
      case 'small': return 9500;
      case 'medium': return 12500;
      case 'large': return 15000;
    }
  }
};
