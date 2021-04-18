(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Dashboard"],{7277:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.dynamicLoad,{tag:"component"})},o=[],r=n("5530"),c=n("2f62"),s=n("6b7b"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-xl-6 pr-xl-2"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12 pr-sm-2 statistics-grid"},[n("div",{staticClass:"card card_border border-primary-top p-4"},[n("font-awesome-icon",{attrs:{icon:"user"}}),n("h3",{staticClass:"text-primary number"},[t._v(t._s(t.studentCount))]),n("p",{staticClass:"stat-text"},[t._v("Total User")])],1)])])]),n("div",{staticClass:"col-xl-6 pl-xl-2"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-sm-12 pr-sm-2 statistics-grid"},[n("div",{staticClass:"card card_border border-primary-top p-4"},[n("font-awesome-icon",{attrs:{icon:"book-open"}}),n("h3",{staticClass:"text-success number"},[t._v(t._s(t.courseCount))]),n("p",{staticClass:"stat-text"},[t._v("Total Activity")])],1)])])])]),n("div",{staticClass:"outer-w3-agile col-xl mt-3 clearfix"},[n("vue-table",{ref:"vuetable",attrs:{fields:t.tableFields,"table-data":t.tabeleData,"total-row":t.totalRow,"action-button-show":!1,"search-box-show":!1}})],1)])},u=[],l=(n("820e"),n("d3b7"),n("3ca3"),n("ddb0"),n("159b"),n("b0c0"),n("3292")),d=n("e592"),v=n("9fa3"),f=n("0748"),b={name:"Dashboard",data:function(){return{tableFields:[{name:v["a"],title:"No."},{name:"courseName",title:"Activity Name"},{name:"courseCode",title:"Activity Code"},{name:"student",title:"Assigned Activity"}],tabeleData:[],totalRow:0,StudentService:new d["a"],CourseService:new l["a"],studentCount:0,courseCount:0}},components:{VueTable:f["a"]},mounted:function(){var t=this;Promise.allSettled([new Promise((function(e,n){t.StudentService.getTotalCount().then((function(t){var n;return e({result:null!==(n=null===t||void 0===t?void 0:t.count)&&void 0!==n?n:0,name:"studentCount"})})).catch((function(t){return n(t)}))})),new Promise((function(e,n){t.CourseService.getTotalCount().then((function(t){var n;return e({result:null!==(n=null===t||void 0===t?void 0:t.count)&&void 0!==n?n:0,name:"courseCount"})})).catch((function(t){return n(t)}))})),new Promise((function(e,n){t.CourseService.get().then((function(t){var n,a;return e({result:null!==(n=null===t||void 0===t?void 0:t.data)&&void 0!==n?n:[],rowCount:null!==(a=null===t||void 0===t?void 0:t.total)&&void 0!==a?a:0,name:"tabeleData"})})).catch((function(t){return n(t)}))}))]).then((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];e.forEach((function(e){"fulfilled"===e.status&&(t[e.value.name]=e.value.result,t.tabeleData.length&&(t.totalRow=e.value.rowCount,t.$nextTick((function(){t.$refs.vuetable.updateTable()}))))}))}))}},m=b,h=(n("8597"),n("2877")),p=Object(h["a"])(m,i,u,!1,null,"59c80b10",null),C=p.exports,w={name:"Dashboard",computed:Object(r["a"])({dynamicLoad:function(){return"admin"===this.getUserRole?C:s["default"]}},Object(c["b"])("user",["getUserRole"]))},g=w,y=Object(h["a"])(g,a,o,!1,null,null,null);e["default"]=y.exports},"820e":function(t,e,n){"use strict";var a=n("23e7"),o=n("1c0b"),r=n("f069"),c=n("e667"),s=n("2266");a({target:"Promise",stat:!0},{allSettled:function(t){var e=this,n=r.f(e),a=n.resolve,i=n.reject,u=c((function(){var n=o(e.resolve),r=[],c=0,i=1;s(t,(function(t){var o=c++,s=!1;r.push(void 0),i++,n.call(e,t).then((function(t){s||(s=!0,r[o]={status:"fulfilled",value:t},--i||a(r))}),(function(t){s||(s=!0,r[o]={status:"rejected",reason:t},--i||a(r))}))})),--i||a(r)}));return u.error&&i(u.value),n.promise}})},8597:function(t,e,n){"use strict";n("c0f2")},b0c0:function(t,e,n){var a=n("83ab"),o=n("9bf2").f,r=Function.prototype,c=r.toString,s=/^\s*function ([^ (]*)/,i="name";a&&!(i in r)&&o(r,i,{configurable:!0,get:function(){try{return c.call(this).match(s)[1]}catch(t){return""}}})},c0f2:function(t,e,n){},e592:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var a=n("d4ec"),o=n("bee2"),r=n("262e"),c=n("2caf"),s=(n("99af"),n("b775")),i=n("3a78"),u="student",l=function(t){Object(r["a"])(n,t);var e=Object(c["a"])(n);function n(){return Object(a["a"])(this,n),e.call(this,u)}return Object(o["a"])(n,[{key:"changeStatus",value:function(t){return Object(s["a"])({url:"".concat(this.apiURL,"/status/").concat(t),method:"patch"}).then((function(t){return t}))}},{key:"getStudentAndCourseDataById",value:function(t){return Object(s["a"])({url:"".concat(this.apiURL,"/course/").concat(t),method:"get"}).then((function(t){return t}))}},{key:"resetPassword",value:function(t){return Object(s["a"])({url:"".concat(this.apiURL,"/reset/").concat(t),method:"post"}).then((function(t){return t}))}}]),n}(i["a"])}}]);
//# sourceMappingURL=Dashboard.14d9d060.js.map