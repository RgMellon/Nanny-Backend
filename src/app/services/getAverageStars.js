// eslint-disable-next-line import/prefer-default-export
export function getAverageStars(rates) {
  if (rates.length === 0) {
    return '0';
  }

  const quantityRates = rates.length;

  // eslint-disable-next-line prefer-arrow-callback
  // eslint-disable-next-line func-names
  const sumStar = rates.reduce(
    (initialValue, rate) => initialValue + rate.star,
    // eslint-disable-next-line comma-dangle
    0
  );

  const avaregaStars = parseFloat(sumStar / quantityRates).toFixed(1);

  return avaregaStars;
}
