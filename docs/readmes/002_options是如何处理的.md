### Vue.options 初始是什么样子的？

```
Vue.options = {
    components: {
        KeepAlive: {},
        Transition: {},
        TransitionGroup: {}
    },
    directives: {
        model: {},
        show: {}
    },
    filters: {},
    _base: Vue
}
```

这是 Vue 上挂载的静态属性 options 包含的内容。

### 常说的组件到底是什么？

官方的说法是 `组件是可复用的 Vue 实例，且带有一个名字`，要怎么理解这句话？

平时通过 `Vue.extend()`、`Vue.component()`、`options.components` 是创建组件的工厂，这些工厂扩展自 Vue 的子类，运行的时候 Vue 根据需要找到对应的工厂，创建实例，这就是为什么说组件是可复用的 Vue 实例。

### Vue.extend() 是如何扩展 Vue 组件工厂的？

```

```
