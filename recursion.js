const getMaxCallStackSize = i => {
  try {
    return getMaxCallStackSize(++i);
  } catch (e) {
    return i;
  }
};

console.log(getMaxCallStackSize(0));

// indirect recursion
function f(x) {
  return g(x);
}

function g(x) {
  return f(x);
}

// console.log(f(0));

// Factorial
const factorial = n => {
  if (n === 0) return 1;
  else return n * factorial(n - 1);
};

console.log(factorial(10));

// Fibonacci
const Fibonacci = n => (n <= 2 ? 1 : Fibonacci(n - 1) + Fibonacci(n - 2));

console.log(Fibonacci(10));

// reduce
const reduce = (fn, acc, [cur, ...rest]) => {
  return cur === undefined ? acc : reduce(fn, fn(acc, cur), rest);
};

const result = reduce((a, b) => a + b, 0, [1, 2, 3, 4, 5, 6, 7, 8]);

console.log(result);

//  tail recursion
const add = (n, acc = 0) => {
  if (n === 0) return acc;
  return add(n - 1, acc + n);
};

console.log(add(5));

// косвенная рекурсия
const tail = (n, acc = 0) => {
  while (true) {
    if (n === 0) return acc;
    acc = acc + n;
    n = n - 1;
  }
};

console.log(tail(5));
