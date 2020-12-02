import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
  isBefore,
} from 'date-fns';

export function verifyIsOpen(openTime, closeTime) {
  const [hour, minute] = openTime.split(':');
  const [hourClose, minuteClose] = closeTime.split(':');

  const inital = setSeconds(setMinutes(setHours(new Date(), hour), minute), 0);

  const close = setSeconds(
    setMinutes(setHours(new Date(), hourClose), minuteClose),
    0
  );

  if (isAfter(inital, new Date())) {
    return false;
  }

  //18:00
  if (isAfter(new Date(), close)) {
    return false;
  }

  return true;
}

export { verifyIsOpen };
