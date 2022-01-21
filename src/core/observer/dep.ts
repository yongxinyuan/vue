import Watcher from "./watcher";
import { remove } from "../util/index";
import config from "../config";

let uid = 0;

export default class Dep {
  static target?: Watcher;
  id: number;
  subs: Watcher[];

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  removeSub(sub: Watcher) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;

const targetStack = [];

export function pushTarget(target?: Watcher) {
  targetStack.push(target);

  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();

  Dep.target = targetStack[targetStack.length - 1];
}
