/**
 * @param {number} minutes
 * @returns {string} hours and minutes
 * @example formatminuts(100) // return "1h : 40 mins"
 */
export default function formatminuts(minutes: number): string {
  const [h, min] = (minutes / 60).toString().split(".");

  return `${h} h : ${min === undefined ? "00" : min.substring(0, 2)} mins`;
}
