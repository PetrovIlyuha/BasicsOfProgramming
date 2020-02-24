// Возможные реализации - RxJS, модель акторов

const { PI, sqrt } = Math;
const square = x => x * x;

const volume = (height, r1, r2) =>
  ((PI * height) / 3) * (square(r1) + r1 * r2 + square(r2));

const area = (height, r1, r2) =>
  PI *
  (square(r1) +
    square(r2) +
    sqrt(square(height) + square(r2 - r1) * (r1 + r2)));

// Usage
const cone = { r1: 10, r2: 15, height: 10 };

const coneVolume = volume(cone.height, cone.r1, cone.r2);
const coneArea = area(cone.height, cone.r1, cone.r2);

Proxy method for reactivity

const ROWS = 6;
const columns = ["A", "B", "C", "D", "E", "F"];
const data = {};

const table = new Proxy(data, {
  get(obj, key) {
    console.log("get", key);
    const cell = obj[key];
    return cell ? cell.value : "";
  },
  set(obj, key, value) {
    console.log("set", key, value);
    const type = typeof value;
    if (type === "function") {
      const expression = value;
      value = expression();
      obj[key] = { value, expression };
    } else {
      obj[key] = { value };
    }
    return true;
  }
});

// Usage
table.A1 = "city";
table.B1 = "population";
table.C1 = "area";
table.D1 = "density";
table.E1 = "country";
table.F1 = "relative";

table.A2 = "Moscow";
table.B2 = "14309200";
table.C2 = "4560";
table.D2 = "4000";
table.E2 = "Russia";

table.A3 = "London";
table.B3 = "13309200";
table.C3 = "4343";
table.D3 = "3000";
table.E3 = "UK";

table.A4 = "Los-Angeles";
table.B4 = "9039202";
table.C4 = "3333";
table.D4 = "5000";
table.E4 = "USA";

table.D5 = () => +table.D2 + +table.D3 + +table.D4;

table.F2 = () => Math.round((table.D2 * 100) / table.D5) + "%";
table.F3 = () => Math.round((table.D3 * 100) / table.D5) + "%";
table.F4 = () => Math.round((table.D4 * 100) / table.D5) + "%";

const output = [];

for (let i = 2; i <= ROWS; i++) {
  const row = {};
  output[i] = row;
  for (const col of columns) {
    row[col] = table[col + i];
  }
}

console.table(output);

// Observer through Event Emitter
const { EventEmitter } = require("events");
const { max } = Math;

const ee = new EventEmitter();
const cities = [];

const variables = {
  maxDensity: 0,
  count: 0
};

ee.on("city", city => {
  variables.count++;
  variables.maxDensity = max(variables.maxDensity, city.density);
  cities.push(city);
  cities.forEach(city => {
    city.relative = Math.round((city.density * 100) / variables.maxDensity);
  });
  console.table(cities);
});

ee.emit('city', {
  city: "Moscow",
  population: "15049302",
  area: 2348,
  density: 3123,
  country: "Russia"
})
ee.emit('city', {
  city: "Paris",
  population: "65748373",
  area: 4352,
  density: 1232,
  country: "France"
})
ee.emit('city', {
  city: "Atlanta",
  population: "7564855",
  area: 1238,
  density: 2441,
  country: "United States"
})




