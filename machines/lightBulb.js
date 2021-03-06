const { Machine, interpret } = require("xstate");

const lit = {
  on: {
    BREAK: "broken",
    TOGGLE: "unlit",
  },
};
const unlit = {
  on: {
    BREAK: "broken",
    TOGGLE: "lit",
  },
};
const broken = {
  type: "final",
};

const states = { lit, unlit, broken };

const initial = "unlit";

const config = {
  id: "lightBulb",
  initial,
  states,
  strict: true,
};

const lightBulbMachine = Machine(config);

const service = interpret(lightBulbMachine).start();

service.onTransition((state) => {
  if (state.changed) {
    console.log(state.value);
  }
});

service.send("TOGGLE");
service.send("TOGGLE");
service.send("BREAK");
