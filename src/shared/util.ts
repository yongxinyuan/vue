export const emptyObject = Object.freeze({});

export function isUndef(v: any) {
  return v === undefined || v === null;
}

export function isDef(v: any) {
  return v !== undefined && v !== null;
}

export function isTrue(v: any) {
  return v === true;
}

export function isFalse(v: any) {
  return v === false;
}

const primitiveSet = ["string", "number", "symbol", "boolean"];

export function isPrimitive(value: any) {
  return primitiveSet.includes(typeof value);
}

export function isObject(obj: any) {
  return obj !== null && typeof obj === "object";
}

const _toString = Object.prototype.toString;

export function toRawType(value: unknown): string {
  return _toString.call(value).slice(8, -1);
}

export function isPlainObject(obj: unknown) {
  return _toString.call(obj) === "[object Object]";
}

export function isRegExp(v: any) {
  return _toString.call(v) === "[object RegExp]";
}

export function isValidArrayIndex(value: any) {
  const n = parseFloat(String(value));
  return n >= 0 && Math.floor(n) === n && isFinite(value);
}

export function isPromise(val: any) {
  return (
    isDef(val) &&
    typeof val.then === "function" &&
    typeof val.catch === "function"
  );
}

export function toString(val: any) {
  return val === null
    ? ""
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
    ? JSON.stringify(val, null, 2)
    : String(val);
}

export function toNumber(val: string): number | string {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0, len = list.length; i < len; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => map[val.toLowerCase()] : (val) => map[val];
}

export const isBuiltInTag = makeMap("slot,component", true);

export const isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");

export function remove(arr: any[], item: any): any[] | void {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj: Object | Array<any>, key: string): boolean {
  return hasOwnProperty.call(obj, key);
}

export function cached<T>(fn: (str: string) => T) {
  const cache: Record<string, T> = Object.create(null);
  return function cachedFn(str: string): T {
    const hit = cache[str];

    if (hit) {
      return hit;
    }

    const unhit = (cache[str] = fn(str));

    return unhit;
  };
}

const camelizeRE = /-(\w)/g;

/**
 * user-name => userName
 */
export const camelize = cached<string>((str: string) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
});

/**
 * username => Username
 */
export const capitalize = cached<string>((str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

const hyphenateRE = /\B([A-Z])/g;

/**
 * userName => user-name
 */
export const hyphenate = cached<string>((str: string) => {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});

function polyfillBind(fn: Function, ctx: Object): Function {
  function boundFn(a) {
    const l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx);
  }

  boundFn._length = fn.length;

  return boundFn;
}

function nativeBind(fn: Function, ctx: Object): Function {
  return fn.bind(ctx);
}

export const bind = Function.prototype.bind ? nativeBind : polyfillBind;

export function toArray<T>(list: Array<T>, start?: number): Array<T> {
  start = start || 0;

  let i = list.length - start;

  const ret: Array<T> = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}

export function extend(to: Object, _from?: Object): Object {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
}

export function toObject(arr: Array<any>): Object {
  const res = {};
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

export function noop(a?: any, b?: any, c?: any) {}

export const no = (a?: any, b?: any, c?: any) => false;

export const identity = (_: any) => _;

export function genStaticKeys(modules: Array<any>): string {
  return modules
    .reduce((keys, m) => {
      return keys.concat(m.staticKeys || []);
    }, [])
    .join(",");
}

export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true;

  const isObjectA = isObject(a);
  const isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i]);
          })
        );
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every((key) => {
            return looseEqual(a[key], b[key]);
          })
        );
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

export function looseIndexOf<T>(arr: Array<T>, val: T): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i;
  }
  return -1;
}

export function once(fn: Function): Function {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
