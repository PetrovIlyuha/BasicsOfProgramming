/**
 *                    imperative                          Functional
 *
 * Control Flow   | Algorithmic steps              | Expression, function
 * Identifiers    | Assignment statement           | Call Arguments
 * State          | Hold state in contexts         | Stateless pure functions
 * Branching      | Conditional statement          | Conditional expression
 * Iteration      | Loops (for, while, do while)   | Recursion Calls
 * Context        | Object context                 | Closure, Functor, Monad
 * Instantiation  | New, Factory, Builder          | Factory function
 * Pool reuse     | Object pool                    | Pool, factory poolify
 * Inheritance    | Classes and Prototypes         | Compose, Partial, Curry
 * Virtual        | Virtual classes, methods       | Function contracts
 * Field access   | Getters and Setters            | Lenses
 * Boxing         | Facade and Adapter             | Wrappers and Closures
 * Extend         | Mixin, Decorator               | Map, Decorator
 * Asynchronicity | Callback,Locking               | Callback, Async compose
 * Async sugar    | Observable, async/await        | Promise, FutureContainer
 * Caching        | Hold cache in Hash Table       | Memoization
 * Chaining       | Method returns object          | Return function/object
 */

/**
 * Идентификаторы в фп = один идентификатор сопоставляется с результатом функционального выражения
 * ИП - объявление идентификаторов \ ФП - объявления только функциональных выражений
 * Состояние ИП - структуры данных, методы и функции меняют состояние \
 * Состояние ФП - все функции чистые, состояния после исполнения нет, только в момент вычисления
 * Ветвление ИП - условные операторы  \ ФП - используем только условные выражения (ternary operator)
 * Итерирование ИП - обычные итерирующие методы \
 * ФП - рекурсия - ничего не может исполнятся несколько раз в одном функциональном контексте
 *
 *
 *
 */

//  Arguments instead of mutable variables assignment
const { PI, sqrt } = Math;
const square = x => x * x;

// functional approach
// const PI = () => Math.PI;

// Imperative

const truncatedConeVolume = ({ height, r1, r2 }) => {
  const k = PI / 3;
  const sr1 = square(r1);
  const sr2 = square(r2);
  return k * height * (sr1 + r1 * r2 + sr2);
};

// Functional
const volume = (height, r1, r2) =>
  ((PI * height) / 3) * (square(r1) + r1 * r2 + square(r2));

const area = (height, r1, r2) =>
  PI *
  (square(r1) +
    square(r2) +
    sqrt(square(height) + square(r2 - r1) * (r1 + r2)));

// const cone = (height, r1, r2, volume, area) => ({
//   height,
//   r1,
//   r2,
//   volume,
//   area
// });

const cone = (...a) => ({ ...a });
const calcCone = ({ height, r1, r2 }) =>
  cone(height, r1, r2, volume(height, r1, r2), area(height, r1, r2));

{
  const cone = calcCone({ height: 8, r1: 10, r2: 15 });
  console.log(cone);
}

// Conditionals
const person = {
  name: "Joe Rogan",
  born: "1973",
  city: "Salt-Lake City"
};

// Imperative
{
  let output = `glorious `;
  if (person.born < 2000) {
    output += "Baby-Boomers";
  } else {
    output += "Millenials";
  }
  output = `${person.name} was born in an era of ${output}`;
  console.log(output);
}

// Functionlal
{
  const era = year => (year < 2000 ? "Baby-Boomers" : "Millenials");
  const { name, born } = person;
  const output = `${name} was born in an era of ${era(born)}`;
  console.log(output);
}

// Recursion calls instead of for loops
const numbers = [2, 6, -1, 334, 31];

// Imperative
for (let i = 0; i < numbers.length; i++) {
  const n = numbers[i];
  console.log(`Item ${i} is ${n}`);
}

// Loop function
const loop = (min, max, fn) => {
  for (let i = 0; i < max; i++) fn(i);
};

loop(0, numbers.length, i => {
  const n = numbers[i];
  console.log(`Item ${i} is ${n}`);
});

// Recursion

const iterate = (arr, fn, i = 0) => {
  if (i === arr.length) return;
  fn(arr[i], i);
  iterate(arr, fn, ++i);
};

iterate(numbers, (n, i) => {
  console.log(`Item ${i} is ${n}`);
});

// for each
numbers.forEach((n, i) => {
  console.log(`Item ${i}  is ${n}`);
});
