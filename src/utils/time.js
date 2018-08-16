import moment from 'moment-with-locales-es6';
import FeedRNUtils from '@applicaster/feed-rn-utils';

const locale = FeedRNUtils.locale || 'en';
moment.locale(locale);
const REFERENCE = moment();
const A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');
const A_MONTH_OLD = REFERENCE.clone().subtract(1, 'month').startOf('month');
const A_YEAR_OLD = REFERENCE.clone().subtract(1, 'year').startOf('year');

export const isWithinAWeek = (momentDate) => momentDate.isAfter(A_WEEK_OLD);
export const isWithinAMonth = (momentDate) => momentDate.isAfter(A_MONTH_OLD);
export const isWithinAYear = (momentDate) => momentDate.isAfter(A_YEAR_OLD);

export const timeFromNow = (timestamp) => {
  const time = moment(timestamp);

  if (isWithinAWeek(time)) {
    return time.fromNow();
  } else if (isWithinAYear(time)) {
    return time.format('MMMM D');
  }
  
  return time.format('MMMM D, YYYY');
};
