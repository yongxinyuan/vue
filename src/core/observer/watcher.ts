import Dep from "./dep";
import { parsePath, noop } from "../util/index";

class Component {
  _watcher?: Watcher;
  _watchers: Watcher[];
}

interface Options {
  deep?: boolean;
  user?: boolean;
  lazy?: boolean;
  sync?: boolean;
  before?: () => void;
}

let uid = 0;

export default class Watcher {
  vm: Component;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  before?: () => void;
  cb: () => void;
  id: number;
  active: boolean;
  dirty: boolean;
  deps: Dep[];
  newDeps: Dep[];
  depIds: Set<string>;
  newDepIds: Set<string>;
  expression: string;
  getter: () => void;
  value?: any;

  constructor(
    vm: Component,
    expOrFn: () => void | string,
    cb: () => void,
    options?: Options,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm;

    if (isRenderWatcher) {
      vm._watcher = this;
    }

    vm._watchers.push(this);

    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }

    this.cb = cb;
    this.id = ++uid;
    this.active = true;
    this.dirty = this.lazy;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.expression = expOrFn.toString();

    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);

      if (!this.getter) {
        this.getter = noop;
      }
    }

    this.value = this.lazy ? undefined : this.get();
  }

  get() {}
}
