> - Dep - 依赖项
> - Observer 可观察对象
> - Watcher 观察者

Dep, Observer, Watcher

### 谁持有 Dep？

1、Observer 可观察对象
2、defineProperty getter

### 谁持有 Observer？

observe() 函数创建 Observer 实例。

### observe() 函数是干什么的？

尝试将 value 转换成可观察对象，如果已经是可观察对象，直接返回 value.\_\_ob\_\_ 属性。

<!-- 转换成可观察对象后，每个属性持有一个 -->

### Dep.target 是怎么设置的？

Dep.target 是通过 `pushTarget` 和 `popTarget` 两个函数设置的

### pushTarget、popTarget 在哪里使用？

这两个函数通常组合使用

getter 收集依赖

setter 触发通知

每个 Component 在 mountComponent 的时候都创建一个渲染 Watcher

首先通过 $mount() 方法处理渲染时，才会将用到的依赖收集，
后面修改时才会通过 Dep.notify() 获取通知，
获取一次就要清理掉，再次获取再收集，循环处理.

### 如何控制 Dep 和 Watcher 的？

Dep.addSub() => Watcher.addDep() => Dep.depend()

createComputedGetter()

( Object / Array ).getter

Watcher.depend();
