import axios from 'axios';

const baseUrl = (env) => (env) ? `http://stars.${env}.applicaster.com/` : 'http://stars.applicaster.com/';

const fetchRequest = url => axios
    .get(url)
    .then(response => response.data)
    .catch(console.warn); // eslint-disable-line no-console

export default {
  getTimelines({ env, accountId }) {
    const url = `${baseUrl(env)}/v3/accounts/${accountId}/timelines.json`;
    return fetchRequest(url);
  },

  getEpisodes({ env, zoneId }) {
    const url = `${baseUrl(env)}/v3/zones/${zoneId}/episodes.json`;
    return fetchRequest(url);
  },

  getFeeds({ env, zoneId }) { // event sources = feeds
    const url = `${baseUrl(env)}/v3/zones/${zoneId}/feeds.json`;
    return fetchRequest(url);
  },

  getEvents({ env, zoneId, feedIds, sinceTimestamp }) { // event sources = feeds
    const feedIdParams = feedIds.map((feedId) => `feed_ids[]=${feedId}`);
    const url = `${baseUrl(env)}/v3/zones/${zoneId}/events.json?${feedIdParams.split('&')}&since=${sinceTimestamp}`;
    return fetchRequest(url);
  },
};
