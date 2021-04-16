(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["StudentForm"],{"29e8":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"outer-w3-agile col-xl mt-3"},[a("h4",{staticClass:"tittle-w3-agileits mb-4"},[e._v(e._s(e.formLabel)+" User")]),e.messageDisplay?a("div",{staticClass:"alert",class:[e.isSuccessful?"alert-success":"alert-danger"],attrs:{role:"alert"}},[e._v(" "+e._s(e.messageDisplay)+" ")]):e._e(),a("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"fullName"}},[e._v("Full Name")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.fullName,expression:"fullName",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",id:"fullName",placeholder:"Full Name",autocomplete:"off"},domProps:{value:e.fullName},on:{input:function(t){t.target.composing||(e.fullName=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"dob"}},[e._v("Date of Birth")]),a("date-picker",{ref:"datePicker",attrs:{"input-class":"form-control",format:"DD-MM-YYYY",placeholder:"Date of Birth","popup-style":e.popupStype},on:{open:e.datePickerOpen},model:{value:e.dob,callback:function(t){e.dob=t},expression:"dob"}})],1),e.isEditPage?e._e():a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"email"}},[e._v("Email")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.email,expression:"email",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",id:"email",placeholder:"Email",autocomplete:"off",disabled:e.isEditPage},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),e.isEditPage?e._e():a("div",{staticClass:"form-group"},[a("label",{attrs:{for:"password"}},[e._v("Password")]),a("input",{staticClass:"form-control",attrs:{type:"text",id:"password",value:"123456",autocomplete:"off",disabled:""}})]),a("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v(e._s(e.formLabel))])])])])},r=[],n=a("1da1"),i=(a("96cf"),a("e592")),o=a("f040"),u=a("ec45"),c=(a("411c"),{name:"StudentForm",mixins:[o["a"]],components:{DatePicker:u["default"]},data:function(){return{fullName:"",dob:"",email:"",popupStype:{},StudentService:new i["a"]}},formFields:["fullName","dob","email"],mounted:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,s,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isEditPage){t.next=14;break}return t.prev=1,t.next=4,e.StudentService.getById(e.$route.params.id);case 4:a=t.sent,s=a.fullName,r=a.dob,e.fullName=s,e.dob=new Date(r),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](1),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[1,11]])})))()},methods:{submit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,s,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,!e.isEditPage){t.next=7;break}return t.next=4,e.StudentService.update(e.$route.params.id,e.formData);case 4:e.$router.push({name:"Student"}),t.next=11;break;case 7:return t.next=9,e.StudentService.add(e.formData);case 9:e.resetAll(),e.showMessage({success:!0,message:"Student successfully added."});case 11:t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),e.showMessage({message:null!==(a=null===t.t0||void 0===t.t0||null===(s=t.t0.response)||void 0===s||null===(r=s.data)||void 0===r?void 0:r.message)&&void 0!==a?a:"Something Wrong!!!"});case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()},changeTextFieldToDate:function(e){e.target.type="date"},changeDateFieldToText:function(e){e.target.type="text"},datePickerOpen:function(){var e=this.$refs.datePicker.$el.getBoundingClientRect(),t=e.left;this.popupStype={left:"".concat(t,"px")}}},computed:{formLabel:function(){return this.$route.params.id?"Edit":"Add"},isEditPage:function(){return!!this.$route.params.id}}}),l=c,d=a("2877"),m=Object(d["a"])(l,s,r,!1,null,null,null);t["default"]=m.exports},"411c":function(e,t,a){},e592:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var s=a("d4ec"),r=a("bee2"),n=a("262e"),i=a("2caf"),o=(a("99af"),a("b775")),u=a("3a78"),c="student",l=function(e){Object(n["a"])(a,e);var t=Object(i["a"])(a);function a(){return Object(s["a"])(this,a),t.call(this,c)}return Object(r["a"])(a,[{key:"changeStatus",value:function(e){return Object(o["a"])({url:"".concat(this.apiURL,"/status/").concat(e),method:"patch"}).then((function(e){return e}))}},{key:"getStudentAndCourseDataById",value:function(e){return Object(o["a"])({url:"".concat(this.apiURL,"/course/").concat(e),method:"get"}).then((function(e){return e}))}},{key:"resetPassword",value:function(e){return Object(o["a"])({url:"".concat(this.apiURL,"/reset/").concat(e),method:"post"}).then((function(e){return e}))}}]),a}(u["a"])},f040:function(e,t,a){"use strict";a("159b");var s={data:function(){return{isSuccessful:!1,messageDisplay:"",timer:null,success:!1}},methods:{showMessage:function(e){var t=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3;this.isSuccessful=e.success,this.messageDisplay=e.message;var s=e.ref;s&&(this.$refs[s].style.display="block"),clearTimeout(this.timer),this.timer=setTimeout((function(){t.isSuccessful=!1,t.messageDisplay="",s&&(t.$refs[s].style.display="none")}),a)},resetAll:function(){var e=this;this.$options.formFields.forEach((function(t){e.$data[t]=""}))}},computed:{formData:function(){var e=this,t={};return this.$options.formFields.forEach((function(a){e.$data[a]&&(t[a]=e.$data[a])})),t}}};t["a"]=s}}]);
//# sourceMappingURL=StudentForm.5d79bd7c.js.map