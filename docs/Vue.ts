class Vue {
  /**
   * @link /src/core/instance/index.js
   */
  constructor() {}

  /**
   * @link /src/core/instance/init.js
   */
  _init() {}

  /**
   * @link /src/core/instance/state.js
   */
  $data() {}
  $props() {}
  $set() {}
  $delete() {}
  $watch() {}

  /**
   * @link /src/core/instance/events.js
   */
  $on() {}
  $once() {}
  $off() {}
  $emit() {}

  /**
   * @link /src/core/instance/lifecycle.js
   */
  _update() {}
  $forceUpdate() {}
  $destroy() {}

  /**
   * @link /src/core/instance/render-helpers/index.js
   */
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

  /**
   * @link /src/core/instance/render.js
   */
  $nextTick() {}
  _render() {}

  /**
   * @link /src/core/global-api/index.js
   */
  static config() {}
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
