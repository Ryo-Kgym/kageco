type hour = `${0 | 1}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `2${0 | 1 | 2 | 3}`;

type minute = `${0 | 1 | 2 | 3 | 4 | 5}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

type second = minute;

export type HHmmSS = `${hour}:${minute}:${second}`;
