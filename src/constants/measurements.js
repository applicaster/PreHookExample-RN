import { store } from '../App';

export const SCREEN_MARGIN = 20;
export const BORDER_RADIUS = () => store && store.getState().app.get('squareBorders') ? 0 : 15;
export const TOP_CARD_LIST_PADDING = 15;
export const MAX_SUMMARY_LENGTH = 120;
