(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Dashboard"],{7277:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.dynamicLoad,{tag:"component"})},r=[],c=n("5530"),s=n("2f62"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"outer-w3-agile col-xl mt-3"},[n("h4",{staticClass:"tittle-w3-agileits mb-4"},[t._v("Course Schedule")]),n("FullCalendar",{attrs:{options:t.calendarOptions}})],1)])},u=[],i=n("f5ff"),l=n("a20c"),d=n("3e32"),f=n("f040"),v=(n("6dfc"),{name:"Schedule",mixins:[f["a"]],components:{FullCalendar:i["a"]},data:function(){return{calendarOptions:{plugins:[d["a"],l["a"]],handleWindowResize:!0,headerToolbar:{left:"",center:"",right:""},defaultView:"agendaWeek",dayHeaderFormat:{weekday:"short"},editable:!0,events:[]}}}}),h=v,b=n("2877"),m=Object(b["a"])(h,o,u,!1,null,null,null),p=m.exports,C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-xl-6 pr-xl-2"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12 pr-sm-2 statistics-grid"},[n("div",{staticClass:"card card_border border-primary-top p-4"},[n("font-awesome-icon",{attrs:{icon:"user"}}),n("h3",{staticClass:"text-primary number"},[t._v(t._s(t.studentCount))]),n("p",{staticClass:"stat-text"},[t._v("Total Student")])],1)])])]),n("div",{staticClass:"col-xl-6 pl-xl-2"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12 pr-sm-2 statistics-grid"},[n("div",{staticClass:"card card_border border-primary-top p-4"},[n("font-awesome-icon",{attrs:{icon:"book-open"}}),n("h3",{staticClass:"text-success number"},[t._v(t._s(t.courseCount))]),n("p",{staticClass:"stat-text"},[t._v("Total Course")])],1)])])])])},w=[],g=(n("820e"),n("d3b7"),n("3ca3"),n("ddb0"),n("159b"),n("b0c0"),n("3292")),_=n("e592"),j={name:"Dashboard",data:function(){return{StudentService:new _["a"],CourseService:new g["a"],studentCount:0,courseCount:0}},mounted:function(){var t=this;Promise.allSettled([new Promise((function(e,n){t.StudentService.getTotalCount().then((function(t){var n;return e({count:null!==(n=null===t||void 0===t?void 0:t.count)&&void 0!==n?n:0,name:"studentCount"})})).catch((function(t){return n(t)}))})),new Promise((function(e,n){t.CourseService.getTotalCount().then((function(t){var n;return e({count:null!==(n=null===t||void 0===t?void 0:t.count)&&void 0!==n?n:0,name:"courseCount"})})).catch((function(t){return n(t)}))}))]).then((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.forEach((function(e){"fulfilled"===e.status&&(t[e.value.name]=e.value.count)}))}))}},O=j,S=(n("7db1"),Object(b["a"])(O,C,w,!1,null,"e656d796",null)),x=S.exports,y={name:"Dashboard",computed:Object(c["a"])({dynamicLoad:function(){return"admin"===this.getUserRole?x:p}},Object(s["b"])("user",["getUserRole"]))},k=y,R=Object(b["a"])(k,a,r,!1,null,null,null);e["default"]=R.exports},"7db1":function(t,e,n){"use strict";n("7ead")},"7ead":function(t,e,n){},"820e":function(t,e,n){"use strict";var a=n("23e7"),r=n("1c0b"),c=n("f069"),s=n("e667"),o=n("2266");a({target:"Promise",stat:!0},{allSettled:function(t){var e=this,n=c.f(e),a=n.resolve,u=n.reject,i=s((function(){var n=r(e.resolve),c=[],s=0,u=1;o(t,(function(t){var r=s++,o=!1;c.push(void 0),u++,n.call(e,t).then((function(t){o||(o=!0,c[r]={status:"fulfilled",value:t},--u||a(c))}),(function(t){o||(o=!0,c[r]={status:"rejected",reason:t},--u||a(c))}))})),--u||a(c)}));return i.error&&u(i.value),n.promise}})},b0c0:function(t,e,n){var a=n("83ab"),r=n("9bf2").f,c=Function.prototype,s=c.toString,o=/^\s*function ([^ (]*)/,u="name";a&&!(u in c)&&r(c,u,{configurable:!0,get:function(){try{return s.call(this).match(o)[1]}catch(t){return""}}})},e592:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var a=n("d4ec"),r=n("bee2"),c=n("262e"),s=n("2caf"),o=(n("99af"),n("b775")),u=n("3a78"),i="student",l=function(t){Object(c["a"])(n,t);var e=Object(s["a"])(n);function n(){return Object(a["a"])(this,n),e.call(this,i)}return Object(r["a"])(n,[{key:"changeStatus",value:function(t){return Object(o["a"])({url:"".concat(this.apiURL,"/status/").concat(t),method:"patch"}).then((function(t){return t}))}},{key:"getStudentAndCourseDataById",value:function(t){return Object(o["a"])({url:"".concat(this.apiURL,"/course/").concat(t),method:"get"}).then((function(t){return t}))}},{key:"resetPassword",value:function(t){return Object(o["a"])({url:"".concat(this.apiURL,"/reset/").concat(t),method:"post"}).then((function(t){return t}))}}]),n}(u["a"])}}]);
//# sourceMappingURL=Dashboard.61ff8f27.js.map