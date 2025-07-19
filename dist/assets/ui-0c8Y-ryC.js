import{r as x,g as O,a as g}from"./vendor-DavUf6mE.js";function j(n,a){for(var u=0;u<a.length;u++){const t=a[u];if(typeof t!="string"&&!Array.isArray(t)){for(const o in t)if(o!=="default"&&!(o in n)){const s=Object.getOwnPropertyDescriptor(t,o);s&&Object.defineProperty(n,o,s.get?s:{enumerable:!0,get:()=>t[o]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}var _={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d;function b(){if(d)return i;d=1;var n=x(),a=Symbol.for("react.element"),u=Symbol.for("react.fragment"),t=Object.prototype.hasOwnProperty,o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function l(f,e,m){var r,c={},p=null,R=null;m!==void 0&&(p=""+m),e.key!==void 0&&(p=""+e.key),e.ref!==void 0&&(R=e.ref);for(r in e)t.call(e,r)&&!s.hasOwnProperty(r)&&(c[r]=e[r]);if(f&&f.defaultProps)for(r in e=f.defaultProps,e)c[r]===void 0&&(c[r]=e[r]);return{$$typeof:a,type:f,key:p,ref:R,props:c,_owner:o.current}}return i.Fragment=u,i.jsx=l,i.jsxs=l,i}var y;function E(){return y||(y=1,_.exports=b()),_.exports}var S=E(),v=x();const q=O(v),h=j({__proto__:null,default:q},[v]);g();export{h as R,q as a,S as j,v as r};
//# sourceMappingURL=ui-0c8Y-ryC.js.map
