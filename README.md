[![CircleCI](https://circleci.com/gh/applicaster/Hooks-RN/tree/master.svg?style=shield&circle-token=ba1fbc3334cecc65bfcbd590a4130f67907df08f)](https://circleci.com/gh/applicaster/Hooks-RN/tree/master)

# React-Native Feed (BETA)

This project is the Feed built using react native.

![arnaumarinoct20](https://user-images.githubusercontent.com/1060904/31844670-261fd302-b5c8-11e7-8335-ad0fd8d2adc1.gif)


# Requirements
- node >= 8.1.4
- npm = 5.0.4

# How to run the project:
- `npm install -g react-native@0.47.1`
- `npm install`
- `npm login`

- Ensure that npm login generated the file:  `~/.npmrc`
- `export NPM_TOKEN={value from npmrc}`
- `react-native start`

You should now see the packager running on port 8081 and open your corresponding iOS/Android app.

# How to run tests:
## Mocha Tests
1. The first set are Mocha tests that cover the Reducer, API, Actions, RXJS Epics, and anything related to the business logic.
- `npm run test`

## Jest Snapshot Tests
2. The second set are Jest Snapshot tests which ensure that the rendering of the React Components has not changed to avoid regresions.

- `npm run jest`

If the snapshots need to be reset due to new functionality of the rendered components:
- `npm run jest-reset`



# Author:
Applicaster - Miami Team - Carlos Pinto
