(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Dashboard"],{2436:function(t,e,n){"use strict";n("6887")},6887:function(t,e,n){},7277:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.dynamicLoad,{tag:"component"})},c=[],r=n("5530"),o=n("2f62"),s=n("6b7b"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-xl-6 pr-xl-2"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12 pr-sm-2 statistics-grid"},[n("div",{staticClass:"card card_border border-primary-top p-4"},[n("font-awesome-icon",{attrs:{icon:"user"}}),n("h3",{staticClass:"text-primary number"},[t._v(t._s(t.studentCount))]),n("p",{staticClass:"stat-text"},[t._v("Total User")])],1)])])]),n("div",{staticClass:"col-xl-6 pl-xl-2"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12 pr-sm-2 statistics-grid"},[n("div",{staticClass:"card card_border border-primary-top p-4"},[n("font-awesome-icon",{attrs:{icon:"book-open"}}),n("h3",{staticClass:"text-success number"},[t._v(t._s(t.courseCount))]),n("p",{staticClass:"stat-text"},[t._v("Total Activity")])],1)])])])])},i=[],l=(n("820e"),n("d3b7"),n("3ca3"),n("ddb0"),n("159b"),n("b0c0"),n("3292")),d=n("e592"),f={name:"Dashboard",data:function(){return{StudentService:new d["a"],CourseService:new l["a"],studentCount:0,courseCount:0}},mounted:function(){var t=this;Promise.allSettled([new Promise((function(e,n){t.StudentService.getTotalCount().then((function(t){var n;return e({count:null!==(n=null===t||void 0===t?void 0:t.count)&&void 0!==n?n:0,name:"studentCount"})})).catch((function(t){return n(t)}))})),new Promise((function(e,n){t.CourseService.getTotalCount().then((function(t){var n;return e({count:null!==(n=null===t||void 0===t?void 0:t.count)&&void 0!==n?n:0,name:"courseCount"})})).catch((function(t){return n(t)}))}))]).then((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.forEach((function(e){"fulfilled"===e.status&&(t[e.value.name]=e.value.count)}))}))}},v=f,b=(n("2436"),n("2877")),h=Object(b["a"])(v,u,i,!1,null,"914ed132",null),m=h.exports,p={name:"Dashboard",computed:Object(r["a"])({dynamicLoad:function(){return"admin"===this.getUserRole?m:s["default"]}},Object(o["b"])("user",["getUserRole"]))},C=p,w=Object(b["a"])(C,a,c,!1,null,null,null);e["default"]=w.exports},"820e":function(t,e,n){"use strict";var a=n("23e7"),c=n("1c0b"),r=n("f069"),o=n("e667"),s=n("2266");a({target:"Promise",stat:!0},{allSettled:function(t){var e=this,n=r.f(e),a=n.resolve,u=n.reject,i=o((function(){var n=c(e.resolve),r=[],o=0,u=1;s(t,(function(t){var c=o++,s=!1;r.push(void 0),u++,n.call(e,t).then((function(t){s||(s=!0,r[c]={status:"fulfilled",value:t},--u||a(r))}),(function(t){s||(s=!0,r[c]={status:"rejected",reason:t},--u||a(r))}))})),--u||a(r)}));return i.error&&u(i.value),n.promise}})},b0c0:function(t,e,n){var a=n("83ab"),c=n("9bf2").f,r=Function.prototype,o=r.toString,s=/^\s*function ([^ (]*)/,u="name";a&&!(u in r)&&c(r,u,{configurable:!0,get:function(){try{return o.call(this).match(s)[1]}catch(t){return""}}})},e592:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var a=n("d4ec"),c=n("bee2"),r=n("262e"),o=n("2caf"),s=(n("99af"),n("b775")),u=n("3a78"),i="student",l=function(t){Object(r["a"])(n,t);var e=Object(o["a"])(n);function n(){return Object(a["a"])(this,n),e.call(this,i)}return Object(c["a"])(n,[{key:"changeStatus",value:function(t){return Object(s["a"])({url:"".concat(this.apiURL,"/status/").concat(t),method:"patch"}).then((function(t){return t}))}},{key:"getStudentAndCourseDataById",value:function(t){return Object(s["a"])({url:"".concat(this.apiURL,"/course/").concat(t),method:"get"}).then((function(t){return t}))}},{key:"resetPassword",value:function(t){return Object(s["a"])({url:"".concat(this.apiURL,"/reset/").concat(t),method:"post"}).then((function(t){return t}))}}]),n}(u["a"])}}]);
//# sourceMappingURL=Dashboard.0d2cbe5d.js.map