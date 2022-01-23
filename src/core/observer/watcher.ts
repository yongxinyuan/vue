import {
  warn,
  remove,
  isObject,
  parsePath,
  _Set as Set,
  handleError,
  invokeWithErrorHandling,
  noop,
} from "../util/index";
import { traverse } from "./traverse";
import { queueWatcher } from "./scheduler";

import Dep, { pushTarget, popTarget } from "./dep";

import type { SimpleSet } from "../util/index";

let uid = 0;

export default class Watcher {
  vm: any;

  constructor(
    vm: any,
    expOrfn: string | Function,
    cb: Function,
    options?: object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm;

    if (isRenderWatcher) {
      vm._watcher = this;
    }

    vm._watcher.psuh(this);
  }

  addDep(dep: Dep) {}
  update() {}
}
