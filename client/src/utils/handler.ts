import { v4 as uuidv4 } from 'uuid';

export const emptyFunction = (..._args: any[]) => {};

export const getRandomId = (): string => uuidv4();

export const waiter = (time = 100) =>
  new Promise<Array<any>>((res) => setTimeout(() => res([]), time));

export const handleClick =
  (callback: (_arg0: React.MouseEvent) => void) => (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (callback) callback(event);
  };

export const scrollIntoView = (id: string, timeout: number = 0) => {
  const scroll = () => {
    const commentEl = document.getElementById(id);
    if (commentEl) {
      commentEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };
  if (timeout === 0) {
    return scroll();
  }
  setTimeout(() => {
    scroll();
  }, timeout);
};

// link https://stackoverflow.com/questions/42674473/get-all-keys-of-a-deep-object-in-javascript
export const deepKeys = (t: unknown, path: string[] = []) => {
  const res: string[] =
    Object(t) === t
      ? Object.entries(t) // 1
          .flatMap(([k, v]) => deepKeys(v, [...path, k]))
      : [path.join('.')]; // 2
  return res?.filter((x: string) => !/\d$/.test(x));
};

export const deepKeysHookFormErrors = (t: unknown, path: string[] = []) => {
  const res: string[] = deepKeys(t, path);

  const filteredRes = res.reduce((output: string[], item) => {
    if (/\d$/.test(item)) {
      return output;
    }

    const replacedItem = item.replace(/(\.type|\.message|\d)$/, '');

    output.push(replacedItem);

    return output;
  }, []);

  return [...new Set(filteredRes)];
};

const BYTES = 1024;

export const getFileSizeInKB = (size: number): string => `${(size / BYTES).toFixed(2)} KB`;

export const removeCsvExtension = (fileName: string): string => fileName.replace(/\.csv$/, '');

export const getCleanFileName = (url: string): string => {
  return url.match(/[^/]+_(.+)$/)?.[1] || 'Unknown File';
};
