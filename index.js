/**
 * @fileOverview Example of a custom iterable.
 * `Slices` is instantiated with arguments like: (any[], ...[number, number]).
 * Looping over an instance of Slices will provide a slice of its data on each iteration.
 * Usage example at bottom.
 */

class Slices {
  constructor(data, ...ranges) { this.data = data; this.ranges = ranges; };

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
        if (this.ranges[counter]) {
          const [start, end] = this.ranges[counter];
          return { value: this.data.slice(start, end), done: false };
        }
        return { value: undefined, done: true };
      },
    };
  };

  // naive approximation of Array.prototype.map()
  map = (callback) => {
    let mappedValues = [];
    for (const r of this) { mappedValues.push(callback(r, mappedValues.length)); }
    return mappedValues;
  };
}

/**
 * 
 * NOTE:
 * the `for ... of` on line 28 is up to something like this internally:
 * 
 * let state, iterator = iterableObject[Symbol.iterator]();
 * while (state = iterator.next(), state.done === false) {
 *   // state.value assigned to the iteration variable
 *   // then the provided code block executed
 * }
 * 
 */

// example usage
const slicedGroups = Slices.from(
  ['cat', 'dog', 'fish', 'hamster', 'parakeet', 'sugar glider'],
  [0, 2], [2, 4], [1, 4], [3, 6],
);

const descriptions = slicedGroups.map((slice) => slice.join(' + '));

console.log(descriptions);
