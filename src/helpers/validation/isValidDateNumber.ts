const isValidDateNumber = (value: string, minValue: number, maxValue: number): boolean => {
  const dateNumber = parseInt(value, 10);
  if (Number.isNaN(dateNumber)) return false;

  const minDigits = minValue.toString().length;
  const maxDigits = maxValue.toString().length;
  const regex = new RegExp(`^[0-9]{${minDigits},${maxDigits}}$`, 'g');

  return dateNumber >= minValue && dateNumber <= maxValue && regex.test(value);
};

export default isValidDateNumber;
