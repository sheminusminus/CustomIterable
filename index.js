class Slices {
  constructor(data, ...ranges) { this._data = data; this._ranges = ranges; };

  // naive approximation of Array.from()
  static from = (...args) => new Slices(...args);

  // make instances of Slices iterable-
  // this method will return an iterator when called
  [Symbol.iterator] = () => {
    let counter = -1;
    // an iterator is an object with a .next property, which is
    // a method that always returns the next value and state
    return {
      next: () => {
        counter += 1;
        if (this._ranges[counter]) {
          const [min, max] = this._ranges[counter];
          return { value: this._data.slice(min, max), done: false };
        }
        return { value: undefined, done: true };
      },
    };
  };

  // naive approximation of Array.prototype.map()
  map = (callback) => {
    let mappedValues = [];
    /**
     * internally, `for ... of` accomplishes something akin to this:
     * const iterator = iterableObject[Symbol.iterator]();
     * let state = iterator.next();
     * while (state.done === false) {
     *   // execute code block with state.value
     * }
     */
    for (const r of this) { mappedValues.push(callback(r, mappedValues.length)); }
    return mappedValues;
  };
}