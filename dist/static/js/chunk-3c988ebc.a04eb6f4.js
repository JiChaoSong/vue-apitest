(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c988ebc"],{"29c8":function(e,a,t){},"42c1":function(e,a,t){"use strict";var s=t("29c8"),l=t.n(s);l.a},4489:function(e,a,t){"use strict";var s=t("4ea3"),l=t.n(s);l.a},"4ea3":function(e,a,t){},"538a":function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"api-container"},[t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(a){e.activeName=a},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"API详情",name:"first"}},[t("api-desc",{attrs:{"api-infomation":e.apiInfomation,response:e.response}})],1),t("el-tab-pane",{attrs:{label:"在线调试",name:"second"}},[t("api-test",{attrs:{testapiinfo:e.testapiinfo}})],1),t("el-tab-pane",{attrs:{label:"测试用例",name:"third"}},[t("api-case",{attrs:{list:e.list,"list-query":e.listQuery,total:e.total,"fetch-data":e.fetchData,testapiinfo:e.testapiinfo}})],1)],1)],1)},l=[],i=(t("b0c0"),function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"app-container"},[t("div",{staticClass:"name"},[t("h3",[t("span",[e._v(e._s(e.apiInfomation.apiName))])])]),t("div",{staticClass:"path"},[t("h4",[e._v(e._s(e.apiInfomation.apiPath))])]),t("el-collapse",{model:{value:e.activeNames,callback:function(a){e.activeNames=a},expression:"activeNames"}},[t("el-collapse-item",{attrs:{title:"请求参数",name:"1"}},[t("el-table",{attrs:{data:e.apiInfomation.apiBody,border:""}},[t("el-table-column",{attrs:{type:"index",label:"#"}}),t("el-table-column",{attrs:{label:"参数",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(a.row.param))]}}])}),t("el-table-column",{attrs:{label:"类型",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(a.row.type))]}}])}),t("el-table-column",{attrs:{label:"必填",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(a.row.isBoolean))]}}])}),t("el-table-column",{attrs:{label:"说明",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(a.row.desc))]}}])}),t("el-table-column",{attrs:{label:"示例",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(a.row.example))]}}])}),t("el-table-column",{attrs:{label:"备注",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(a.row.remark))]}}])})],1)],1)],1),t("el-collapse",{model:{value:e.activeNames,callback:function(a){e.activeNames=a},expression:"activeNames"}},[t("el-collapse-item",{attrs:{title:"返回示例",name:"2"}},[t("div",{staticClass:"response"},[t("span",{staticClass:"resp-name"},[t("JsonViewer",{attrs:{value:e.response,"expand-depth":20,copyable:"","font-size":20}})],1)])])],1)],1)}),r=[],n=t("349e"),o=t.n(n),c={name:"ApiDesc",components:{JsonViewer:o.a},props:{apiInfomation:{type:Object,required:!0},response:{type:Object,required:!0}},data:function(){return{activeNames:["1"]}},created:function(){},methods:{}},u=c,p=(t("f271"),t("2877")),d=Object(p["a"])(u,i,r,!1,null,null,null),m=d.exports,f=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"app-container"},[t("div",{staticClass:"path-button"},[t("el-row",{attrs:{gutter:10}},[t("el-col",{attrs:{span:19}},[t("el-input",{model:{value:e.requestData.apiPath,callback:function(a){e.$set(e.requestData,"apiPath",a)},expression:"requestData.apiPath"}},[t("el-select",{staticClass:"select-method",attrs:{slot:"prepend"},slot:"prepend",model:{value:e.requestData.apiMethod,callback:function(a){e.$set(e.requestData,"apiMethod",a)},expression:"requestData.apiMethod"}},e._l(e.methons,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value,disabled:!e.isEnble}})})),1)],1)],1),t("el-col",{attrs:{span:5}},[t("el-row",{attrs:{gutter:5}},[t("el-col",{attrs:{span:12}},[t("el-button",{attrs:{type:"success"},on:{click:e.handleCreateCase}},[e._v("新建用例")])],1),t("el-col",{attrs:{span:12}},[t("el-dropdown",{attrs:{"split-button":"",type:"primary"},on:{click:e.subcommit,command:e.handleConmand}},[e._v(" 测试 "),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t("el-dropdown-item",{attrs:{command:"save"}},[e._v("保存并测试")])],1)],1)],1)],1)],1)],1)],1),t("el-collapse",{model:{value:e.activeNames,callback:function(a){e.activeNames=a},expression:"activeNames"}},[t("el-collapse-item",{attrs:{title:"Request",name:"1"}},[t("el-tabs",{attrs:{type:"card"},model:{value:e.activeName1,callback:function(a){e.activeName1=a},expression:"activeName1"}},[t("el-tab-pane",{attrs:{label:"Query参数",name:"first"}},[t("common",{attrs:{"request-data":e.requestData.apiParams}})],1),t("el-tab-pane",{attrs:{label:"请求头",name:"second"}},[t("common",{attrs:{"request-data":e.requestData.apiHeaders,lables:"header"}})],1),t("el-tab-pane",{attrs:{label:"请求体",name:"third"}},[t("common",{attrs:{"request-data":e.requestData.apiBody,lables:"body"}})],1),t("el-tab-pane",{attrs:{label:"参数提取",name:"four"}},[t("extraction",{attrs:{list:e.requestData.paramExtrat}})],1),t("el-tab-pane",{attrs:{label:"断言",name:"six"}},[t("assertions",{attrs:{"api-assert":e.requestData.apiAssert}})],1)],1)],1)],1),t("el-collapse",{model:{value:e.activeNames,callback:function(a){e.activeNames=a},expression:"activeNames"}},[t("el-collapse-item",{attrs:{title:"Response",name:"2"}},[t("el-tabs",{attrs:{type:"card"},model:{value:e.responseName,callback:function(a){e.responseName=a},expression:"responseName"}},[t("el-tab-pane",{attrs:{label:"响应头",name:"first"}},[t("JsonViewer",{staticStyle:{width:"70%"},attrs:{value:e.testResult.responseHeader,"expand-depth":20,copyable:"","font-size":20}})],1),t("el-tab-pane",{attrs:{label:"响应体",name:"second"}},[t("JsonViewer",{attrs:{value:e.testResult.responseBody,"expand-depth":20,copyable:"","font-size":20}})],1),t("el-tab-pane",{attrs:{label:"请求头",name:"third"}},[t("JsonViewer",{attrs:{value:e.testResult.requestHeader,"expand-depth":20,copyable:"","font-size":20}})],1),t("el-tab-pane",{attrs:{label:"请求体",name:"four"}},[t("JsonViewer",{attrs:{value:e.testResult.requestBody,"expand-depth":20,copyable:"","font-size":20}})],1),t("el-tab-pane",{attrs:{label:"参数提取结果",name:"fine"}},[t("JsonViewer",{attrs:{value:e.testResult.extrationResult,"expand-depth":20,"font-size":20,copyable:""}})],1),t("el-tab-pane",{attrs:{label:"断言结果",name:"six"}},[t("p",{staticStyle:{color:"#999999"}},[e._v("* 0:成功, 1:失败, 2: 错误*")]),t("span",[e._v(e._s(e.testResult.assertRestlt))])])],1)],1)],1),t("el-dialog",{staticClass:"create-case-dialog",attrs:{title:"测试用例",visible:e.dialogvisibleForm,width:"1200px"},on:{"update:visible":function(a){e.dialogvisibleForm=a}}},[t("el-form",{ref:"caseDataForm",attrs:{model:e.caseData,rules:e.caseDataRule,"label-position":"top"}},[t("el-form-item",{attrs:{label:"用例名称",prop:"caseName"}},[t("el-input",{model:{value:e.caseData.caseName,callback:function(a){e.$set(e.caseData,"caseName",a)},expression:"caseData.caseName"}})],1),t("el-form-item",{attrs:{label:"ApiPath"}},[t("el-input",{model:{value:e.requestData.apiPath,callback:function(a){e.$set(e.requestData,"apiPath",a)},expression:"requestData.apiPath"}},[t("el-select",{staticClass:"select-method",attrs:{slot:"prepend"},slot:"prepend",model:{value:e.requestData.apiMethod,callback:function(a){e.$set(e.requestData,"apiMethod",a)},expression:"requestData.apiMethod"}},e._l(e.methons,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),t("el-form-item",{attrs:{label:"请求参数"}},[t("el-tabs",{attrs:{type:"card"},model:{value:e.caseActiveName,callback:function(a){e.caseActiveName=a},expression:"caseActiveName"}},[t("el-tab-pane",{attrs:{label:"Query参数",name:"first"}},[t("common",{attrs:{"request-data":e.caseData.apiParams}})],1),t("el-tab-pane",{attrs:{label:"请求头",name:"second"}},[t("common",{attrs:{"request-data":e.caseData.apiHeaders,lables:"header"}})],1),t("el-tab-pane",{attrs:{label:"请求体",name:"third"}},[t("common",{attrs:{"request-data":e.caseData.apiBody,lables:"body"}})],1),t("el-tab-pane",{attrs:{label:"参数提取",name:"four"}},[t("extraction",{attrs:{list:e.caseData.paramExtrat}})],1)],1)],1),t("el-form-item",{attrs:{label:"断言"}},[t("div",{staticClass:"assert-style"},[t("div",{staticClass:"radio-style"},[t("el-radio-group",{on:{click:e.handleRadio},model:{value:e.assertActive,callback:function(a){e.assertActive=a},expression:"assertActive"}},e._l(e.assertype,(function(a){return t("el-radio",{key:a.value,attrs:{label:a.value,disabled:a.disabled}},[e._v(e._s(a.label))])})),1)],1),t("div",{staticClass:"select-assert"},[t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:102===e.assertActive,expression:"assertActive === 102"}],attrs:{label:"http状态码"}},[t("el-select",{model:{value:e.caseData.apiAssert.httpcode,callback:function(a){e.$set(e.caseData.apiAssert,"httpcode",a)},expression:"caseData.apiAssert.httpcode"}},e._l(e.httpcode,(function(e){return t("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1)],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:103===e.assertActive,expression:"assertActive === 103"}],attrs:{label:"响应code"}},[t("el-select",{model:{value:e.caseData.apiAssert.responsecode,callback:function(a){e.$set(e.caseData.apiAssert,"responsecode",a)},expression:"caseData.apiAssert.responsecode"}},e._l(e.respcode,(function(e){return t("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1)],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:104===e.assertActive,expression:"assertActive===104"}],attrs:{label:"匹配的值"}},[t("el-input",{model:{value:e.caseData.apiAssert.fullMatch,callback:function(a){e.$set(e.caseData.apiAssert,"fullMatch",a)},expression:"caseData.apiAssert.fullMatch"}})],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:105===e.assertActive,expression:"assertActive===105"}],attrs:{label:"响应时间"}},[t("el-input",{model:{value:e.caseData.apiAssert.responseTime,callback:function(a){e.$set(e.caseData.apiAssert,"responseTime",a)},expression:"caseData.apiAssert.responseTime"}})],1)],1)])]),t("el-form-item",{staticStyle:{"text-align":"right"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.createCase}},[e._v("保存")])],1)],1)],1)],1)},h=[],v=t("ebad"),b=t("eced"),y=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("el-form",{attrs:{model:e.apiAssert}},[t("el-form-item",[t("div",{staticClass:"assert-style"},[t("div",{staticClass:"radio-style"},[t("el-radio-group",{model:{value:e.apiAssert.type,callback:function(a){e.$set(e.apiAssert,"type",a)},expression:"apiAssert.type"}},e._l(e.assertype,(function(a){return t("el-radio",{key:a.value,attrs:{label:a.value,disabled:a.disabled}},[e._v(e._s(a.label))])})),1)],1),t("div",{staticClass:"select-assert"},[t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:102===e.apiAssert.type,expression:"apiAssert.type === 102"}],attrs:{label:"http状态码"}},[t("el-select",{model:{value:e.apiAssert.httpcode,callback:function(a){e.$set(e.apiAssert,"httpcode",a)},expression:"apiAssert.httpcode"}},e._l(e.httpcode,(function(e){return t("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1)],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:103===e.apiAssert.type,expression:"apiAssert.type === 103"}],attrs:{label:"响应code"}},[t("el-select",{model:{value:e.apiAssert.responsecode,callback:function(a){e.$set(e.apiAssert,"responsecode",a)},expression:"apiAssert.responsecode"}},e._l(e.respcode,(function(e){return t("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1)],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:104===e.apiAssert.type,expression:"apiAssert.type===104"}],attrs:{label:"匹配的值"}},[t("el-input",{model:{value:e.apiAssert.fullMatch,callback:function(a){e.$set(e.apiAssert,"fullMatch",a)},expression:"apiAssert.fullMatch"}})],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:105===e.apiAssert.type,expression:"apiAssert.type===105"}],attrs:{label:"响应时间"}},[t("el-input",{model:{value:e.apiAssert.responseTime,callback:function(a){e.$set(e.apiAssert,"responseTime",a)},expression:"apiAssert.responseTime"}})],1)],1)])])],1)},D=[],A={name:"assertions",props:{apiAssert:Object},data:function(){return{assertype:this.allEnums.assertType,httpcode:this.allEnums.httpCode,respcode:this.allEnums.responseCode,assertActive:101}}},g=A,C=(t("42c1"),Object(p["a"])(g,y,D,!1,null,"6150e4a9",null)),x=C.exports,N=t("811c"),k=t("fa20"),_=t("d4f4"),w={name:"ApiTest",props:{testapiinfo:{type:Object,required:!0}},components:{common:v["a"],JsonViewer:o.a,extraction:b["a"],assertions:x},data:function(){return{methons:this.allEnums.requestMethod,assertype:this.allEnums.assertType,httpcode:this.allEnums.httpCode,respcode:this.allEnums.responseCode,assertActive:101,activeName1:"third",caseActiveName:"first",responseName:"second",testResult:{},caseData:{id:void 0,caseNum:"",caseName:"",caseDesc:"",apiParams:null,apiHeaders:null,apiBody:null,paramExtrat:null,apiAssert:{type:this.assertActive,httpcode:null,responsecode:null,responseTime:null,fullMatch:null},createdUser:this.user,updatedUser:this.user,interface:this.$route.query.id},caseDataRule:{caseName:[{required:!0,message:"请输入用例名称",trigger:"blur"}]},dialogvisibleForm:!1,activeNames:["1","2"]}},created:function(){},computed:{requestData:function(){var e=this.testapiinfo;return null===e.apiParams&&(e.apiParams=[{param:null,desc:null,type:"String",value:null}]),null===e.apiHeaders&&(e.apiHeaders=[{param:null,desc:null,type:"String",value:null}]),null===e.apiBody&&(e.apiBody=[{param:null,desc:null,type:"String",value:null}]),null===e.paramExtrat&&(e.paramExtrat=[{type:101,label:null,isGloble:!1,expression:null}]),null===e.apiAssert&&(e.apiAssert={type:101,httpcode:null,responsecode:null,responseTime:null,fullMatch:null}),e},user:function(){return Object(k["b"])()}},methods:{subcommit:function(){var e=this;Object(N["f"])(this.requestData).then((function(a){e.testResult=a.data;try{e.testResult.responseBody=JSON.parse(e.testResult.responseBody)}catch(t){}2e4===a.code?e.$notify({title:"成功",message:"请求成功",type:"success",duration:2e3}):e.$notify({title:"失败",message:a.message,type:"danger",duration:2e3})}))},testAndUpdate:function(){var e=this;Object(N["f"])(this.requestData).then((function(a){2e4===a.code?(e.$message({message:a.message,type:"success"}),Object(N["g"])(e.$route.query.id,e.requestData).then((function(a){2e4===a.code?e.$message({message:a.message,type:"success"}):e.$message.error(a.message)}))):e.$message.error(a.message)}))},resetCaeData:function(){this.caseData={id:void 0,caseNum:"",caseName:this.requestData.apiName,caseDesc:"",apiParams:this.requestData.apiParams,apiHeaders:this.requestData.apiHeaders,apiBody:this.requestData.apiBody,paramExtrat:this.requestData.paramExtrat,apiAssert:{type:this.assertActive,httpcode:null,responsecode:null,responseTime:null,fullMatch:null},createdUser:this.user,updatedUser:this.user,interface:this.$route.query.id}},handleCreateCase:function(){var e=this;this.resetCaeData(),this.dialogvisibleForm=!0,this.$nextTick((function(){e.$refs.caseDataForm.clearValidate()}))},createCase:function(){var e=this;this.$refs.caseDataForm.validate((function(a){a&&Object(_["a"])(e.caseData).then((function(a){2e4===a.code&&(e.dialogvisibleForm=!1,e.$notify({title:"成功",message:"添加成功",type:"success",duration:2e3}))}))}))},handleConmand:function(e){"save"===e&&this.testAndUpdate()},handleRadio:function(e){this.assertActive=e}}},q=w,$=(t("4489"),Object(p["a"])(q,f,h,!1,null,null,null)),S=$.exports,M=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"app-container"},[t("div",{staticClass:"operation-container"},[t("el-button",{attrs:{type:"primary",icon:"el-icon-plus",size:"small"},on:{click:e.handleCreateCase}},[e._v("新增")])],1),t("el-table",{attrs:{data:e.list,size:"small"}},[t("el-table-column",{attrs:{type:"index",index:e.indexMethod,label:"#"}}),t("el-table-column",{attrs:{label:"用例名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(a.row.caseName))]}}])}),t("el-table-column",{attrs:{label:"用例转台",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-tag",{attrs:{type:e._f("formatStatus")(a.row.caseStatus)}},[e._v(e._s(e._f("showStatus")(a.row.caseStatus)))])]}}])}),t("el-table-column",{attrs:{label:"测试时间",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(e._f("formatDate")(a.row.startTime)))]}}])}),t("el-table-column",{attrs:{label:"创建者",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[e._v(e._s(a.row.created_User))]}}])}),t("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{type:"text"},on:{click:function(t){return e.handleCaseTest(a.row)}}},[e._v("测试")]),t("el-button",{attrs:{type:"text"},on:{click:function(t){return e.handleCopyCase(a.row)}}},[e._v("复制")])]}}])})],1),t("el-pagination",{staticClass:"page",attrs:{background:"",layout:"sizes,prev, pager, next, total",total:e.total,"page-sizes":[10,20,50,100],"page-size":10},on:{"current-change":e.handleCurrentChange,"size-change":e.handleSizeChange}}),t("el-dialog",{staticClass:"create-case-dialog",attrs:{title:"测试用例",visible:e.dialogvisibleForm,width:"1200px"},on:{"update:visible":function(a){e.dialogvisibleForm=a}}},[t("el-form",{ref:"caseDataForm",attrs:{model:e.caseData,rules:e.caseDataRule,"label-position":"top"}},[t("el-form-item",{attrs:{label:"用例编号",prop:"caseNum"}},[t("el-input",{model:{value:e.caseData.caseNum,callback:function(a){e.$set(e.caseData,"caseNum",a)},expression:"caseData.caseNum"}})],1),t("el-form-item",{attrs:{label:"用例名称",prop:"caseName"}},[t("el-input",{model:{value:e.caseData.caseName,callback:function(a){e.$set(e.caseData,"caseName",a)},expression:"caseData.caseName"}})],1),t("el-form-item",{attrs:{label:"ApiPath"}},[t("el-input",{model:{value:e.requestData.apiPath,callback:function(a){e.$set(e.requestData,"apiPath",a)},expression:"requestData.apiPath"}},[t("el-select",{staticClass:"select-method",attrs:{slot:"prepend"},slot:"prepend",model:{value:e.requestData.apiMethod,callback:function(a){e.$set(e.requestData,"apiMethod",a)},expression:"requestData.apiMethod"}},e._l(e.methons,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),t("el-form-item",{attrs:{label:"请求参数"}},[t("el-tabs",{attrs:{type:"card"},model:{value:e.caseActiveName,callback:function(a){e.caseActiveName=a},expression:"caseActiveName"}},[t("el-tab-pane",{attrs:{label:"Query参数",name:"first"}},[t("common",{attrs:{"request-data":e.caseData.apiParams}})],1),t("el-tab-pane",{attrs:{label:"请求头",name:"second"}},[t("common",{attrs:{"request-data":e.caseData.apiHeaders,lables:"header"}})],1),t("el-tab-pane",{attrs:{label:"请求体",name:"third"}},[t("common",{attrs:{"request-data":e.caseData.apiBody,lables:"body"}})],1)],1)],1),t("el-form-item",{attrs:{label:"断言"}},[t("div",{staticClass:"assert-style"},[t("div",{staticClass:"radio-style"},[t("el-radio-group",{model:{value:e.assertActive,callback:function(a){e.assertActive=a},expression:"assertActive"}},e._l(e.assertype,(function(a){return t("el-radio",{key:a.value,attrs:{label:a.value}},[e._v(e._s(a.label))])})),1)],1),t("div",{staticClass:"select-assert"},[t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:101===e.assertActive,expression:"assertActive === 101"}],attrs:{label:"http状态码"}},[t("el-select",{model:{value:e.caseData.apiAssert.httpcode,callback:function(a){e.$set(e.caseData.apiAssert,"httpcode",a)},expression:"caseData.apiAssert.httpcode"}},e._l(e.httpcode,(function(e){return t("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1)],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:102===e.assertActive,expression:"assertActive === 102"}],attrs:{label:"响应code"}},[t("el-select",{model:{value:e.caseData.apiAssert.responsecode,callback:function(a){e.$set(e.caseData.apiAssert,"responsecode",a)},expression:"caseData.apiAssert.responsecode"}},e._l(e.respcode,(function(e){return t("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1)],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:103===e.assertActive,expression:"assertActive===103"}],attrs:{label:"匹配的值"}},[t("el-input",{model:{value:e.caseData.apiAssert.fullMatch,callback:function(a){e.$set(e.caseData.apiAssert,"fullMatch",a)},expression:"caseData.apiAssert.fullMatch"}})],1),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:104===e.assertActive,expression:"assertActive===104"}],attrs:{label:"响应时间"}},[t("el-input",{model:{value:e.caseData.apiAssert.responseTime,callback:function(a){e.$set(e.caseData.apiAssert,"responseTime",a)},expression:"caseData.apiAssert.responseTime"}})],1)],1)])]),t("el-form-item",{staticStyle:{"text-align":"right"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.createCase}},[e._v("保存")]),t("el-button",{on:{click:e.handlecancelData}},[e._v("取消")])],1)],1)],1),t("el-dialog",{staticClass:"create-case-dialog",attrs:{title:"复制测试用例",visible:e.dialogvisibleCopy,width:"800px"},on:{"update:visible":function(a){e.dialogvisibleCopy=a}}},[t("el-form",{ref:"caseCopyData",attrs:{model:e.caseCopyData,rules:e.caseDataRule}},[t("el-form-item",{attrs:{label:"用例名称",prop:"caseName"}},[t("el-input",{model:{value:e.caseCopyData.caseName,callback:function(a){e.$set(e.caseCopyData,"caseName",a)},expression:"caseCopyData.caseName"}})],1),t("el-form-item",{staticStyle:{"text-align":"right"}},[t("el-button",{attrs:{type:"primary"},on:{click:e.copyCase}},[e._v("保存")]),t("el-button",{on:{click:e.handlecancelCopy}},[e._v("取消")])],1)],1)],1)],1)},O=[],P=(t("a9e3"),{name:"ApiCase",props:{list:Array,listQuery:Object,total:Number,fetchData:Function,testapiinfo:{type:Object,required:!0}},filters:{formatStatus:function(e){var a={101:null,102:"success",103:"danger",104:"warning",105:"info"};return a[e]},showStatus:function(e){var a={101:"unexecuted",102:"pass",103:"fail",104:"block",105:"closed"};return a[e]}},data:function(){return{methons:this.allEnums.requestMethod,assertype:this.allEnums.assertType,httpcode:this.allEnums.httpCode,respcode:this.allEnums.responseCode,assertActive:101,activeName:"first",caseActiveName:"first",responseName:"first",testResult:{},caseData:{id:void 0,caseNum:"",caseName:"",caseDesc:"",apiParams:null,apiHeaders:null,apiBody:null,apiAssert:{type:this.assertActive,httpcode:null,responsecode:null,responseTime:null,fullMatch:null},createdUser:this.user,updatedUser:this.user,interface:this.$route.query.id},caseDataRule:{caseName:[{required:!0,message:"请输入用例名称",trigger:"blur"}]},caseCopyData:{id:void 0,caseNum:"",caseName:""},dialogvisibleForm:!1,dialogvisibleCopy:!1}},computed:{requestData:function(){var e=this.testapiinfo;return null===e.apiParams&&(e.apiParams=[{param:null,desc:null,type:"String",value:null}]),null===e.apiHeaders&&(e.apiHeaders=[{param:null,desc:null,type:"String",value:null}]),null===e.apiBody&&(e.apiBody=[{param:null,desc:null,type:"String",value:null}]),e},user:function(){return Object(k["b"])()}},created:function(){},methods:{indexMethod:function(e){return(this.listQuery.page-1)*this.listQuery.size+(e+1)},handleCurrentChange:function(e){this.listQuery.page=e,this.fetchData()},handleSizeChange:function(e){this.listQuery.size=e,this.fetchData()},resetCaeData:function(){this.caseData={id:void 0,caseNum:"",caseName:this.requestData.apiName,caseDesc:"",apiParams:this.requestData.apiParams,apiHeaders:this.requestData.apiHeaders,apiBody:this.requestData.apiBody,apiAssert:{type:this.assertActive,httpcode:null,responsecode:null,responseTime:null,fullMatch:null},createdUser:this.user,updatedUser:this.user,interface:this.$route.query.id}},resetCaseCopy:function(){this.caseCopyData={id:void 0,caseNum:"",caseName:""}},handleCreateCase:function(){var e=this;this.resetCaeData(),this.dialogvisibleForm=!0,this.$nextTick((function(){e.$refs.caseDataForm.clearValidate()}))},createCase:function(){var e=this;this.$refs.caseDataForm.validate((function(a){a&&Object(_["a"])(e.caseData).then((function(a){2e4===a.code&&(e.dialogvisibleForm=!1,e.fetchData(),e.$notify({title:"成功",message:"添加成功",type:"success",duration:2e3}))}))}))},copyCase:function(){var e=this;this.$refs.caseCopyData.validate((function(a){if(a){var t=Object.assign({},e.caseCopyData);Object(_["b"])(t).then((function(a){2e4===a.code&&(e.dialogvisibleCopy=!1,e.fetchData(),e.$notify({title:"成功",message:"复制成功",type:"success",duration:2e3}))}))}}))},handleCopyCase:function(e){var a=this;this.caseCopyData=Object.assign({},e),this.caseCopyData.caseName="副本-"+e.caseName,this.dialogvisibleCopy=!0,this.$nextTick((function(){a.$refs.caseCopyData.clearValidate()}))},handlecancelCopy:function(){this.resetCaseCopy(),this.dialogvisibleCopy=!1},handlecancelData:function(){this.resetCaeData(),this.dialogvisibleForm=!1},handleCaseTest:function(e){var a=this;console.log(e),Object(_["k"])({caseId:e.id}).then((function(e){2e4===e.code&&(a.fetchData(),a.$message({message:e.message,type:"success"}))}))}}}),j=P,T=Object(p["a"])(j,M,O,!1,null,"74631325",null),E=T.exports,R={name:"detail",components:{ApiDesc:m,ApiTest:S,ApiCase:E},data:function(){return{apiInfomation:{},apiId:this.$route.query.id,activeName:"first",response:{},testapiinfo:{},funccase:null,total:0,list:null,listLoading:!0,listQuery:{page:1,size:10,interface:this.$route.query.id}}},created:function(){this.getApiInfo()},methods:{getApiInfo:function(){var e=this;Object(N["h"])(this.apiId).then((function(a){e.apiInfomation=a.data;try{e.response=JSON.parse(e.apiInfomation.apiResponse)}catch(t){e.response=e.apiInfomation.apiResponse}}))},fetchData:function(){var e=this;this.listLoading=!0,Object(_["e"])(this.listQuery).then((function(a){e.list=a.data.results,e.total=a.data.count,e.listLoading=!1}))},getcaseinfo:function(e){this.funccase=e},testApiInfo:function(){var e=this;Object(N["h"])(this.apiId).then((function(a){e.testapiinfo=a.data,console.log(e.testapiinfo)}))},handleClick:function(e,a){"first"===e.name?this.getApiInfo():"second"===e.name?this.testApiInfo():"third"===e.name&&this.fetchData()}}},B=R,I=Object(p["a"])(B,s,l,!1,null,"3e5ba83c",null);a["default"]=I.exports},9908:function(e,a,t){},f271:function(e,a,t){"use strict";var s=t("9908"),l=t.n(s);l.a}}]);