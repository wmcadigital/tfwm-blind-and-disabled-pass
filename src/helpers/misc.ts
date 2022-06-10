/* eslint-disable */
export const isNull = (value: any) => value === null;
export const isNotNull = (value: any) => !isNull(value);

export const formatSortCode = (sortCode: string) => {
  const formattedSortCode = `${sortCode}`
    .split('')
    .filter((item) => !isNaN(parseInt(item, 10)))
    .reduce((prevString, item, index) => {
      const connector = index > 0 && index % 2 === 0 ? '-' : '';
      return `${prevString}${connector}${item}`;
    }, '');
  return formattedSortCode;
};

export const unformatSortCode = (sortCodeString: string) => {
  return `${sortCodeString}`.split('-').join('');
};
