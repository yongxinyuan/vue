/* @flow */

import { toArray } from '../util/index'

export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 构造函数上缓存的已经安装的插件的数组
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))

    // 插件已经安装，返回构造函数
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 额外的参数，(Vue, ...args) => void;
    // additional parameters
    const args = toArray(arguments, 1);

    // 构造函数插入数组开头
    args.unshift(this);

    // plugin 有 install 函数
    // 执行 install 函数
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    }
    // plugin 本身就是函数
    // 执行 plugin 函数
    else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 添加到构造函数缓存
    installedPlugins.push(plugin)
    return this
  }
}
