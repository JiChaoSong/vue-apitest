export const allEnums = {
  asserttype: [
    { value: 101, label: '文本' },
    { value: 102, label: '正则' },
    { value: 103, label: 'Json' }
  ],
  bodytype: [
    { value: 101, label: 'text' },
    { value: 102, label: 'file' }
  ],
  requestMethod: [
    { value: 'GET', label: 'GET', desc: '请求指定的页面信息，并返回实体主体', isEnble: true },
    { value: 'POST', label: 'POST', desc: '向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改', isEnble: true },
    { value: 'PUT', label: 'PUT', desc: '从客户端向服务器传送的数据取代指定的文档的内容', isEnble: true },
    { value: 'PATCH', label: 'PATCH', desc: '实体中包含一个表，表中说明与该URI所表示的原内容的区别', isEnble: true },
    { value: 'DELETE', label: 'DELETE', desc: '请求服务器删除指定的页面', isEnble: true },
    { value: 'HEAD', label: 'HEAD', desc: '类似于get请求，只不过返回的响应中没有具体的内容，用于获取报', isEnble: true },
    { value: 'TRACE', label: 'TRACE', desc: '回显服务器收到的请求，主要用于测试或诊断', isEnble: false },
    { value: 'MOVE', label: 'MOVE', desc: '请求服务器将指定的页面移至另一个网络地址', isEnble: false },
    { value: 'COPY', label: 'COPY', desc: '请求服务器将指定的页面拷贝至另一个网络地址', isEnble: false },
    { value: 'LINK', label: 'LINK', desc: '请求服务器建立链接关系', isEnble: false },
    { value: 'UNLINK', label: 'UNLINK', desc: '断开链接关系', isEnble: false },
    { value: 'WRAPPED', label: 'WRAPPED', desc: '允许客户端发送经过封装的请求', isEnble: false },
    { value: 'Extension-mothed', label: 'Extension-mothed', desc: '在不改动协议的前提下，可增加另外的方法', isEnble: false }
  ],
  caseStatus: [
    { value: 101, label: 'unexecuted' },
    { value: 102, label: 'pass' },
    { value: 103, label: 'fail' },
    { value: 104, label: 'block' },
    { value: 105, label: 'closed' }
  ],

  // 数据类型
  paramType: [
    { value: 101, label: 'String' },
    { value: 102, label: 'Array' },
    { value: 103, label: 'Object' },
    { value: 104, label: 'Long' },
    { value: 105, label: 'Integer' },
    { value: 106, label: 'Boolean' },
    { value: 107, label: 'List' }
  ],

  // 请求头
  requestHeader: [
    { value: 'Accept', label: 'Accept', desc: '指定客户端能够接收的内容类型' },
    { value: 'Accept-Charset', label: 'Accept-Charset', desc: '浏览器可以接受的字符编码集' },
    { value: 'Accept-Encoding', label: 'Accept-Encoding', desc: '指定浏览器可以支持的web服务器返回内容压缩编码类型' },
    { value: 'Accept-Language', label: 'Accept-Language', desc: '浏览器可接受的语言' },
    { value: 'Accept-Ranges', label: 'Accept-Ranges', desc: '可以请求网页实体的一个或者多个子范围字段' },
    { value: 'Authorization', label: 'Authorization', desc: 'HTTP授权的授权证书' },
    { value: 'Cache-Control', label: 'Cache-Control', desc: '指定请求和响应遵循的缓存机制' },
    { value: 'Connection', label: 'Connection', desc: '表示是否需要持久连接' },
    { value: 'Cookie', label: 'Cookie', desc: 'HTTP请求发送时，会把保存在该请求域名下的所有cookie值一起发送给web服务器' },
    { value: 'Content-Length', label: 'Content-Length', desc: '请求的内容长度' },
    { value: 'Content-Typ', label: 'Content-Typ', desc: '请求的与实体对应的MIME信息' },
    { value: 'Date', label: 'Date', desc: '请求发送的日期和时间' },
    { value: 'From', label: 'From', desc: '发出请求的用户的Email' },
    { value: 'Host', label: 'Host', desc: '指定请求的服务器的域名和端口号' },
    { value: 'If-Match', label: 'If-Match', desc: '只有请求内容与实体相匹配才有效' },
    { value: 'If-Modified-Since', label: 'If-Modified-Since', desc: '>如果请求的部分在指定时间之后被修改则请求成功，未被修改则返回304代码' },
    { value: 'If-None-Match', label: 'If-None-Match', desc: '>如果内容未改变返回304代码，参数为服务器先前发送的Etag，与服务器回应的Etag比较判断是否改变' },
    { value: 'If-Range', label: 'If-Range', desc: '如果实体未改变，服务器发送客户端丢失的部分，否则发送整个实体。参数也为Etag' },
    { value: 'If-Unmodified-Since', label: 'If-Unmodified-Since', desc: '只在实体在指定时间之后未被修改才请求成功' },
    { value: 'Max-Forwards', label: 'Max-Forwards', desc: '限制信息通过代理和网关传送的时间' },
    { value: 'Pragma', label: 'Pragma', desc: '用来包含实现特定的指令' },
    { value: 'Proxy-Authorization', label: 'Proxy-Authorization', desc: '连接到代理的授权证书' },
    { value: 'Range', label: 'Range', desc: '只请求实体的一部分，指定范围' },
    { value: 'Referer', label: 'Referer', desc: '先前网页的地址，当前请求网页紧随其后,即来路' },
    { value: 'TE', label: 'TE', desc: '客户端愿意接受的传输编码，并通知服务器接受接受尾加头信息' },
    { value: 'Upgrade', label: 'Upgrade', desc: '向服务器指定某种传输协议以便服务器进行转换（如果支持）' },
    { value: 'User-Agent', label: 'User-Agent', desc: 'User-Agent的内容包含发出请求的用户信息' },
    { value: 'Via', label: 'Via', desc: '通知中间网关或代理服务器地址，通信协议' },
    { value: 'Warning', label: 'Warning', desc: '关于消息实体的警告信息' }
  ],
  assertType: [
    { value: 101, label: '无' },
    { value: 102, label: 'HTTP状态码' },
    { value: 103, label: '响应状态码' },
    { value: 104, label: '全文匹配', disabled: true },
    { value: 105, label: '响应时间', disabled: true }
  ],
  httpCode: [
    { value: 101, label: 200 },
    { value: 102, label: 300 },
    { value: 103, label: 400 },
    { value: 104, label: 500 }
  ],
  responseCode: [
    { value: 101, label: 20000 },
    { value: 102, label: 30001 },
    { value: 103, label: 40000 },
    { value: 104, label: 50000 }
  ],
  // 参数提取
  patamExtraction: [
    { value: 101, label: 'JsonPath', isEnble: true },
    { value: 102, label: '正则表达式', isEnble: true },
    { value: 103, label: 'Json', isEnble: true },
    { value: 104, label: 'xpath', isEnble: false },
    { value: 105, label: 'bs4', isEnble: false }
  ]
}
