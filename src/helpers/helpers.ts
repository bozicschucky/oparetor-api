/**
 *
 * @param r the interest rate
 * @param n number of times the interest is compounded per year
 * @returns number apy
 */
export const computeApy = (r: number, n: number) => {
  const apy: number = ((1 + r / n) ** n - 1) * 100;
  return +apy.toFixed(4);
};
