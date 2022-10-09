/**
 * add comma separator to numbers in thousands
 * @param x
 */
export const numberWithCommas = (x?: number | string): string | undefined => {
  return Boolean(x) ? x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
};

/**
 * convert seconds to hours, minutes and seconds
 * @param seconds
 */
export const secondsToTime = (seconds: number | undefined): string => {
  const date = new Date(0);
  if (typeof seconds === 'number') {
    date.setSeconds(seconds);
  } // specify value for SECONDS here
  return date.toISOString().substring(11, 19);
};
