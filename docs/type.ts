interface VNodeData {
  hook?: {
    destroy?: any;
  };
}

interface VNode {
  data?: VNodeData;
  children?: any[];
  nodeType?: any;
  elm?: Element;
  componentInstance?: {
    _vnode?: VNode;
  };
}
