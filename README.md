# Reacting the Right Way
## DjangoCon 2017 - Spokane, WA
### August 13, 2017

## Coding Styles
* JS Linter: [ESLint](https://www.npmjs.com/package/eslint-config-airbnb)
* React: [Airbnb Style](https://github.com/airbnb/javascript/tree/master/react)
* Redux: [Ducks](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c) &amp; [GitHub](https://github.com/erikras/ducks-modular-redux)

## Project Structure
- website
    - components
        - stateful
            - HomePage.jsx
            - TalkPage.jsx
            - Header.jsx
        - stateless
            - VoteCountDisplay.jsx (since it inherits from Row or Page)
            - VoteArrow.jsx
            - VoteTally.jsx
    - redux
        - index.js
        - talks.js (includes action_constants, reducer, normal action creators, async action creators)
            - reducer must be exported, aysnc action creator almost always, others optional)
        - users.js
        - votes.js
        - comments.js
    - api
        - base.js
        - helpers.js (normalization)

## Redux Ducks Pattern
1. `/talks`
  - action_constants
  - reducers
  - normal_action_creators
  - async_action_creators (thunks or sagas)

Actions
Reducers
Constants

Ducks

