{
  const array = [];
  array[100] = 100;
  console.log(array.length);
}

{
  const array = [];
  array[1] = 100;
  array["first"] = 1;
  array[0] = 300;
  array[-1] = -100;
  console.log(array, "length: ", array.length);
}

{
  const array = Array(4);
  console.log(array, "length: ", array.length);
}

{
  const array = new Array(7, 3, 4, 5);
  console.log(array, "length: ", array.length);
}
{
  const array = Array.of(1, 2, 3);
  console.log(array, "length: ", array.length);
}
{
  const array = Array.from([1, 2, 3]);
  console.log(array, "length: ", array.length);
}
{
  const array = Array.from("12345", x => parseInt(x));
  console.log(array, "length: ", array.length);
}
{
  const array = [1, 2, 3];
  array.fill(0);
  console.log({ array, length: array.length });
}
{
  const array = [1, 2, 3, 4, 5, 6];
  array.fill(-2, 1, 3);
  console.log({ array, length: array.length });
}
/**
 * Array concat
 */
{
  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
  const array3 = array1.concat(array2);
  console.log({ array3, length: array3.length });
}
/**
 * Array every, some
 */
{
  const array = [1, 2, 3];
  console.log(array.every(x => x > 2));
}
{
  const array = ["a", "b", "c"];
  console.log(array.every(x => x > "a"));
}
{
  const array = ["a", "b", "c"];
  console.log(array.some(x => x > "a"));
}
/**
 * Filter
 */
{
  const array = [1, 2, 3, 4, 5, 6];
  console.log(array.filter(x => x % 2 === 0));
}
/**
 * Array find, findIndex
 */
{
  const array = [10, 20, 30, 40];
  console.log(array.find(x => x > 25));
}
{
  const array = [10, 20, 30, 40];
  console.log(array.findIndex(x => x > 25));
}
/**
 * Array flat
 */
{
  const array = [10, [20, 30], 40];
  console.log(array.flat());
}
{
  const array = [10, [20, [30]], 40, [50, [60, [70]]]];
  console.log(array.flat(3));
}
/**
 * IndexOf
 */
{
  const array = [1, 2, 3, 4, 2];
  console.log(array.indexOf(2));
}
{
  const array = [1, 2, 3, 2, 1];
  console.log(array.lastIndexOf(2));
}
{
  const array = [1, 2, 2, 1];
  console.log(array.indexOf(20));
}
// Join
{
  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
}
