/* @flow */

import { ASSET_TYPES } from "shared/constants";
import { isPlainObject, validateComponentName } from "../util/index";

// component(), directive(), filter()
export function initAssetRegisters(Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach((type) => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      // 获取组件、指令、过滤
      if (!definition) {
        return this.options[type + "s"][id];
      }
      // 设置组件、指令、过滤
      else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== "production" && type === "component") {
          validateComponentName(id);
        }
        // 组件，普通对象
        // 使用当前的父类扩展
        if (type === "component" && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        // 指令、转换标准格式
        // { bind: Function, update: Function }
        if (type === "directive" && typeof definition === "function") {
          definition = { bind: definition, update: definition };
        }
        // 设置到构造函数的 options 属性上
        this.options[type + "s"][id] = definition;
        return definition;
      }
    };
  });
}
