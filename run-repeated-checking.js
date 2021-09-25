const { handler } = require("./index");

const interval = 20000; // 20s

run();

async function runIteration() {
  console.log("=== Running a new iteration ===");
  await handler();
}

async function run() {
  await runIteration();
  setInterval(runIteration, interval);
}
