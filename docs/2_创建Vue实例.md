### /src/core/instance/index.js

```
function Vue(options) {
  // @link /src/core/instance/init.js
  this._init(options);
}
```

### /src/core/instance/init.js

```
Vue.prototype._init = function(options) {
  const vm = this;

  // 每个Vue实例有一个递增的uid
  vm._uid = uid++;

  // 标记这是一个Vue实例
  vm._isVue = true;

  // 合并参数
  if (options && options._isComponent) {
    initInternalComponent(vm, options);
  }
  else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    );
  }

  vm._renderProxy = vm;

  vm._self = vm;

  initLifecycle(vm);
  initEvents(vm);
  initRender(vm);
  callHook(vm, "beforeCreate");
  initInjections(vm);
  initState(vm);
  initProvide(vm);
  callHook(vm, "created");

  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
}
```

```
function initLifecycle(vm) {
  const options = vm.$options;

  // 向上查找第一个不是抽象组件的父元素
  // 将实例插入父元素中
  let parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
```

```
function initEvents(vm) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false;

  const listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}
```
