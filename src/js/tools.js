export function luhnCheck(number) {
  let value;
  let sum = 0;

  for (let i = 0; i < number.length; i++) {
    value = +number[i];
    if (!(i % 2)) {
      value *= 2;
      if (value > 9) {
        value -= 9;
      }
    }
    sum += value;
  }
  return !(sum % 10);
}

export function isValid(number) {
  const result = { status: false, text: 'No number value' };
  if (!number) {
    return result;
  }

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(+number)) {
    result.text = 'Invalid characters in the card number';
    return result;
  }

  if (number.length < 13) {
    result.text = 'The number is too short';
    return result;
  }

  result.status = luhnCheck(number);

  if (result.status) {
    result.text = 'The number is valid';
  } else {
    result.text = 'The number is invalid';
  }

  return result;
}

export function getPaySystemInfo(number) {
  if (number[0] === '4') {
    return 0; // Visa
  }

  if (number[0] === '2') {
    return 8; // Мир
  }

  const n = +number.slice(0, 2);

  switch (n) {
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
      return 1; // Mastercard
    case 50:
    case 56:
    case 57:
    case 58:
    case 63:
    case 67:
      return 2; // Maestro
    case 34:
    case 37:
      return 3; // American Express
    case 60:
      return 4; // Discover
    case 30:
    case 36:
    case 38:
      return 5; // Diners Club
    case 31:
    case 35:
      return 6; // JSB International
    case 62:
      return 7; // China UnionPay
    default:
      return -1; // unknown payment system
  }
}
