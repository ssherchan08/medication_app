export enum CaseType {
  snake = 'snake',
  camel = 'camel',
}

const isArray = a => {
  return Array.isArray(a);
};

const isObject = o => {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

// to convert the snake case object key to camel case
const toCamel = s =>
  s.replace(/([-_][a-z])/gi, $1 => $1.toUpperCase().replace('_', ''));

// to convert string to camelCase
const convertToCamel = (data: string): string => {
  return data
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, '');
};

// to convert the camel case object key to snake case
const toSnake = s =>
  s
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');

export const convertKeys = (
  o,
  destinationFormat = CaseType.snake.toString(),
) => {
  let fn;
  if (destinationFormat === CaseType.snake) {
    fn = toSnake;
  } else if (destinationFormat === CaseType.camel) {
    fn = toCamel;
  }
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[fn(k)] = convertKeys(o[k], destinationFormat);
    });

    return n;
  } else if (isArray(o)) {
    return o.map(i => convertKeys(i, destinationFormat));
  }
  return o;
};
