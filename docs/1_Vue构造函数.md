```
class Vue {
  // @link /src/core/instance/index.js

  // 构造函数
  constructor(options: object) {
    this._init(options);
  }

  // @link /src/core/instance/init.js

  // 初始化 Vue 实例
  _init(options: object) {}

  // @link /src/core/instance/state.js

  get $data() { return this._data }
  get $props() { return this._props }
  $set(target: any[] | object, key: any, val: any): any {}
  $delete(target: any[] | object, key: any) {}
  $watch(expOrFn: string | Function, cb: any, options?: object) {}

  // @link /src/core/instance/events.js

  $on(event: string | string[], fn: Function): vm {}
  $once(event: string, fn: Function) {}
  $off(event?: string | string[], fn?: Function) {}
  $emit(event: string) {}

  // @link /src/core/instance/lifecycle.js

  _update(vnode: VNode, hydrating?: boolean) {}
  $forceUpdate() {}
  $destroy() {}

  // @link /src/core/instance/render-helpers/index.js

  _o() {}
  _n() {}
  _s() {}
  _l() {}
  _t() {}
  _q() {}
  _i() {}
  _m() {}
  _f() {}
  _k() {}
  _b() {}
  _v() {}
  _e() {}
  _u() {}
  _g() {}
  _d() {}
  _p() {}

  // @link /src/core/instance/render.js

  $nextTick(fn: Function) {}
  _render(): VNode {}

  // @link /src/core/global-api/index.js

  static get config() { return config }
  static util = {
    warn() {},
    extend() {},
    mergeOptions() {},
    defineReactive() {},
  };
  static set() {}
  static delete() {}
  static nextTick() {}
  static observable() {}
  static options = {
    _base: Vue,
  };
  static components() {}
  static directives() {}
  static filters() {}

  /**
   * @link /src/core/global-api/use.js
   */
  static use() {}

  /**
   * @link /src/core/global-api/mixin.js
   */
  static mixin() {}

  /**
   * @link /src/core/global-api/extend.js
   */
  static cid: number;
  static extend: () => {};

  /**
   * @link /src/core/global-api/assets.js
   */
  component: () => {};
  directive: () => {};
  filter: () => {};

  /**
   * @link /vue/src/core/index.js
   */
  $isServer: boolean;
  $ssrContext: boolean;
  static FunctionalRenderContext: () => {};
  static version: string;
}

```
