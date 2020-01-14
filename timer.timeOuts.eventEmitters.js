//  by promises
const sleep = msec =>
  new Promise(resolve => {
    setTimeout(resolve, msec);
  });

(async () => {
  console.log(`Start sleep: ${new Date().toISOString()}`);
  console.log("Sleep about 3 sec");
  await sleep(3000);
  console.log("After sleep  " + new Date().toISOString());
})();

sleep();

// event loop priorities => fastest to slowest
/**
 * 1 Callbacks
 * 2 process.nextTick // node
 * 3 setTimeout
 * 4 setInterval
 * 5 setImmediate
 * 6 readfile // node
 */

// ! Event Emitters
const events = require("events");
const assert = require("assert");
const emitter = require("./emitter.js");

const ee = emitter();
ee.on("something", data => {
  assert.strictEqual(data.a, 6);
});

// event emitters on prototypes

const EventEmitter = function() {
  this.events = {}; // hash of array of functions
};

EventEmitter.prototype.on = function(name, fn) {
  const event = this.events[name];
  if (event) event.push(fn);
  else this.events[name] = [fn];
};

EventEmitter.prototype.emit = function(name, ...data) {
  const event = this.events[name];
  if (event) event.forEach(fn => fn(...data));
};

// event emitters with closures
const emitterClosure = () => {
  const events = {};
  return {
    on: (name, fn) => {
      const event = events[name];
      if (event) event.push(fn);
      else events[name] = [fn];
    },
    emit: (name, ...data) => {
      const event = events[name];
      if (event) event.forEach(fn => fn(...data));
    }
  };
};

// fp style
const emitterFunctional = (events = {}) => ({
  on: (name, fn) => (events[name] = events[name] || []).push(fn),
  emit: (name, ...data) => (events[name] || []).forEach(fn => fn(...data))
});

// Usage
const ee = emitter();

ee.on("event", data => {
  console.log({ data });
});

ee.emit("event", { flame: 100 });
