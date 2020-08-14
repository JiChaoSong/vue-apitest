(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f37e900"],{"24d2":function(t,e,r){"use strict";r.d(e,"c",(function(){return i})),r.d(e,"a",(function(){return n})),r.d(e,"d",(function(){return a})),r.d(e,"b",(function(){return l}));var o=r("b775");function i(t){return Object(o["a"])({url:"/project/",method:"get",params:t})}function n(t){return Object(o["a"])({url:"/project/",method:"post",data:t})}function a(t,e){return Object(o["a"])({url:"/project/"+t+"/",method:"put",data:e})}function l(t){return Object(o["a"])({url:"/project/"+t+"/",method:"delete"})}},"707c":function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"project-container"},[r("div",{staticClass:"operation-container"},[r("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:t.handleCreate}},[t._v("新增")])],1),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,stripe:"",size:"small"}},[r("el-table-column",{attrs:{align:"center",label:"#",width:"65px  ",index:t.indexMethod,type:"index"}}),r("el-table-column",{attrs:{label:"项目名称",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",{on:{click:function(r){return t.handlerowclick(e.row)}}},[t._v(t._s(e.row.projectName))])]}}])}),r("el-table-column",{attrs:{label:"项目地址",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.projectUrl))]}}])}),r("el-table-column",{attrs:{label:"创建时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatDate")(e.row.createdTime)))]}}])}),r("el-table-column",{attrs:{label:"更新时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t._f("formatDate")(e.row.updatedTime)))]}}])}),r("el-table-column",{attrs:{label:"操作",align:"center",width:"250px"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[r("el-button",{attrs:{type:"text"},on:{click:function(e){return t.handleUpdate(o)}}},[t._v("编辑")]),r("el-button",{staticStyle:{color:"#f95359"},attrs:{type:"text"},on:{click:function(e){return t.deleteProject(o)}}},[t._v("删除")])]}}])})],1),r("el-pagination",{attrs:{background:"",layout:"prev, pager, next, total",total:t.total},on:{"current-change":t.handleCurrentChange}}),r("el-dialog",{attrs:{title:t.titleMap[t.dialogvisibleTitle],visible:t.dialogvisibleForm,width:"800px"},on:{"update:visible":function(e){t.dialogvisibleForm=e}}},[r("el-form",{ref:"ruleform",attrs:{model:t.projectForm,rules:t.projectrule,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"项目名称:",prop:"projectName"}},[r("el-input",{attrs:{placeholder:"请输入项目名称"},model:{value:t.projectForm.projectName,callback:function(e){t.$set(t.projectForm,"projectName",e)},expression:"projectForm.projectName"}})],1),r("el-form-item",{attrs:{label:"项目地址:",prop:"projectUrl"}},[r("el-input",{attrs:{placeholder:"请输入项目地址"},model:{value:t.projectForm.projectUrl,callback:function(e){t.$set(t.projectForm,"projectUrl",e)},expression:"projectForm.projectUrl"}})],1),r("el-form-item",{attrs:{label:"项目描述:",prop:"projectDesc"}},[r("el-input",{staticStyle:{width:"400px"},attrs:{type:"textarea",placeholder:"请输入项目描述",autosize:""},model:{value:t.projectForm.projectDesc,callback:function(e){t.$set(t.projectForm,"projectDesc",e)},expression:"projectForm.projectDesc"}})],1),r("el-form-item",{staticStyle:{"text-align":"left"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){"created"===t.dialogvisibleTitle?t.createdProject():t.updatedProject()}}},[t._v("保存")]),r("el-button",{on:{click:t.handlecancel}},[t._v("取消")])],1)],1)],1)],1)},i=[],n=r("24d2"),a=r("fa20"),l={name:"project",inject:["reload"],computed:{user:function(){return Object(a["b"])()}},data:function(){return{list:null,listLoading:!0,total:0,listQuery:{page:1,size:10},dialogvisibleTitle:null,dialogvisibleForm:!1,titleMap:{updated:"编辑项目",created:"创建项目"},projectForm:{id:void 0,projectName:"",projectDesc:"",projectUrl:"",projectEnv:"",person:this.user},projectrule:{projectName:[{required:!0,message:"请输入项目名称",trigger:"blur"}],projectUrl:[{required:!0,message:"请输入项目地址",trigger:"blur"}]}}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;this.listLoading=!0,Object(n["c"])(this.listQuery).then((function(e){t.list=e.data.results,t.total=e.data.count,t.listLoading=!1}))},resetprojectform:function(){this.projectForm={id:void 0,projectName:"",projectDesc:"",projectUrl:"",projectEnv:"",person:this.user}},handleCreate:function(){var t=this;this.resetprojectform(),this.dialogvisibleTitle="created",this.dialogvisibleForm=!0,this.$nextTick((function(){t.$refs.ruleform.clearValidate()}))},handleUpdate:function(t){var e=this;this.projectForm=Object.assign({},t),this.dialogvisibleTitle="updated",this.dialogvisibleForm=!0,this.$nextTick((function(){e.$refs.ruleform.clearValidate()}))},createdProject:function(){var t=this;this.$refs.ruleform.validate((function(e){e&&Object(n["a"])(t.projectForm).then((function(e){t.dialogvisibleForm=!1,t.fetchData(),location.reload(),t.$notify({title:"成功",message:"添加成功",type:"success",duration:2e3})}))}))},updatedProject:function(){var t=this;this.$refs.ruleform.validate((function(e){if(e){var r=Object.assign({},t.projectForm);Object(n["d"])(r.id,r).then((function(e){t.dialogvisibleForm=!1,t.fetchData(),location.reload(),t.$notify({title:"成功",message:"修改成功",type:"success",duration:2e3})}))}}))},deleteProject:function(t){var e=this;this.$confirm("确定要删除该数据吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(r){Object(n["b"])(t.id).then((function(t){e.fetchData(),location.reload(),e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3})}))})).catch((function(t){}))},indexMethod:function(t){return(this.listQuery.page-1)*this.listQuery.size+(t+1)},handleCurrentChange:function(t){this.listQuery.page=t,this.fetchData()},handlecancel:function(){this.resetprojectform(),this.dialogvisibleForm=!1},handlerowclick:function(t){this.$router.push({name:"System",query:{id:t.id,name:t.projectName}})}}},c=l,s=(r("8689a"),r("2877")),u=Object(s["a"])(c,o,i,!1,null,"f0d8ef14",null);e["default"]=u.exports},"8689a":function(t,e,r){"use strict";var o=r("e897"),i=r.n(o);i.a},e897:function(t,e,r){}}]);