export function pearson(d1: number[], d2: number[]) {
  const {min, pow, sqrt} = Math;
  const add = (a: number, b: number) => a + b;
  const n = min(d1.length, d2.length);
  if (n === 0) {
    return 0
  }
  [d1, d2] = [d1.slice(0, n), d2.slice(0, n)];
  const [sum1, sum2] = [d1, d2].map(l => l.reduce(add));
  const [pow1, pow2] = [d1, d2].map(l => l.reduce((a, b) => a + pow(b, 2), 0));
  const mulSum = d1.map((n, i) => n * d2[i]).reduce(add);
  const dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n));
  if (dense === 0) {
    return 0
  }
  return (mulSum - (sum1 * sum2 / n)) / dense
}
