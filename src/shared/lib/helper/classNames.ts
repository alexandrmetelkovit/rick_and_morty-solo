export type ClassValue =
  | string
  | Record<string, boolean | undefined | null>
  | undefined
  | null;

export function cn(...args: ClassValue[]): string {
  return args
    .reduce<string[]>((acc, arg) => {
      if (!arg) return acc;

      if (typeof arg === 'string') {
        acc.push(arg);
      } else if (typeof arg === 'object') {
        Object.entries(arg).forEach(([key, value]) => {
          if (value) acc.push(key);
        });
      }

      return acc;
    }, [])
    .join(' ');
}
