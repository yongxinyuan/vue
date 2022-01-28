/* @flow */

import config from "../config";
import { warn } from "./debug";
import { set } from "../observer/index";
import { unicodeRegExp } from "./lang";
import { nativeWatch, hasSymbol } from "./env";

import { ASSET_TYPES, LIFECYCLE_HOOKS } from "shared/constants";

import {
  extend,
  hasOwn,
  camelize,
  toRawType,
  capitalize,
  isBuiltInTag,
  isPlainObject,
} from "shared/util";

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
const strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== "production") {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        `option "${key}" can only be used during instance ` +
        "creation with the `new` keyword."
      );
    }
    return defaultStrat(parent, child);
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData(to: Object, from: ?Object): Object {
  if (!from) return to;
  let key, toVal, fromVal;

  const keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === "__ob__") continue;
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}

/**
 * Data
 */
export function mergeDataOrFn(
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn() {
      return mergeData(
        typeof childVal === "function" ? childVal.call(this, this) : childVal,
        typeof parentVal === "function" ? parentVal.call(this, this) : parentVal
      );
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      const instanceData =
        typeof childVal === "function" ? childVal.call(vm, vm) : childVal;
      const defaultData =
        typeof parentVal === "function" ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (
  parentVal: any,
  childVal: any,
  vm?: Component
): ?Function {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      process.env.NODE_ENV !== "production" &&
        warn(
          'The "data" option should be a function ' +
          "that returns a per-instance value in component " +
          "definitions.",
          vm
        );

      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook(
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets(
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): Object {
  const res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== "production" &&
      assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + "s"] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal: ?Object,
  childVal: ?Object,
  vm?: Component,
  key: string
): ?Object {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) parentVal = undefined;
  if (childVal === nativeWatch) childVal = undefined;
  /* istanbul ignore if */
  if (!childVal) return Object.create(parentVal || null);
  if (process.env.NODE_ENV !== "production") {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) return childVal;
  const ret = {};
  extend(ret, parentVal);
  for (const key in childVal) {
    let parent = ret[key];
    const child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child)
        ? child
        : [child];
  }
  return ret;
};

/**
 * Other object hashes.
 */
strats.props =
  strats.methods =
  strats.inject =
  strats.computed =
  function (
    parentVal: ?Object,
    childVal: ?Object,
    vm?: Component,
    key: string
  ): ?Object {
    if (childVal && process.env.NODE_ENV !== "production") {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) return childVal;
    const ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) extend(ret, childVal);
    return ret;
  };
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined ? parentVal : childVal;
};

/**
 * Validate component names
 */
function checkComponents(options: Object) {
  for (const key in options.components) {
    validateComponentName(key);
  }
}

export function validateComponentName(name: string) {
  if (
    !new RegExp(`^[a-zA-Z][\\-\\.0-9_${unicodeRegExp.source}]*$`).test(name)
  ) {
    warn(
      'Invalid component name: "' +
      name +
      '". Component names ' +
      "should conform to valid custom element name in html5 specification."
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      "Do not use built-in or reserved HTML elements as component " +
      "id: " +
      name
    );
  }
}

/**
 * 确保所有的 props 配置都是标准的基于对象的格式
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps(options: Object, vm: ?Component) {
  // 配置的 props
  const props = options.props;

  // 没有 props 不处理
  if (!props) return;

  // 标准的 props 对象
  const res = {};

  let i, val, name;

  // 数组
  // 元素必须是字符串
  // [ a, b ] => { a: { type: null }, b: { type: null } }
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === "string") {
        // 驼峰
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== "production") {
        warn("props must be strings when using array syntax.");
      }
    }
  }
  // 普通对象
  // { a: { type: Number }, b: Number } => { a: { type: Number }, b: { type: Number } }
  else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : { type: val };
    }
  }
  // 其他
  else if (process.env.NODE_ENV !== "production") {
    warn(
      `Invalid value for option "props": expected an Array or an Object, ` +
      `but got ${toRawType(props)}.`,
      vm
    );
  }
  options.props = res;
}

/**
 * 标准化所有 injections 基于对象格式
 * Normalize all injections into Object-based format
 */
function normalizeInject(options: Object, vm: ?Component) {
  const inject = options.inject;
  if (!inject) return;

  // object
  const normalized = (options.inject = {});

  // array
  // [ 'a', 'b' ] => { a: { from: 'a' }, b: { from: 'b' }  }
  if (Array.isArray(inject)) {
    for (let i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  }
  // plain object
  // { a: { pa: 'pa', pb: 'pb' }, b: 'parent' } => 
  // { a: { from: 'a', pa: 'pa', pb: 'pb' }, b: { from: 'parent' } }
  else if (isPlainObject(inject)) {
    for (const key in inject) {
      const val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  }
  // other
  else if (process.env.NODE_ENV !== "production") {
    warn(
      `Invalid value for option "inject": expected an Array or an Object, ` +
      `but got ${toRawType(inject)}.`,
      vm
    );
  }
}

/**
 * directives  => 标准的基于对象的格式
 * Normalize raw function directives into object format.
 */
function normalizeDirectives(options: Object) {
  const dirs = options.directives;
  if (dirs) {
    for (const key in dirs) {
      const def = dirs[key];
      if (typeof def === "function") {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType(name: string, value: any, vm: ?Component) {
  if (!isPlainObject(value)) {
    warn(
      `Invalid value for option "${name}": expected an Object, ` +
      `but got ${toRawType(value)}.`,
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions(
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== "production") {
    checkComponents(child);
  }

  // 如果 child 是构造函数，读取构造函数的 options
  if (typeof child === "function") {
    child = child.options;
  }

  // 将子组件构造函数的 props、injections、directives 标准化处理
  // options.props = { a: { type: Number }, b: { type: null } }
  normalizeProps(child, vm);
  // options.injections = { a: { from: '' }, b: { from: '', ...extra } }
  normalizeInject(child, vm);
  // options = { bind: () => void, update: () => void }
  normalizeDirectives(child);

  // 处理 extends、mixins 属性
  // 只处理原始 options 对象，而不是其他 mergeOptions 处理过的结果
  // 只合并具有 _base 的 options
  // 没有 _base 属性，options 是未处理过的对象，可以处理
  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    // extends 属性
    // 子元素的 extends 属性合并到 parent options 中
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    // 子元素 mixins 中的元素分别合并到 parent 中
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  const options = {};
  let key;

  // 父元素的所有属性合并到新对象
  for (key in parent) {
    mergeField(key);
  }

  // 子元素中父元素没有的合并到新对象
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key) {
    const strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  // 返回新对象
  return options;
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
export function resolveAsset(
  options: Object,
  type: string,
  id: string,
  warnMissing?: boolean
): any {
  /* istanbul ignore if */
  if (typeof id !== "string") {
    return;
  }
  const assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) return assets[id];
  const camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) return assets[camelizedId];
  const PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId];
  // fallback to prototype chain
  const res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== "production" && warnMissing && !res) {
    warn("Failed to resolve " + type.slice(0, -1) + ": " + id, options);
  }
  return res;
}
