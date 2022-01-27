### Vue 构造函数

这里主要记录我们使用时 Vue 构造函数包含的属性、方法和声明他们的位置。

```
class Vue {
  // @link src/core/instance/index.js
  constructor(options) {}

  // @link src/core/instance/init.js
  _init(): void;

  // @link src/core/instance/state.js
  get $data(): object;
  get $props(): object;
  $set(target: any[] | object, key: any, val: any): any;
  $delete(target: any[] | object, key: any): void;
  $watch(expOrFn: string | Function, cb: any, options?: object): () => void;

  // @link src/core/instance/events.js
  $on(event: string | string[], fn: Function): Component;
  $once(event: string, fn: Function): Component;
  $off(event?: string, fn?: Function): Component;
  $emit(event: string, ...args: any[]): Component;

  // @link src/core/instance/lifecycle.js
  _update(vnode: VNode, hydrating?: boolean): void;
  $forceUpdate(): void;
  $destroy(): void;

  // @link src/core/instance/render-helpers/index.js
  _o(tree: VNode | VNode[], index: number, key: string): VNode;
  _n(val: string): number | string;
  _s(val: any): string;
  _l(
    val: any,
    render: (val: any, keyOrIndex: string | number, index?: number) => VNode
  ): VNode[] | undefined;
  _t(
    name: string,
    fallbackRender?: (() => VNode[]) | VNode[],
    props?: object,
    bindObject?: object
  ): VNode[] | undefined;
  _q(a: any, b: any): boolean;
  _i(arr: any[], val: any): number;
  _m(index: number, isInFor: boolean): VNode[] | VNode;
  _f(id: string): Function;
  _k(
    eventKeyCode: number,
    key: string,
    buildInKeyCode?: number | number[],
    eventKeyName?: string,
    buildInKeyName?: string | string[]
  ): boolean | undefined;
  _b(
    data: any,
    tag: string,
    value: any,
    asProp: boolean,
    isSync?: boolean
  ): VNodeData;
  _v(val: string | number): VNode;
  _e(text: string): VNode;
  _u(
    fns: ScopedSlotsData,
    res?: object,
    hasDynamicKeys?: boolean,
    contentHashKey?: number
  ): {
    [key: string]: Function,
    $stable: boolean
  };
  _g(data: any, value: any): VNodeData;
  _d(baseObj: object, values: any[]): object;
  _p(value: any, symbol: string): any;

  // @link src/core/instance/render.js
  $nextTick(fn: Function): Promise;
  _render(): VNode;

  // @link src/core/global-api/index.js
  get config(): object;
  static util = {
    warn: () => void,
    extend: () => void,
    mergeOptions: () => void,
    defineReactive: () => void
  }
  static set(): void;
  static delete(): void;
  static nextTick(): void;
  static observable(): void;
  static options: {
    components: object,
    directives: object,
    filters: object,
    _base: Vue
  }
  static use(): void;
  static mixin(): void;
  static cid: number;
  static extend(): void;
  static component(): void;
  static directive(): void;
  static filter(): void;
  get $isServer(): void;
  get $ssrContext(): void;
  static FunctionalRenderContext(): void;
  static version: string;

  // @link src/platforms/web/runtime/index.js
  static config = {
    mustUseProp: (tag: string, type?: string, attr?: string) => boolean,
    isReservedTag: (tag: string) => boolean | undefined,
    isReservedAttr: { [key: string]: boolean },
    getTagNamespace: (tag: string) => string | undefined,
    isUnknownElement: (tag: string) => boolean
  }
  static options = {
    directives: {},
    components: {}
  }
  __patch__(): void;
  $mount(): void;
}
```
