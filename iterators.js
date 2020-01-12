// ! for in object
// const hash = {
//   first: 10,
//   second: 20,
//   third: 30,
//   fourth: 40
// };

// hash.fifth = 50;

// for (const key in hash) {
//   const value = hash[key];
//   console.dir(`
//     key: ${key}
//     value: ${value}
//   `);
// }

// break
// const flag = false;

// label1: {
//   console.log(1);
//   label2: {
//     console.log(2);
//     break label1;
//     console.log(3);
//   }
// }

// continue
// let i = 0;
// while (i < 10) {
//   i++;
//   console.log("Hello");
//   if (i === 5) continue;
//   console.log("World");
// }

// forEach
const numbers = [1, 2, 3, 4, 5];

// numbers.forEach((item, i, arr) => {
//   console.log(i,item);
// })

// const log = x => console.log(x);

// numbers.forEach(log)

// map, filter, reduce
// const log = (s, i) => {
//   console.log(`index: ${i} | value: ${s}`);
//   return s;
// };

// const f1 = x => x * 2;
// const f2 = x => ++x;

// const compose = (...funcs) => x => funcs.reduce((v, f) => f(v), x);

// const f3 = compose(f1, f2);

// const result1 = [1, 200, 400, 500, 1000]
//   .filter(x => x > 400)
//   .map(log)
//   .map(f3)
//   .map(log)
//   .reduce((acc, val) => acc + val);

// console.log(result1);

// ? matrix
const matrix = [
  [2, 45, 36, 200, 1],
  [4, 65, 100, 87],
  [2, 34, 12, 300, 4],
  [54, 66, 78, 400, 43]
];

const max = (a, b) => (a > b ? a : b);

const result = matrix
  .map(row => row.reduce(max))
  .reduce((acc, rowMax) => acc + rowMax);

console.log(result);

for (const i in matrix) {
  const row = matrix[i];
  for (const j in row) {
    const col = row[j];
    console.log(i, j, col);
  }
}

for (const row of matrix) {
  for (const item of row) {
    console.log(item);
  }
}

// the way forEach works we automatically gets indexes
matrix.forEach((row, i) => {
  row.forEach((col, j) => {
    console.log(i, j, col);
  });
});

// iterator
const range = {
  start: 1,
  end: 10,
  [Symbol.iterator]() {
    let value = this.start;
    return {
      next: () => ({
        value,
        done: value++ === this.end + 1
      })
    };
  }
};

console.dir({
  range,
  names: Object.getOwnPropertyNames(range),
  symbols: Object.getOwnPropertySymbols(range)
});

for (const number of range) {
  console.log(number);
}

const sum = (prev, current) => prev + current;
const sumIterable = (...iterable) => iterable.reduce(sum);

const sumOfRange = sumIterable(...range);
console.log(`Sum of Range = ${sumOfRange}`);

// reverse-iteration
const arr = [5, 4, 3, 2, 1];

arr[Symbol.iterator] = function() {
  let index = this.length;
  return {
    next: () => ({
      done: index-- === 0,
      value: this[index]
    })
  };
};

for (const num in arr) {
  console.log(num);
}
