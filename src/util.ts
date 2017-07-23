import { stringify } from 'querystring';

// @internal
export function QsUrl (url: string, qs: object) {
  return url + '?' + stringify(qs);
}

const { keys } = Object;

// @internal
export function toPairs (o: object) {
  return keys(o).map(k => [k, o[k]]);
}

// @internal
export function compactObject<A extends object> (o: A) {
  return keys(o).reduce((pr, k) => {
    if (o[k] !== undefined) pr[k] = o[k];
    return pr;
  }, {}) as Partial<A>;
}

// @internal
export function of (x) {
  return Array.isArray(x) ? x : [x];
}