### Vue 构造函数

这里主要记录我们使用时 Vue 构造函数包含的属性、方法和声明他们的位置。

```
class Vue {
  // @link src/core/instance/index.js
  constructor(options: object) {}

  // @link src/core/instance/init.js
  _init(options: object): void {}

  // @link src/core/instance/state.js
  get $data(): object {
    return {};
  }
  get $props(): object {
    return {};
  }
  $set() {}
  $delete() {}
  $watch() {}

  // @link src/core/instance/events.js
  $on() {}
  $once() {}
  $off() {}
  $emit() {}

  // @link src/core/instance/lifecycle.js
  _update() {}
  $forceUpdate() {}
  $destroy() {}

  // @link src/core/instance/render-helpers/index.js
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
  $nextTick() {}
  _render() {}

  // @link src/core/global-api/index.js
  static get config() {
    return {
      // @link src/platforms/web/runtime/index.js
      mustUseProp() {},
      isReservedTag() {},
      isReservedAttr() {},
      getTagNamespace() {},
      isUnknownElement() {},
    };
  }
  static util = {
    warn: function () {},
    extend: function () {},
    mergeOptions: function () {},
    defineReactive: function () {},
  };
  static set() {}
  static delete() {}
  static nextTick() {}
  static observable() {}
  static options = {
    _base: Vue,
    components: {
      KeepAlive: {},
      // @link src/platforms/web/runtime/index.js
      Transition: {},
      TransitionGroup: {},
    },
    // @link src/platforms/web/runtime/index.js
    directives: {
      model: {},
      show: {},
    },
  };
  static components = {};
  static directives = {};
  static filters = {};
  static use() {}
  static mixin() {}
  static cid = 0;
  static extend() {}
  static component() {}
  static directive() {}
  static filter() {}

  // @link src/core/index.js
  get $isServer() {
    return false;
  }
  get $ssrContext() {
    return;
  }
  static FunctionalRenderContext() {}
  static version = "";

  // @link src/platforms/web/runtime/index.js
  __patch__() {}
  $mount() {}
}
```
