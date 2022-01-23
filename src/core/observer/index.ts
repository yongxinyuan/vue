import Dep from "./dep";
import VNode from "../vdom/vnode";
import { arrayMethods } from "./array";

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

export let shouldObserve: boolean = true;

export function toggleObserving(value: boolean) {
  shouldObserve = value;
}
