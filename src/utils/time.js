import moment from 'moment';

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf('day');
const YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
const AN_HOUR_OLD = REFERENCE.clone().subtract(1, 'hour').startOf('hour');
const A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');
const A_YEAR_OLD = REFERENCE.clone().subtract(1, 'year').startOf('year');

export const isToday = (momentDate) => momentDate.isSame(TODAY, 'd');
export const isYesterday = (momentDate) => momentDate.isSame(YESTERDAY, 'd');
export const isWithinAWeek = (momentDate) => momentDate.isAfter(A_WEEK_OLD);
export const isWithinAnHour = (momentDate) => momentDate.isAfter(AN_HOUR_OLD);
export const isWithinAYear = (momentDate) => momentDate.isAfter(A_YEAR_OLD);
