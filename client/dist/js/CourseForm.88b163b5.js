(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["CourseForm"],{3292:function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var s=r("d4ec"),a=r("bee2"),n=r("262e"),o=r("2caf"),u=(r("99af"),r("b775")),c=r("3a78"),i="course",l=function(e){Object(n["a"])(r,e);var t=Object(o["a"])(r);function r(){return Object(s["a"])(this,r),t.call(this,i)}return Object(a["a"])(r,[{key:"assignCourse",value:function(e,t){return Object(u["a"])({url:"".concat(this.apiURL,"/assign/").concat(e),method:"post",data:t}).then((function(e){return e}))}},{key:"getAssignStudnet",value:function(e){return Object(u["a"])({url:"".concat(this.apiURL,"/assign/").concat(e),method:"get"}).then((function(e){return e}))}},{key:"addEvents",value:function(e){return Object(u["a"])({url:"".concat(this.apiURL,"/events"),method:"post",data:e}).then((function(e){return e}))}},{key:"getEvents",value:function(){return Object(u["a"])({url:"".concat(this.apiURL,"/events"),method:"get"}).then((function(e){return e}))}},{key:"getEventsForStudent",value:function(){return Object(u["a"])({url:"".concat(this.apiURL,"/events/student"),method:"get"}).then((function(e){return e}))}},{key:"studentAttendance",value:function(e,t){return Object(u["a"])({url:"".concat(this.apiURL,"/attendance/").concat(e),method:"post",data:t}).then((function(e){return e}))}},{key:"getAttendance",value:function(e,t){return Object(u["a"])({url:"".concat(this.apiURL,"/attendance/").concat(e),method:"get",params:t}).then((function(e){return e}))}}]),r}(c["a"])},"53cb":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row"},[r("div",{staticClass:"outer-w3-agile col-xl mt-3"},[r("h4",{staticClass:"tittle-w3-agileits mb-4"},[e._v(e._s(e.formLabel)+" Course")]),e.messageDisplay?r("div",{staticClass:"alert",class:[e.isSuccessful?"alert-success":"alert-danger"],attrs:{role:"alert"}},[e._v(" "+e._s(e.messageDisplay)+" ")]):e._e(),r("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"courseName"}},[e._v("Course Name")]),r("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.courseName,expression:"courseName",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",id:"courseName",placeholder:"Course Name",autocomplete:"off"},domProps:{value:e.courseName},on:{input:function(t){t.target.composing||(e.courseName=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"courseCode"}},[e._v("Course Code")]),r("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.courseCode,expression:"courseCode",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",id:"courseCode",placeholder:"Course Code",autocomplete:"off"},domProps:{value:e.courseCode},on:{input:function(t){t.target.composing||(e.courseCode=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})]),r("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v(e._s(e.formLabel))])])])])},a=[],n=r("1da1"),o=(r("96cf"),r("3292")),u=r("f040"),c={name:"CourseForm",mixins:[u["a"]],data:function(){return{courseName:"",courseCode:"",CourseService:new o["a"]}},formFields:["courseName","courseCode"],mounted:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$route.params.id){t.next=8;break}return t.next=3,e.CourseService.getById(e.$route.params.id);case 3:r=t.sent,s=r.courseName,a=r.courseCode,e.courseName=s,e.courseCode=a;case 8:case"end":return t.stop()}}),t)})))()},methods:{submit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r,s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,!e.$route.params.id){t.next=7;break}return t.next=4,e.CourseService.update(e.$route.params.id,e.formData);case 4:e.$router.push({name:"Course"}),t.next=11;break;case 7:return t.next=9,e.CourseService.add(e.formData);case 9:e.resetAll(),e.showMessage({success:!0,message:"Course successfully added."});case 11:t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),e.showMessage({message:null!==(r=null===t.t0||void 0===t.t0||null===(s=t.t0.response)||void 0===s||null===(a=s.data)||void 0===a?void 0:a.message)&&void 0!==r?r:"Something Wrong!!!"});case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()}},computed:{formLabel:function(){return this.$route.params.id?"Edit":"Add"}}},i=c,l=r("2877"),m=Object(l["a"])(i,s,a,!1,null,null,null);t["default"]=m.exports},f040:function(e,t,r){"use strict";r("159b");var s={data:function(){return{isSuccessful:!1,messageDisplay:"",timer:null,success:!1}},methods:{showMessage:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3;this.isSuccessful=e.success,this.messageDisplay=e.message;var s=e.ref;s&&(this.$refs[s].style.display="block"),clearTimeout(this.timer),this.timer=setTimeout((function(){t.isSuccessful=!1,t.messageDisplay="",s&&(t.$refs[s].style.display="none")}),r)},resetAll:function(){var e=this;this.$options.formFields.forEach((function(t){e.$data[t]=""}))}},computed:{formData:function(){var e=this,t={};return this.$options.formFields.forEach((function(r){e.$data[r]&&(t[r]=e.$data[r])})),t}}};t["a"]=s}}]);
//# sourceMappingURL=CourseForm.88b163b5.js.map