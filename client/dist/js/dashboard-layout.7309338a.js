(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["dashboard-layout"],{"0d81":function(e,t,a){"use strict";a("5db8")},1545:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return s})),a.d(t,"c",(function(){return i}));var n=[{value:0,label:"Sunday"},{value:1,label:"Monday"},{value:2,label:"Tuesday"},{value:3,label:"Wednesday"},{value:4,label:"Thursday"},{value:5,label:"Friday"},{value:6,label:"Saturday"}],s=[{id:1,name:"Dashboard",icon:"tachometer-alt",routeName:"Dashboard"},{id:2,name:"Manage Activities",icon:"copy",routeName:"Course"},{id:3,name:"Manage Users",icon:"user-graduate",routeName:"Student"},{id:4,name:"Manage Schedule",icon:"calendar-alt",routeName:"Schedule"},{id:5,name:"Manage Attendance",icon:"clock",routeName:"Attendance"}],i=[{id:1,name:"Manage Schedule",icon:"calendar-alt",routeName:"Dashboard"},{id:2,name:"Manage Activities",icon:"copy",routeName:"Course"},{id:3,name:"Manage Attendance",icon:"clock",routeName:"Attendance"}]},"5a05":function(e,t,a){},"5db8":function(e,t,a){},6672:function(e,t,a){},"7f3a":function(e,t,a){},bd17:function(e,t,a){},c35c:function(e,t,a){"use strict";a("bd17")},d6ea:function(e,t,a){"use strict";a("5a05")},e248:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Layout",[a("router-view")],1)},s=[],i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrapper"},[a("side-bar"),a("div",{staticClass:"content"},[a("nav-bar"),a("div",{staticClass:"container-fluid"},[e._t("default")],2)],1)],1)},o=[],r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nav",{staticClass:"navbar navbar-default mb-xl-5 mb-4"},[a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"navbar-header"}),a("ul",{staticClass:"top-icons-agileits-w3layouts float-right"},[a("li",{staticClass:"nav-item dropdown",class:{open:e.dropDownOpen}},[a("a",{staticClass:"nav-link dropdown-toggle",attrs:{href:"#",id:"navbarDropdown2",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},on:{click:e.manageDropdown}},[a("font-awesome-icon",{attrs:{icon:"user"}})],1),a("div",{staticClass:"dropdown-menu drop-3",style:{display:e.dropDownOpen?"block":"none"}},[a("div",{staticClass:"profile d-flex mr-o"},[a("div",{staticClass:"profile-r align-self-center"},[a("h3",{staticClass:"sub-title-w3-agileits"},[e._v(" "+e._s(this.getUserFullName)+" ")]),a("a",{attrs:{href:"mailto:info@example.com"}},[e._v(e._s(this.getUserEmail))])])]),a("div",{staticClass:"dropdown-divider"}),a("router-link",{staticClass:"dropdown-item",attrs:{to:{name:"Profile"}}},[e._v(" Profile ")]),a("span",{staticClass:"dropdown-item cp",on:{click:e.logout}},[e._v(" Logout ")])],1)])])])])},c=[],l=a("5530"),u=a("2f62"),d={name:"NavBar",data:function(){return{dropDownOpen:!1}},computed:Object(l["a"])({},Object(u["b"])("user",["getUserFullName","getUserEmail","isAdmin"])),methods:{manageDropdown:function(){this.dropDownOpen=!this.dropDownOpen},logout:function(){this.$store.dispatch("user/logoutUser"),this.$router.push({name:"UserLogin"})}}},m=d,p=(a("f658"),a("2877")),f=Object(p["a"])(m,r,c,!1,null,"6e6a0058",null),v=f.exports,b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nav",{staticClass:"sidebar"},[a("div",{staticClass:"sidebar-header"},[a("h1",{staticStyle:{"text-align":"center"}},[a("router-link",{attrs:{to:{name:"Dashboard"}}},[e._v(" "+e._s(e.isAdmin?"Admin":"User")+" ")])],1),a("span",{staticStyle:{"text-align":"center"}},[a("router-link",{attrs:{to:{name:"Dashboard"}}},[e._v(" "+e._s(e.isAdmin?"A":"U")+" ")])],1)]),a("ul",{staticClass:"list-unstyled components"},e._l(e.getMenu,(function(t){return a("li",{key:t.id,class:{active:e.getActiveMenu(t.routeName)}},[a("router-link",{attrs:{to:{name:t.routeName}}},[a("font-awesome-icon",{attrs:{icon:t.icon}}),e._v(" "+e._s(t.name)+" ")],1)],1)})),0)])},h=[],g=a("1545"),w={name:"SideBar",data:function(){return{adminMenu:g["a"],studentMenu:g["c"]}},methods:{getActiveMenu:function(e){return e===this.$route.meta.active}},computed:Object(l["a"])({getMenu:function(){return this.isAdmin?this.adminMenu:this.studentMenu}},Object(u["b"])("user",["isAdmin"]))},_=w,C=(a("c35c"),a("d6ea"),Object(p["a"])(_,b,h,!1,null,"25386db2",null)),y=C.exports,M=(a("6672"),{name:"Dashboard",components:{NavBar:v,SideBar:y}}),A=M,D=(a("0d81"),Object(p["a"])(A,i,o,!1,null,"c74bdc80",null)),N=D.exports,k={name:"Dashboard",components:{Layout:N}},O=k,x=Object(p["a"])(O,n,s,!1,null,null,null);t["default"]=x.exports},f658:function(e,t,a){"use strict";a("7f3a")}}]);
//# sourceMappingURL=dashboard-layout.7309338a.js.map