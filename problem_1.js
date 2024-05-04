// 1. Using loop
var sum_to_n_a = function (n) {
  if (n < 0) return n;

  return Array.from(new Array(n), (_, index) => index + 1).reduce(
    (total, currentValue) => (total += currentValue),
    0
  );
};

// 2. Using recursion
var sum_to_n_b = function (n) {
  if (n > 0) return n + sum_to_n_b(n - 1);

  return n;
};

// formula
var sum_to_n_c = function (n) {
  if (n < 0) return n;

  return ((n + 1) * n) / 2;
};

console.log({ a: sum_to_n_a(3) });
console.log({ b: sum_to_n_b(3) });
console.log({ c: sum_to_n_c(3) });
