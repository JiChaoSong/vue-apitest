(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6462b23e"],{5360:function(t,s,a){},"7abe":function(t,s,a){"use strict";a.r(s);var n=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"container"},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:t.span1}},[a("div",{staticClass:"card-content"},[t._v(" 项目总数: "+t._s(t.list.projectCount)+" ")])]),a("el-col",{attrs:{span:t.span1}},[a("div",{staticClass:"card-content"},[t._v(" 接口总数: "+t._s(t.list.apiCount)+" ")])]),a("el-col",{attrs:{span:t.span1}},[a("div",{staticClass:"card-content"},[t._v(" 用例总数: "+t._s(t.list.caseCount)+" ")])])],1)],1)},e=[],i=a("b775");function c(t){return Object(i["a"])({url:"/statistic/count",method:"post",data:t})}var o=a("fa20"),r={name:"index",data:function(){return{span1:8,listQuery:{page:1,size:2147483647},list:null,listLoading:!0,post:{userId:Object(o["b"])()}}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.listLoading=!0,c(this.post).then((function(s){t.list=s.data,t.listLoading=!1}))}}},l=r,u=(a("e888"),a("2877")),d=Object(u["a"])(l,n,e,!1,null,"0e0556ea",null);s["default"]=d.exports},e888:function(t,s,a){"use strict";var n=a("5360"),e=a.n(n);e.a}}]);