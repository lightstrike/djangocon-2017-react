import camelCase from 'lodash/camelCase';

export function apiToReduxFormat(myObject) {  // eslint-disable-line import/prefer-default-export
  /**
   * Takes an api response of any hydration level and returns the object
   * our front end will use by making all "snake_case" keys "camelCase"
   */
  const newObject = {};
  const snakeKeys = Object.keys(myObject);
  for (let i = 0; i < snakeKeys; i += 1) {
    const snakeKey = snakeKeys[i];
    const camelCaseKey = camelCase(snakeKey);

    if (myObject[snakeKey] && typeof myObject[snakeKey] === 'object') {
      // the value for this key represents a FK or M2M relationship
      if (Array.isArray(myObject[snakeKey])) {
        // the value for this key represents a M2M relationship
        newObject[camelCaseKey] = myObject[snakeKey].map((value) => {
          if (typeof value === 'number') {
            return value;
          }
          return apiToReduxFormat(value);
        });
      } else {
        newObject[camelCaseKey] = apiToReduxFormat(myObject[snakeKey]);
      }
    } else {
      // the value for this key doesn't represent a FK or M2M relationship
      newObject[camelCaseKey] = myObject[snakeKey];
    }
  }
  return {
    id: myObject.id,
    data: newObject,
  };
}
