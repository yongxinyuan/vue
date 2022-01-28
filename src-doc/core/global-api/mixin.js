/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin(Vue: GlobalAPI) {
  // 将 mixin 与 构造函数的 options 合并，组成构造函数新的 options
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
