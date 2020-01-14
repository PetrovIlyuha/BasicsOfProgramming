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
 * Контекст - ИП - объекты, на которых построено состояние подвергается мутациям (вызов АПИ или изменения в структурах данных)
 * Контекст - ФП - в качестве контекста выступает замыкание (замыкание - функторы - монады)
 * Пулы в ФП не могут присутствовать - но пулификацию фабрик можно делать
 * ИП - наследование на классах и прототипах \ ФП - за счёт частичного применения, каррирования и композиции - снижаем \ повышаем уровень абстракции
 * Композиция повышает уровень абстракции, а частичное применение - понижает
 * Боксирование - ИП = Фасад и Адаптер \ ФП = врапперы и замыкания
 * Расширение - ИП = миксины и декораторы \ ФП = Map и Декораторы
 * Кеширование - ИП = на структурах данных B-tree, hash-table / ФП = Функциональный контекст как основа мемоизации
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

// ! Instantiation
// closure context instead of object context
// Imperative
const model = {
  name: "BMW Series 5",
  year: "2018",
  upperName() {
    this.name = this.name.toUpperCase();
  },
  get age() {
    return new Date().getFullYear() - this.year;
  },
  toString() {
    return `${this.name} was made in ${this.year}`;
  }
};

// FP style
const age = year => new Date().getFullYear() - year;
const modelFP = (name, year) => () =>
  age(year) > 1
    ? `${name} was made ${age(year)} years ago}`
    : `${name} was made ${age(year)} year ago}`;
const bmw7 = modelFP("BMW Series 7", 2019);

// Map object instead of key iteration
// Imperative
const merkel = {
  firstname: "Angela",
  lastname: "Merkel",
  role: "bundeskanzler"
};

const politician = {};

for (const key in merkel) {
  const prop = key.toLowerCase().replace("name", "");
  const value = merkel[key].toUpperCase();
  politician[prop] = value;
}

console.log(politician);

// Functional

const inst = (prev, prop, val) => ({ ...prev, [prop]: val });

const omap = (obj, fn) =>
  Object.keys(obj).reduce((prev, key) => inst(prev, ...fn(key, obj[key]), {}));

const bernanke = {
  firstname: "Ben",
  lastname: "Bernanke",
  jobtitle: "banker"
};

const bernanko = omap(bernanke, (key, val) => [
  key.toLowerCase().replace("name", ""),
  val.toUpperCase()
]);

console.log(bernanko);

// Chaining IP
class Adder {
  constructor(initial) {
    this.value = initial;
  }
  add(value) {
    this.value += value;
    return this;
  }
  valueOf() {
    return this.value;
  }
}

const sum1 = new Adder(1).add(9).add(10);
console.log(+sum1);

// Chaining FP
const adder = initial =>
  Object.assign(value => adder(initial + value), { valueOf: () => initial });

const sum2 = adder(1)(20)(101);
console.log(+sum2);

// FP with methods
const add = initial => ({
  add: value => add(initial + value),
  valueOf: () => initial
});

const sum3 = add(9).add(10);
console.log(+sum3);
