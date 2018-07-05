import moment from 'moment-with-locales-es6';

moment.locale('es');
const REFERENCE = moment();
const A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');
const A_MONTH_OLD = REFERENCE.clone().subtract(1, 'month').startOf('month');
const A_YEAR_OLD = REFERENCE.clone().subtract(1, 'year').startOf('year');

export const isWithinAWeek = (momentDate) => momentDate.isAfter(A_WEEK_OLD);
export const isWithinAMonth = (momentDate) => momentDate.isAfter(A_MONTH_OLD);
export const isWithinAYear = (momentDate) => momentDate.isAfter(A_YEAR_OLD);

export const timeFromNow = (timestamp) => {
  const time = moment.unix(timestamp);
  const eventMoment = time.isDST() ? time.subtract(1, 'hour') : time;

  if (isWithinAWeek(eventMoment)) {
    return eventMoment.fromNow();
  } else if (isWithinAYear(eventMoment)) {
    return eventMoment.format('MMMM D');
  }
  
  return eventMoment.format('MMMM D, YYYY');
};
