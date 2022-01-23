import config from "../config";
import { noop } from "../../shared/util";

export let warn = noop;
export let tip = noop;
export let generateComponentTrace = noop;
export let formatComponentName = noop;
