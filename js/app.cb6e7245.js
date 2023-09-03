(function(){"use strict";var n={2341:function(n,e,t){var r=t(9242),o=t(3396);function i(n,e,t,r,i,a){const c=(0,o.up)("HomeComponent");return(0,o.wg)(),(0,o.j4)(c)}var a=t(7139),c=t.p+"img/logo.4d296a4f.png";const s=n=>((0,o.dD)("data-v-279b8761"),n=n(),(0,o.Cn)(),n),l=s((()=>(0,o._)("div",{class:"imageSection"},[(0,o._)("img",{class:"image",alt:"Vue logo",src:c})],-1))),u={class:"inputBoxSection"},d=s((()=>(0,o._)("label",{for:"robotId"},null,-1))),v={key:0,class:"connectMsg"},p={key:0,class:"connectionError"},f=s((()=>(0,o._)("div",{class:"errorTitleItem"}," Oops! It seems you're currently offline. ",-1))),b=s((()=>(0,o._)("div",{class:"errorSecondaryItem center"}," Please check your internet connection and try again. ",-1))),m=[f,b],y={key:1,class:"connectionError"},h=(0,o.uE)('<div class="errorTitleItem" data-v-279b8761> Cannot establish a connection to RasBot. </div><div class="errorSecondaryItem" data-v-279b8761> Possible reasons for the connection issue: </div><div class="errorSecondaryItem" data-v-279b8761> 1. Please check if the RobotId is correct. </div><div class="errorSecondaryItem" data-v-279b8761> 2. Ensure that RasBot is turned on. </div><div class="errorSecondaryItem" data-v-279b8761> 3. Make sure RasBot is connected to the internet. </div><div class="errorSecondaryItem" data-v-279b8761> Please verify these steps to resolve the connection problem. </div>',6),g=[h];function w(n,e,t,i,c,s){const f=(0,o.up)("SpinnerComponent");return(0,o.wg)(),(0,o.iD)("div",{class:"homeComponent",onClick:e[2]||(e[2]=n=>i.onClickHome())},[l,(0,o._)("div",u,[d,(0,o.wy)((0,o._)("input",{class:"inputBox inputSection",type:"text",id:"robotId","onUpdate:modelValue":e[0]||(e[0]=n=>i.textInput=n),placeholder:"Robot ID"},null,512),[[r.nr,i.textInput]]),(0,o._)("div",{class:(0,a.C_)(["submitButton inputSection",{canConnect:i.canConnect}]),onClick:e[1]||(e[1]=n=>i.onClickConnect())},[i.isValidating?((0,o.wg)(),(0,o.j4)(f,{key:1,class:"spinner","is-loading":i.isValidating,"spinner-size":"20px"},null,8,["is-loading"])):((0,o.wg)(),(0,o.iD)("div",v,"Connect"))],2)]),i.hasError?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)(["errorSection",{largeError:!i.hasInternetConnectionError}])},[(0,o._)("div",{class:(0,a.C_)(["errorWrapper",{isErrorReady:i.canRemoveError}])},[i.hasInternetConnectionError?((0,o.wg)(),(0,o.iD)("div",p,m)):((0,o.wg)(),(0,o.iD)("div",y,g))],2)],2)):(0,o.kq)("",!0)])}var C=t(4870);const k={key:0,class:"spinner"};function I(n,e,t,r,i,c){return t.isLoading?((0,o.wg)(),(0,o.iD)("div",k,[(0,o._)("div",{class:"spinner-inner",style:(0,a.j5)({"--spinnerSize":t.spinnerSize})},null,4)])):(0,o.kq)("",!0)}var _={props:{isLoading:{type:Boolean,required:!0},spinnerSize:{type:String,default:"30px"}}},S=t(89);const E=(0,S.Z)(_,[["render",I],["__scopeId","data-v-5d011efd"]]);var x=E,O={components:{SpinnerComponent:x},setup(){const n=(0,C.iH)(!1),e=(0,C.iH)(!1),t=(0,C.iH)(!1),r=(0,C.iH)(""),i=(0,C.iH)(!1),a=(0,o.f3)("clientService"),c=(0,o.Fl)((()=>r.value.length>3));async function s(){if(!c.value)return;const n=await l();n||u()}async function l(){i.value=!0,e.value=!1;let n=!1;try{n=await(a?.isRobotIdValidAsync(r.value))}catch(t){e.value=!0}return i.value=!1,n}function u(){n.value=!0,setTimeout((()=>t.value=!0),200)}function d(){n.value&&t.value&&(n.value=!1,t.value=!1)}return(0,o.bv)((()=>{n.value=!1,t.value=!1,r.value="",i.value=!1})),{hasError:n,hasInternetConnectionError:e,canRemoveError:t,textInput:r,canConnect:c,isValidating:i,onClickConnect:s,onClickHome:d}}};const R=(0,S.Z)(O,[["render",w],["__scopeId","data-v-279b8761"]]);var j=R,B=(0,o.aZ)({name:"App",components:{HomeComponent:j},beforeCreate(){document.title="RasBot"}});const H=(0,S.Z)(B,[["render",i]]);var D=H;class P{async isRobotIdValidAsync(n){if(n.startsWith("a"))throw new Error("Network error occurred");return await new Promise((n=>{setTimeout((()=>{n(!0)}),2e3)})),n.startsWith("b")}}const V=(0,r.ri)(D),T=new P;V.provide("clientService",T),V.mount("#app")}},e={};function t(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return n[r].call(i.exports,i,i.exports,t),i.exports}t.m=n,function(){var n=[];t.O=function(e,r,o,i){if(!r){var a=1/0;for(u=0;u<n.length;u++){r=n[u][0],o=n[u][1],i=n[u][2];for(var c=!0,s=0;s<r.length;s++)(!1&i||a>=i)&&Object.keys(t.O).every((function(n){return t.O[n](r[s])}))?r.splice(s--,1):(c=!1,i<a&&(a=i));if(c){n.splice(u--,1);var l=o();void 0!==l&&(e=l)}}return e}i=i||0;for(var u=n.length;u>0&&n[u-1][2]>i;u--)n[u]=n[u-1];n[u]=[r,o,i]}}(),function(){t.n=function(n){var e=n&&n.__esModule?function(){return n["default"]}:function(){return n};return t.d(e,{a:e}),e}}(),function(){t.d=function(n,e){for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"===typeof window)return window}}()}(),function(){t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)}}(),function(){t.p="/rasBot-webApp/"}(),function(){var n={143:0};t.O.j=function(e){return 0===n[e]};var e=function(e,r){var o,i,a=r[0],c=r[1],s=r[2],l=0;if(a.some((function(e){return 0!==n[e]}))){for(o in c)t.o(c,o)&&(t.m[o]=c[o]);if(s)var u=s(t)}for(e&&e(r);l<a.length;l++)i=a[l],t.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return t.O(u)},r=self["webpackChunkrasbot_webapp"]=self["webpackChunkrasbot_webapp"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(2341)}));r=t.O(r)})();
//# sourceMappingURL=app.cb6e7245.js.map