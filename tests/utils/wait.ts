export function waitForBeingDefined<T>(
  callback: () => Promise<T>
): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 1000);

    const interval = setInterval(async () => {
      const value = await callback();

      if (value) {
        clearInterval(interval);
        resolve(value);
      }
    }, 100);
  });
}
