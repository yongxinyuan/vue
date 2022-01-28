export function initExtend(Vue) {
  Vue.cid = 0;
  let cid = 1;

  Vue.extend = function (extendOptions) {
    // 默认是一个空对象
    extendOptions = extendOptions || {};

    const Super = this;
    const SuperId = Super.cid;

    // 缓存构造函数，挂载到 extendOptions._Ctor
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }
  };
}
