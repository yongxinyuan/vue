import Vue from "../../../core/index";
import config from "../../../core/config";
import { extend, noop } from "../../../shared/util";
import { mountComponent } from "../../../core/instance/lifecycle";
import { devtools, inBrowser } from "../../../core/util/index";

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement,
} from "../../web/util/index";

import { patch } from "./patch";
import platformDirectives from "./directives/index";
import platformComponents from "./components/index";
