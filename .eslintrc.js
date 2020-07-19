module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}


// vscode 设置
// {
//   "workbench.colorTheme": "Sublime Material Theme - Dark",
//   "terminal.integrated.shell.linux": "/usr/bin/bash",
//   "editor.suggestSelection": "first",
//   "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
//   "workbench.iconTheme": "eq-material-theme-icons-darker",
//   "terminal.integrated.inheritEnv": false,
//   "editor.fontSize": 17,
//   "eslint.codeAction.showDocumentation": {},
//   // vscode默认启用了根据文件类型自动设置tabsize的选项
//   "editor.detectIndentation": false,
//   // 重新设定tabsize
//   "editor.tabSize": 2,
//   // #每次保存的时候自动格式化
//   "editor.formatOnSave": true,
//   // #每次保存的时候将代码按eslint格式进行修复
//   "eslint.autoFixOnSave": true,
//   // 添加 vue 支持
//   "eslint.validate": [
//     "javascript",
//     "javascriptreact",
//     {
//       "language": "vue",
//       "autoFix": true
//     }
//   ],
//   //  #让prettier使用eslint的代码格式进行校验
//   "prettier.eslintIntegration": true,
//   //  #去掉代码结尾的分号
//   "prettier.semi": false,
//   //  #使用带引号替代双引号
//   "prettier.singleQuote": true,
//   //  #让函数(名)和后面的括号之间加个空格
//   "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
//   // #让vue中的js按编辑器自带的ts格式进行格式化
//   "vetur.format.defaultFormatter.js": "vscode-typescript",
//   "vetur.format.defaultFormatterOptions": {
//     "js-beautify-html": {
//       "wrap_attributes": "force-aligned"
//       // #vue组件中html代码格式化样式
//     }
//   },
//   "window.zoomLevel": 0,
//   "explorer.confirmDelete": false,
//   "explorer.confirmDragAndDrop": false,
//   "editor.renderControlCharacters": true,
//   "editor.renderWhitespace": "all",
//   "editor.codeActionsOnSave": {
//     "source.fixAll.eslint": true
//   }
// }