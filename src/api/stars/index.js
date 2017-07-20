import axios from 'axios';

const baseStarsUrl = (env) => (env) ? `http://stars.${env}.applicaster.com/` : 'http://stars.applicaster.com/';

const fetchRequest = url => axios.get(url); // eslint-disable-line no-console

export const fetchTimelines = ({ env, accountId }) => {
  const url = `${baseStarsUrl(env)}v3/accounts/${accountId}/timelines.json`;
  return fetchRequest(url);
};

export const fetchEpisodes = ({ env, zoneId }) => {
  const url = `${baseStarsUrl(env)}v3/zones/${zoneId}/episodes.json`;
  return fetchRequest(url);
};

export const fetchFeeds = ({ env, zoneId }) => { // event sources = feeds
  const url = `${baseStarsUrl(env)}v3/zones/${zoneId}/feeds.json`;
  return fetchRequest(url);
};

export const fetchEvents = ({ env, zoneId, feedIds, sinceTimestamp }) => { // event sources = feeds
  const feedIdParams = feedIds.map((feedId) => `feed_ids[]=${feedId}`);
  const url = `${baseStarsUrl(env)}v3/zones/${zoneId}/events.json?${feedIdParams.split('&')}&since=${sinceTimestamp}`;
  return fetchRequest(url);
};
