function t(){}function n(t,n){for(const e in n)t[e]=n[e];return t}function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function s(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n){const e=t.subscribe(n);return e.unsubscribe?()=>e.unsubscribe():e}function i(t){let n;return u(t,t=>n=t)(),n}function a(t,n,e){t.$$.on_destroy.push(u(n,e))}function f(t,n,e){if(t){const o=l(t,n,e);return t[0](o)}}function l(t,e,o){return t[1]?n({},n(e.$$scope.ctx,t[1](o?o(e):{}))):e.$$scope.ctx}function d(t,e,o,r){return t[1]?n({},n(e.$$scope.changed||{},t[1](r?r(o):{}))):e.$$scope.changed||{}}function p(t){return null==t?"":t}function h(t,n){t.appendChild(n)}function $(t,n,e){t.insertBefore(n,e||null)}function m(t){t.parentNode.removeChild(t)}function g(t){return document.createElement(t)}function b(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function y(t){return document.createTextNode(t)}function x(){return y(" ")}function v(){return y("")}function _(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function w(t,n,e){null==e?t.removeAttribute(n):t.setAttribute(n,e)}function E(t){return Array.from(t.childNodes)}function k(t,n,e,o){for(let o=0;o<t.length;o+=1){const r=t[o];if(r.nodeName===n){for(let t=0;t<r.attributes.length;t+=1){const n=r.attributes[t];e[n.name]||r.removeAttribute(n.name)}return t.splice(o,1)[0]}}return o?b(n):g(n)}function A(t,n){for(let e=0;e<t.length;e+=1){const o=t[e];if(3===o.nodeType)return o.data=""+n,t.splice(e,1)[0]}return y(n)}function C(t){return A(t," ")}function L(t,n){n=""+n,t.data!==n&&(t.data=n)}function N(t,n){"static"===getComputedStyle(t).position&&(t.style.position="relative");const e=document.createElement("object");let o;return e.setAttribute("style","display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;"),e.type="text/html",e.tabIndex=-1,e.onload=(()=>{(o=e.contentDocument.defaultView).addEventListener("resize",n)}),/Trident/.test(navigator.userAgent)?(t.appendChild(e),e.data="about:blank"):(e.data="about:blank",t.appendChild(e)),{cancel:()=>{o&&o.removeEventListener&&o.removeEventListener("resize",n),t.removeChild(e)}}}let j;function z(t){j=t}function S(){if(!j)throw new Error("Function called outside component initialization");return j}function O(t){S().$$.on_mount.push(t)}function T(t,n){S().$$.context.set(t,n)}const q=[],B=[],D=[],F=[],I=Promise.resolve();let M=!1;function G(t){D.push(t)}function H(){const t=new Set;do{for(;q.length;){const t=q.shift();z(t),J(t.$$)}for(;B.length;)B.pop()();for(let n=0;n<D.length;n+=1){const e=D[n];t.has(e)||(e(),t.add(e))}D.length=0}while(q.length);for(;F.length;)F.pop()();M=!1}function J(t){t.fragment&&(t.update(t.dirty),r(t.before_update),t.fragment.p(t.dirty,t.ctx),t.dirty=null,t.after_update.forEach(G))}const K=new Set;let P;function V(){P={r:0,c:[],p:P}}function Q(){P.r||r(P.c),P=P.p}function R(t,n){t&&t.i&&(K.delete(t),t.i(n))}function U(t,n,e,o){if(t&&t.o){if(K.has(t))return;K.add(t),P.c.push(()=>{K.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}function W(t,n){const e={},o={},r={$$scope:1};let s=t.length;for(;s--;){const c=t[s],u=n[s];if(u){for(const t in c)t in u||(o[t]=1);for(const t in u)r[t]||(e[t]=u[t],r[t]=1);t[s]=u}else for(const t in c)r[t]=1}for(const t in o)t in e||(e[t]=void 0);return e}function X(t){return"object"==typeof t&&null!==t?t:{}}function Y(t,n,o){const{fragment:c,on_mount:u,on_destroy:i,after_update:a}=t.$$;c.m(n,o),G(()=>{const n=u.map(e).filter(s);i?i.push(...n):r(n),t.$$.on_mount=[]}),a.forEach(G)}function Z(t,n){t.$$.fragment&&(r(t.$$.on_destroy),t.$$.fragment.d(n),t.$$.on_destroy=t.$$.fragment=null,t.$$.ctx={})}function tt(t,n){t.$$.dirty||(q.push(t),M||(M=!0,I.then(H)),t.$$.dirty=o()),t.$$.dirty[n]=!0}function nt(n,e,s,c,u,i){const a=j;z(n);const f=e.props||{},l=n.$$={fragment:null,ctx:null,props:i,update:t,not_equal:u,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:o(),dirty:null};let d=!1;l.ctx=s?s(n,f,(t,e,o=e)=>(l.ctx&&u(l.ctx[t],l.ctx[t]=o)&&(l.bound[t]&&l.bound[t](o),d&&tt(n,t)),e)):f,l.update(),d=!0,r(l.before_update),l.fragment=c(l.ctx),e.target&&(e.hydrate?l.fragment.l(E(e.target)):l.fragment.c(),e.intro&&R(n.$$.fragment),Y(n,e.target,e.anchor),H()),z(a)}class et{$destroy(){Z(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}const ot=[];function rt(n,e=t){let o;const r=[];function s(t){if(c(n,t)&&(n=t,o)){const t=!ot.length;for(let t=0;t<r.length;t+=1){const e=r[t];e[1](),ot.push(e,n)}if(t){for(let t=0;t<ot.length;t+=2)ot[t][0](ot[t+1]);ot.length=0}}}return{set:s,update:function(t){s(t(n))},subscribe:function(c,u=t){const i=[c,u];return r.push(i),1===r.length&&(o=e(s)||t),c(n),()=>{const t=r.indexOf(i);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}const st=rt("light");export{l as A,v as B,n as C,W as D,X as E,T as F,V as G,Q as H,rt as I,O as J,B as K,b as L,G as M,N,et as S,x as a,E as b,k as c,m as d,g as e,C as f,A as g,w as h,nt as i,$ as j,h as k,_ as l,L as m,p as n,t as o,a as p,st as q,i as r,c as s,y as t,Y as u,R as v,U as w,Z as x,f as y,d as z};
