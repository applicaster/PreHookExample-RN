import { Iterable } from 'immutable';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default (env) => {
  const middlewares = [epicMiddleware];

  if (env !== 'production' && env !== 'test') {
    const logger = createLogger({
      stateTransformer: state => {
        const printableState = {};
        Object.keys(state).forEach(key => {
          printableState[key] = Iterable.isIterable(state[key]) ? state[key].toJS() : state[key];
        });
        return printableState;
      },
    });
    middlewares.push(logger);
  }

  return middlewares;
};
