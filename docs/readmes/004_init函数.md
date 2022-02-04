每个组件实例有一个唯一标识 uid

处理组件实例 options 配置，如果是处理 vnode 时创建实例化组件，使用消耗更小的 options 处理方式，
否则通过动态枚举属性的方式来处理组件实例的 options，处理结果挂在组件实例的 $options 属性。

处理 \_renderProxy。

### 初始化生命周期

向上查找第一个实体组件实例，挂载如下属性：

$parent、
$root、
$children、
$refs、
\_watcher、
\_inactive、
\_directInactive、
\_isMounted、
\_isDestroyed、
\_isBeingDestroyed

### 初始化事件

挂载 \_events、\_hasHookEvent 属性，

将父组件实例的监听函数附加到当前组件实例。

### 初始化渲染器

解析 $slots、$scopedSlots

绑定 createElement 函数

创建响应式 $attrs、$listeners

### 初始化 inject

向上查找所有 inject，响应式到组件实例上

### 初始化状态

挂载 _watchers
初始化 props、methods、data、computed、watch

### 初始化 provide

运行时挂载。

### 生命周期

这里执行了两个周期函数，beforeCreate 和 created
