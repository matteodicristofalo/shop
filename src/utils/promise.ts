export function extractFulfilledValueOrDefault<T>(
  promiseResult: PromiseSettledResult<T>,
  defaultValue: T
): T {
  return promiseResult.status === `fulfilled`
    ? promiseResult.value
    : defaultValue;
}
