格式化子组件的 props 属性

```
child.props = {
    a: {
        type: Number
    },
    b: {
        type: String
    }
}
```

格式化子组件的 inject 属性

```
child.inject = {
    a: {
        from: xxx
    },
    b: {
        from: xxx,
        ...extra
    }
}
```

格式化子组件的 directives 属性

```
child.directives = {
    a: {
        bind: function() {},
        update: function() {}
    }
}
```

递归将子组件的 extends、mixins 属性与父组件合并，这时候收集到父组件全部的属性和方法。

使用合并策略函数依次将父组件和子组件的属性合并到一个新的对象。

### 默认策略

el、propsData

默认合并策略，覆盖 undefined。

data、provide

延迟合并，如果是扩展构造函数合并，将两个函数组合成一个函数。

hooks

周期函数合并成数组，去重。

components、directives、filters

分别覆盖 undefined。

watch

合并成数组

props、methods、inject、computed

依次将 parent 和 child 属性合并到新对象，

其他没有定义的直接使用默认方式，覆盖 undefined。
