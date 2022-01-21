export const unicodeRegExp =
  /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`);

/**
 * @example
 * ```
 * const path = 'a.b.c';
 * const segments = ['a', 'b', 'c'];
 * const obj = { a: { b: { c: 10 } } }
 * ```
 */
export function parsePath(path: string): any {
  if (bailRE.test(path)) {
    return;
  }

  const segments = path.split(".");

  return function (obj) {
    for (let i = 0, len = segments.length; i < len; i++) {
      if (!obj) return;

      obj = obj[segments[i]];
    }

    return obj;
  };
}
