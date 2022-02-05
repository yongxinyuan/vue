### vm.$mount()

挂载的时候创建渲染的 Watcher，Watcher 初始化结尾处执行 get 操作，触发对应的 updateComponent 方法，
执行 vm.\_render() 方法，构建 vnode，
执行 vm.\_update() 方法，触发 diff 算法，进行渲染.

### vm.\_render()

/src/core/instance/render.js



### vm.\_update()
