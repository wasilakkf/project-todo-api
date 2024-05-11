const isoDateRegexp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;

export function isValidIsoDate(dateString: string) {
  if (!isoDateRegexp.test(dateString)) {
    console.log('HERE1');
    return false;
  }

  const dateObject = new Date(dateString);

  return dateObject instanceof Date && dateObject.toISOString() == dateString;
}

export function isoDateToDatetime(isoDateString: string) {
  return isoDateString.slice(0, 19).replace('T', ' ');
}
