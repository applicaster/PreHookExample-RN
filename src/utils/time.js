import moment from 'moment';

const REFERENCE = moment();
const A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');
const A_YEAR_OLD = REFERENCE.clone().subtract(1, 'year').startOf('year');

export const isWithinAWeek = (momentDate) => momentDate.isAfter(A_WEEK_OLD);
export const isWithinAYear = (momentDate) => momentDate.isAfter(A_YEAR_OLD);