const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const compiled = {};
const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../lib/effects.ts"), "utf8"),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  },
).outputText;
vm.runInNewContext(source, { exports: compiled });
const {
  FrameBudget,
  initialQuality,
  transitions,
  transitionAt,
  transitionSamples,
  atmosphereVisibility,
} = compiled;
assert.equal(initialQuality({ mobile: false, cores: 12, memory: 8 }), "high");
assert.equal(initialQuality({ mobile: true, cores: 8 }), "medium");
assert.equal(initialQuality({ mobile: false, cores: 4 }), "medium");
assert.equal(initialQuality({ mobile: false, memory: 2 }), "low");
assert.equal(initialQuality({ mobile: false, saveData: true }), "low");
const feed = (monitor, delta, frames) => {
  for (let i = 0; i < frames; i++) monitor.sample(delta);
  return monitor.level;
};
let monitor = new FrameBudget("high", "high");
assert.equal(
  feed(monitor, 1 / 30, 119),
  "high",
  "warmup + one window must not downgrade",
);
assert.equal(
  feed(monitor, 1 / 30, 91),
  "medium",
  "sustained slow frames downgrade",
);
assert.equal(feed(monitor, 1 / 30, 210), "low");
assert.equal(
  feed(monitor, 1 / 60, 480),
  "medium",
  "recovery requires five stable windows",
);
assert.equal(feed(monitor, 1 / 60, 480), "high");
monitor = new FrameBudget("medium", "medium");
assert.equal(
  feed(monitor, 1 / 120, 1600),
  "medium",
  "portrait/device ceiling is binding",
);
monitor = new FrameBudget("high", "high");
feed(monitor, 1 / 30, 150);
monitor.sample(8);
assert.equal(
  feed(monitor, 1 / 60, 210),
  "high",
  "idle/background gap clears slow history",
);
monitor = new FrameBudget("high", "high");
for (let i = 0; i < 12; i++) {
  feed(monitor, 1 / 60, 89);
  monitor.sample(1 / 20);
}
assert.equal(monitor.level, "high", "isolated jank must not oscillate quality");
for (let i = 0; i < transitions.length; i++) {
  const track = transitions[i];
  if (i)
    assert(
      transitions[i - 1].to < track.from,
      "transition windows must not overlap",
    );
  assert.equal(transitionAt((track.from + track.to) / 2), track);
  assert.equal(transitionSamples(track.from, track).outgoing, track.from);
  assert.equal(transitionSamples(track.to, track).incoming, track.to);
  const forward = [];
  for (let step = 0; step <= 100; step++) {
    const p = track.from + ((track.to - track.from) * step) / 100;
    const sample = transitionSamples(p, track);
    assert(sample.outgoing >= track.from && sample.outgoing <= track.to);
    assert(sample.incoming >= track.from && sample.incoming <= track.to);
    assert(atmosphereVisibility(p) >= 0 && atmosphereVisibility(p) <= 1);
    forward.push(JSON.stringify(sample));
  }
  for (let step = 100; step >= 0; step--) {
    const p = track.from + ((track.to - track.from) * step) / 100;
    assert.equal(
      JSON.stringify(transitionSamples(p, track)),
      forward[step],
      "reverse scroll samples exact same views",
    );
  }
}
console.log(
  "PASS: three quality tiers, downgrade/recovery hysteresis, device ceilings, idle/jank rejection, transition endpoints and deterministic reverse samples.",
);
