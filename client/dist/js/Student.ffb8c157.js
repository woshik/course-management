(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Student"],{a269:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"row"},[n("div",{staticClass:"outer-w3-agile col-xl mt-3"},[e.messageDisplay?n("div",{staticClass:"alert",class:[e.isSuccessful?"alert-success":"alert-danger"],attrs:{role:"alert"}},[e._v(" "+e._s(e.messageDisplay)+" ")]):e._e(),n("button",{staticClass:"btn btn-primary mb-3 float-right",on:{click:e.addStudent}},[e._v(" Add Student ")]),n("vue-table",{ref:"vuetable",attrs:{fields:e.tableFields,"table-data":e.tabeleData,"total-row":e.totalRow},on:{"edit-row":e.editRow,"delete-row":e.deleteRow,"api-call":e.callToAPi},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.rowData;return[n("button",{staticClass:"btn btn-primary btn-sm m-1",on:{click:function(t){return e.showStudentDetails(a)}}},[n("font-awesome-icon",{attrs:{icon:"address-book"}}),e._v(" Details ")],1),n("button",{staticClass:"btn btn-sm m-1",class:[a.active?"btn-danger":"btn-success"],on:{click:function(t){return e.changeStatus(a)}}},[n("font-awesome-icon",{attrs:{icon:"wrench"}}),e._v(" "+e._s(a.active?"Inactive":"Active")+" Acount ")],1),n("button",{staticClass:"btn btn-info btn-sm m-1",on:{click:function(t){return e.resetPassword(a)}}},[n("font-awesome-icon",{attrs:{icon:"redo"}}),e._v(" Reset Password ")],1)]}}])})],1),e.showModal.deleteModal?n("modal-window",{on:{open:e.handleModal},scopedSlots:e._u([{key:"title",fn:function(){return[e._v(" Delete Student ")]},proxy:!0},{key:"footer",fn:function(){return[n("button",{staticClass:"btn btn-danger",on:{click:function(t){return e.deleteRow(null)}}},[e._v("Delete")])]},proxy:!0}],null,!1,2790076703)},[e._v(" Do you want to really delete this student? ")]):e._e(),e.showModal.statusModal?n("modal-window",{on:{open:e.handleModal},scopedSlots:e._u([{key:"title",fn:function(){return[e._v(" Change Account status ")]},proxy:!0},{key:"footer",fn:function(){return[n("button",{staticClass:"btn btn-danger",on:{click:function(t){return e.changeStatus(null)}}},[e._v("Change")])]},proxy:!0}],null,!1,2965202946)},[e._v(" Do you want to really change this account status? ")]):e._e(),e.showModal.resetModal?n("modal-window",{on:{open:e.handleModal},scopedSlots:e._u([{key:"title",fn:function(){return[e._v(" Reset Acount Password ")]},proxy:!0},{key:"footer",fn:function(){return[n("button",{staticClass:"btn btn-danger",on:{click:function(t){return e.resetPassword(null)}}},[e._v("Change")])]},proxy:!0}],null,!1,3803252769)},[e._v(" Do you want to really change account passwrd?"),n("br"),e._v(" Reset password will be: 123456 ")]):e._e()],1)},s=[],o=n("1da1"),r=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),n("99af"),n("e592")),l=n("f040"),u=n("0748"),c=n("9fa3"),i={name:"Student",mixins:[l["a"]],components:{VueTable:u["a"],ModalWindow:function(){return n.e("chunk-2d0d5ffe").then(n.bind(null,"714b"))}},data:function(){return{index:1,StudentService:new r["a"],tableFields:[{name:c["a"],title:"No."},{name:"fullName",title:"Full Name"},{name:"dob",title:"Date of Birth",formatter:function(e){var t=new Date(e);return"".concat(t.getDate(),"-").concat(t.getMonth()+1,"-").concat(t.getFullYear())}},{name:"email",title:"Email"},{name:"active",title:"Active",formatter:function(e){return e?"Active":"Inactive"}},{name:"actions",title:"Actions"}],tabeleData:[],totalRow:0,showModal:{deleteModal:!1,statusModal:!1,resetModal:!1},selectedId:""}},methods:{callToAPi:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a,s,o,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.StudentService.get(e);case 3:a=n.sent,t.tabeleData=a.data,t.totalRow=a.total,t.$nextTick((function(){t.$refs.vuetable.updateTable()})),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](0),t.showMessage({message:null!==(s=null===n.t0||void 0===n.t0||null===(o=n.t0.response)||void 0===o||null===(r=o.data)||void 0===r?void 0:r.message)&&void 0!==s?s:"Something Wrong!!!"});case 12:case"end":return n.stop()}}),n,null,[[0,9]])})))()},addStudent:function(){this.$router.push({name:"AddStudent"})},editRow:function(e){this.$router.push({name:"EditStudent",params:{id:e}})},deleteRow:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a,s,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e){n.next=4;break}return t.selectedId=e,t.handleModal(!0,"deleteModal"),n.abrupt("return");case 4:return n.prev=4,n.next=7,t.StudentService.delete(t.selectedId);case 7:t.callToAPi(),t.handleModal(!1,"deleteModal"),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](4),t.showMessage({message:null!==(a=null===n.t0||void 0===n.t0||null===(s=n.t0.response)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.message)&&void 0!==a?a:"Something Wrong!!!"});case 14:case"end":return n.stop()}}),n,null,[[4,11]])})))()},changeStatus:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a,s,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e){n.next=4;break}return t.selectedId=e._id,t.handleModal(!0,"statusModal"),n.abrupt("return");case 4:return n.prev=4,n.next=7,t.StudentService.changeStatus(t.selectedId);case 7:t.callToAPi(),t.handleModal(!1,"statusModal"),t.showMessage({success:!0,message:"Successfully Updated"}),n.next=15;break;case 12:n.prev=12,n.t0=n["catch"](4),t.showMessage({message:null!==(a=null===n.t0||void 0===n.t0||null===(s=n.t0.response)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.message)&&void 0!==a?a:"Something Wrong!!!"});case 15:case"end":return n.stop()}}),n,null,[[4,12]])})))()},resetPassword:function(e){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a,s,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e){n.next=4;break}return t.selectedId=e._id,t.handleModal(!0,"resetModal"),n.abrupt("return");case 4:return n.prev=4,n.next=7,t.StudentService.resetPassword(t.selectedId);case 7:t.callToAPi(),t.handleModal(!1,"resetModal"),t.showMessage({success:!0,message:"Password Successfully Reset. New Password: 123456"}),n.next=15;break;case 12:n.prev=12,n.t0=n["catch"](4),t.showMessage({message:null!==(a=null===n.t0||void 0===n.t0||null===(s=n.t0.response)||void 0===s||null===(o=s.data)||void 0===o?void 0:o.message)&&void 0!==a?a:"Something Wrong!!!"});case 15:case"end":return n.stop()}}),n,null,[[4,12]])})))()},handleModal:function(e,t){t?this.showModal[t]=e:(this.showModal.deleteModal=e,this.showModal.statusModal=e,this.showModal.resetModal=e)},showStudentDetails:function(e){this.$router.push({name:"StudentDetails",params:{id:e._id}})}}},d=i,h=n("2877"),f=Object(h["a"])(d,a,s,!1,null,null,null);t["default"]=f.exports},e592:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("d4ec"),s=n("bee2"),o=n("262e"),r=n("2caf"),l=(n("99af"),n("b775")),u=n("3a78"),c="student",i=function(e){Object(o["a"])(n,e);var t=Object(r["a"])(n);function n(){return Object(a["a"])(this,n),t.call(this,c)}return Object(s["a"])(n,[{key:"changeStatus",value:function(e){return Object(l["a"])({url:"".concat(this.apiURL,"/status/").concat(e),method:"patch"}).then((function(e){return e}))}},{key:"getStudentAndCourseDataById",value:function(e){return Object(l["a"])({url:"".concat(this.apiURL,"/course/").concat(e),method:"get"}).then((function(e){return e}))}},{key:"resetPassword",value:function(e){return Object(l["a"])({url:"".concat(this.apiURL,"/reset/").concat(e),method:"post"}).then((function(e){return e}))}}]),n}(u["a"])},f040:function(e,t,n){"use strict";n("159b");var a={data:function(){return{isSuccessful:!1,messageDisplay:"",timer:null,success:!1}},methods:{showMessage:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3;this.isSuccessful=e.success,this.messageDisplay=e.message,clearTimeout(this.timer),this.timer=setTimeout((function(){t.isSuccessful=!1,t.messageDisplay=""}),n)},resetAll:function(){var e=this;this.$options.formFields.forEach((function(t){e.$data[t]=""}))}},computed:{formData:function(){var e=this,t={};return this.$options.formFields.forEach((function(n){e.$data[n]&&(t[n]=e.$data[n])})),t}}};t["a"]=a}}]);
//# sourceMappingURL=Student.ffb8c157.js.map