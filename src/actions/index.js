import { actionCreator } from './actionHelpers';

/* CONSTANTS */
export const START_LOADING_TIMELINES = 'START_LOADING_TIMELINES';
export const DONE_LOADING_TIMELINES = 'DONE_LOADING_TIMELINES';

/* ACTIONS */
export const loadingTimelines = () => actionCreator(START_LOADING_TIMELINES);
export const doneLoadingTimelines = () => actionCreator(DONE_LOADING_TIMELINES);
