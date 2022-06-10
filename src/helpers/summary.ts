/*eslint-disable */
const removeNthItem = <T>(tableRow: T[], numToRemove: number): T[] => {
  return [...tableRow.slice(0, numToRemove - 1), ...tableRow.slice(numToRemove)];
};

export { removeNthItem };
