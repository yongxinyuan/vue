import Watcher from "../observer/watcher";
import { callHook } from "./lifecycle";

export function mountComponent(vm: any, el?: Element, hydrating?: boolean) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }

  callHook(vm, "beforeMount");

  let updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };

  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, "beforeUpdate");
        }
      },
    },
    true
  );

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, "mounted");
  }

  return vm;
}
