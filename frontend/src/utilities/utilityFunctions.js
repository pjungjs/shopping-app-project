const gimmeSpace = (spaces) => {
    return "\u00A0".repeat(spaces)
}

const deepCopyObject = (objectToDuplicate) => {
    const returnObject = {};
    for (const key in objectToDuplicate) {
      // null is object type in Javascript.
      if (typeof objectToDuplicate[key] === 'object' && objectToDuplicate[key] !== null) {
        returnObject[key] = deepCopyObject(objectToDuplicate[key]);
      } else {
        returnObject[key] = objectToDuplicate[key];
      }
    }
    return returnObject;
  }

module.exports = { gimmeSpace, deepCopyObject };