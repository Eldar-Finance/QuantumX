const { getFeeBasedInEpoch } = require("../utils");

test("getFeeBasedInEpoch epoch 0", () => {
  expect(getFeeBasedInEpoch(1)).toBe(3);
});
test("getFeeBasedInEpoch epoch 1", () => {
  expect(getFeeBasedInEpoch(1)).toBe(3);
});
test("getFeeBasedInEpoch epoch 3", () => {
  expect(getFeeBasedInEpoch(3)).toBe(2);
});
test("getFeeBasedInEpoch epoch 19", () => {
  expect(getFeeBasedInEpoch(19)).toBe(1);
});
test("getFeeBasedInEpoch epoch 45", () => {
  expect(getFeeBasedInEpoch(45)).toBe(0);
});
test("getFeeBasedInEpoch epoch undefined", () => {
  expect(getFeeBasedInEpoch()).toBe(null);
});
