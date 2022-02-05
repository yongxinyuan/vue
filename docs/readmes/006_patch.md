1、没有新的 vnode

1.1、有老的 vnode

销毁老的 vnode

2、没有老的 vnode，表示是初始化，创建新元素。

3、新的 vnode 和老的 vnode 都存在

3.1、老的 vnode 不是真实 DOM，且两个 vnode 相同

diff vnode

3.2、老的 vnode 是真实 DOM 或者两个 vnode 不同

3.2.1、如果老的 vnode 是真实 DOM，替换老的 vnode

3.2.2、如果新的 vnode 有 parent，更新 parent 的占位符

3.3.3、销毁老的 vnode

### diff vnode

1、如果两个 vnode 是相同的引用，不需要处理。

2、如果新的 vnode.elm，且在数组中，复制 vnode，复用。

3、如果老的 vnode 是异步组件占位符

3.1、如果加载完成，混合渲染？

3.2、为加载完成，标记是异步占位符。

4、如果是静态树，复用元素。

5、对比 children
