/* @flow */

import config from "../config";
import { initProxy } from "./proxy";
import { initState } from "./state";
import { initRender } from "./render";
import { initEvents } from "./events";
import { mark, measure } from "../util/perf";
import { initLifecycle, callHook } from "./lifecycle";
import { initProvide, initInjections } from "./inject";
import { extend, mergeOptions, formatComponentName } from "../util/index";

let uid = 0;

/**
 * @param { Class<Component> } Vue
 */
export function initMixin(Vue) {
  /**
   * @param { ?Object } options
   */
  Vue.prototype._init = function (options) {
    const vm = this;

    // 组件实例唯一id
    vm._uid = uid++;

    let startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== "production" && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`;
      endTag = `vue-perf-end:${vm._uid}`;
      mark(startTag);
    }

    // 标记这是一个Vue组件实例，常用于避免创建可观察对象
    vm._isVue = true;

    // 我们可以查看什么时候会带有 _isComponent 这个属性
    // 为 vnode 实例化组件的时候附带这个标识，来告诉 _init 函数，我们是内置组件
    // 不需要消耗大量时间动态合并。
    if (options && options._isComponent) {
      // 优化内部组件实例化，因为动态选项合并非常慢，而且内部组件选项都不需要特殊处理。
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }

    // expose real self
    vm._self = vm;

    // 初始化生命周期
    initLifecycle(vm);

    // 初始化事件，继承事件
    initEvents(vm);

    // 初始化渲染器
    initRender(vm);
    callHook(vm, "beforeCreate");

    // 注入所有 inject
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, "created");

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== "production" && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(`vue ${vm._name} init`, startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

/**
 * @description 初始化内部组件
 * @param { Component } vm
 * @param { InternalComponentOptions } options
 */
export function initInternalComponent(vm, options) {
  // 以组件工厂 options 为原型创建一个 options 对象，挂载到组件实例 $options 上
  const opts = (vm.$options = Object.create(vm.constructor.options));

  // 这样做是因为比动态枚举属性更快
  const parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  const vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

/**
 * @description
 * 解析构造函数参数，递归向上查找，向下合并，super 属性在 Vue.extend() 函数中添加
 *
 * @param { Class<Component> } Ctor
 * @returns { ?Object }
 * @link src/core/global-api
 */
export function resolveConstructorOptions(Ctor) {
  let options = Ctor.options;

  if (Ctor.super) {
    // 获取父类上挂载的options属性
    const superOptions = resolveConstructorOptions(Ctor.super);
    // 构造函数上缓存的父类options
    const cachedSuperOptions = Ctor.superOptions;
    // 如果发生变化
    if (superOptions !== cachedSuperOptions) {
      // 将构造函数上缓存的父类options替换成最新的
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;

      // 检查是否有任何后期修改/附加的选项
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor);

      // 发生变化的配置扩展到基础扩展配置中
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      // 基础扩展配置合并到父类中，生成新的options，
      // 1、更新到构造函数 options 属性
      // 2、替换成最新的 options
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      // 注册到当前组件
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

/**
 * @param { Class<Component> } Ctor
 * @returns { ?Object }
 */
function resolveModifiedOptions(Ctor) {
  let modified;
  const latest = Ctor.options;
  const sealed = Ctor.sealedOptions;
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {};
      modified[key] = latest[key];
    }
  }
  return modified;
}
