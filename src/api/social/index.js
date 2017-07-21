import axios from 'axios';

const baseS3Url = env => (env === 'production')
? 'http://assets-production.applicaster.com/social-media-aggregator/'
: 'http://assets-development.applicaster.com/social-media-aggregator/';
const fetchRequest = url => axios.get(url);

export const fetchSocialEvents = ({ environment, accountId, timelineId }) => {
  const url = `${baseS3Url(environment)}/${accountId}/${timelineId}/instagram.json`;
  return fetchRequest(url);
};
