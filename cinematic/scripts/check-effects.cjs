const path = require("node:path");
const assert = require("node:assert/strict");
const loadTS = require("./load-ts.cjs");
const {
  FrameBudget,
  initialQuality,
  transitions,
  transitionAt,
  transitionSamples,
  atmosphereVisibility,
} = loadTS(path.join(__dirname, "../lib/effects.ts"));
const { smootherstep, navigationDuration, photoVisibility } = loadTS(
  path.join(__dirname, "../lib/motion.ts"),
);
for (let i = 0; i <= 100; i++) {
  const t = i / 100;
  assert(smootherstep(t) >= 0 && smootherstep(t) <= 1);
  if (i) assert(smootherstep(t) >= smootherstep(t - 0.01));
  assert(
    Math.abs(photoVisibility(t, 0.1, 0.9) - photoVisibility(1 - t, 0.1, 0.9)) <
      1e-12,
  );
}
assert.equal(smootherstep(0), 0);
assert.equal(smootherstep(1), 1);
assert(navigationDuration(5000, 900) > navigationDuration(900, 900));
assert.equal(navigationDuration(-5000, 900), navigationDuration(5000, 900));
assert(navigationDuration(500000, 900) <= 3.6);
assert(
  photoVisibility(0.1, 0.1, 0.9) === 0 && photoVisibility(0.9, 0.1, 0.9) === 0,
);
assert(photoVisibility(0.3, 0.1, 0.9) === 1);
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
  const h = 1e-6;
  assert(
    Math.abs(
      (transitionSamples(track.from + h, track).outgoing - track.from) / h - 1,
    ) < 0.001,
    "outgoing camera matches entry velocity",
  );
  assert(
    Math.abs(
      (track.to - transitionSamples(track.to - h, track).incoming) / h - 1,
    ) < 0.001,
    "incoming camera matches exit velocity",
  );
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
